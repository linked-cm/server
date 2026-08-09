/**
 * SPA-fallback pinning.
 *
 * `LinkedServer` serves the client shell from a catch-all `GET *` route. In
 * express a catch-all is only a "fallback" by accident of ORDER: it happens to
 * be the last layer on the router stack at boot, so everything registered
 * earlier wins. Nothing enforces that ordering afterwards, and several
 * supported code paths register routes AFTER the catch-all exists:
 *
 *  - `setupAfterControllers()` — a documented provider lifecycle hook that, by
 *    definition, runs after the catch-all is installed.
 *  - HMR reloads — on any `src/**` change the CLI's watcher calls
 *    `LinkedServer.onSourceChange()`, which disposes the package's providers
 *    and re-runs `setupBeforeControllers()`. `BackendProvider.disposeRoutes()`
 *    SPLICES the provider's layers out of `router.stack`; `registerRoute()` can
 *    only APPEND them back. So from the first reload onwards every route that
 *    provider owns sits BEHIND the catch-all and is answered with the SPA shell
 *    instead. Only GET is affected (the catch-all is `GET *`), which is why
 *    this reads as an auth/config problem rather than a routing one: POST
 *    endpoints keep working and the broken GETs still return `200`, just with
 *    an HTML body.
 *
 * The invariant is "a catch-all must be last". This module makes it structural
 * rather than incidental, and enforces it at DISPATCH rather than at
 * registration: `app.handle` — the single entry point every request goes
 * through — re-pins the fallback to the tail before routing. That is
 * deliberately independent of HOW routes got registered, so it also covers
 * consumers that never touch the app's route methods (`registerRoute`, direct
 * `router.stack` manipulation, a future lifecycle hook).
 *
 * Enforcing at registration time was the obvious alternative and is wrong here:
 * `BackendProvider.registerRoute()` reads back `router.stack[i]` for the
 * indices its call appended, so reordering the stack synchronously inside a
 * registration makes the provider capture the FALLBACK's layer as its own —
 * and the next `disposeRoutes()` then deletes the fallback. Moving at dispatch
 * leaves the stack untouched while anyone is registering.
 *
 * Trailing error-handling middleware (arity-4 handlers) is deliberately kept
 * BEHIND the fallback: express only reaches an error handler that comes after
 * the layer that failed, so pinning the fallback dead-last would stop errors
 * thrown while rendering the shell from reaching the app's error handler. When
 * the two goals genuinely conflict — an ordinary layer registered after an
 * error handler, which is what an HMR reload produces — reachability wins and
 * the fallback goes dead last. That is the deliberate precedence: a shadowed
 * route silently answers API clients with HTML, whereas a shell-render error
 * merely falls through to express's default handler (and LinkedServer already
 * wraps its own shell handler in `handleErrors`).
 */

const FALLBACK = Symbol.for('@_linked/server.spaFallback');
const PATCHED = Symbol.for('@_linked/server.spaFallback.patched');

function getRouter(app: any): any {
  // express 4 exposes `_router` (lazily created); express 5 renames it `router`.
  return app && (app._router ?? app.router);
}

function isErrorHandlingLayer(layer: any): boolean {
  return typeof layer?.handle === 'function' && layer.handle.length === 4;
}

/**
 * Index the fallback should sit at: after every ordinary layer, but before the
 * contiguous run of error-handling middleware at the very end of the stack.
 */
function pinIndex(stack: any[]): number {
  let i = stack.length;
  while (i > 0 && isErrorHandlingLayer(stack[i - 1])) i--;
  return i;
}

/**
 * Move the tracked SPA fallback back to the tail of the router stack. Safe to
 * call at any time: a no-op when no fallback is installed, when the fallback
 * layer is no longer on the stack (it was removed on purpose — don't resurrect
 * it), or when it is already in position. The common case is two array reads.
 */
export function repinSpaFallback(app: any): void {
  const layer = app?.[FALLBACK];
  if (!layer) return;
  const stack = getRouter(app)?.stack;
  if (!Array.isArray(stack)) return;

  const target = pinIndex(stack);
  if (stack[target - 1] === layer) return; // already last (ahead of error handlers)

  const from = stack.indexOf(layer);
  if (from === -1) return;

  stack.splice(from, 1);
  stack.splice(pinIndex(stack), 0, layer);
}

/**
 * Register the SPA catch-all and keep it pinned to the tail of the router stack
 * for the lifetime of the app. Drop-in replacement for `app.get('*', handler)`.
 */
export function installSpaFallback(app: any, ...handlers: any[]): void {
  app.get('*', ...handlers);

  const stack = getRouter(app)?.stack;
  if (!Array.isArray(stack) || !stack.length) return;
  app[FALLBACK] = stack[stack.length - 1];

  if (app[PATCHED]) return;
  app[PATCHED] = true;
  const handle = app.handle;
  if (typeof handle !== 'function') return;
  app.handle = function (this: any, ...args: any[]) {
    repinSpaFallback(this);
    return handle.apply(this, args);
  };
}
