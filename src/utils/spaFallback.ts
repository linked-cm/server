/**
 * SPA-fallback ordering.
 *
 * `LinkedServer` serves the client shell from a catch-all `GET *` route. In
 * express a catch-all is only a "fallback" by accident of ORDER: it is the last
 * layer on the router stack, so everything registered earlier wins. Nothing
 * enforces that afterwards, and two supported code paths register routes after
 * the catch-all would otherwise exist:
 *
 *  - `setupAfterControllers()` — a documented provider lifecycle hook which, by
 *    definition, runs after the controllers are in place.
 *  - HMR reloads — on a workspace source change the CLI's watcher calls
 *    `LinkedServer.onSourceChange()`, which disposes the package's providers and
 *    re-runs `setupBeforeControllers()`. `BackendProvider.disposeRoutes()`
 *    SPLICES the provider's layers out of `router.stack`; `registerRoute()` can
 *    only APPEND them back, so they land behind the catch-all.
 *
 * Only GET is affected (the catch-all is `GET *`) and the shadowed route still
 * answers `200`, just with an HTML body — which is why this reads as an
 * auth/config problem rather than a routing one. The response size is the tell.
 *
 * Ordering is enforced at REGISTRATION time, from the two places that create
 * the situation: `LinkedServer` installs the fallback after
 * `setupAfterControllers`, and re-pins it at the end of `onSourceChange`.
 * `repinSpaFallback` is therefore explicit rather than automatic — anything
 * that registers GET routes at some other moment must call it too.
 *
 * Re-pinning is safe to do here because it never runs while a registration is
 * in flight. `BackendProvider.registerRoute()` reads back `router.stack[i]` for
 * the indices its own `app[method](...)` call just appended, so moving layers
 * *inside* that window would make a provider capture the fallback's layer as
 * its own — and its next `disposeRoutes()` would delete the fallback outright.
 * Both call sites run after such a batch completes, never during one. (Note
 * also that `disposeRoutes` matches layers by object identity, not index, so
 * changing a layer's position never confuses disposal.)
 *
 * Trailing error-handling middleware (arity-4 handlers) is deliberately kept
 * BEHIND the fallback: express only reaches an error handler that comes after
 * the layer that failed, so pinning the fallback dead last would stop errors
 * thrown while rendering the shell from reaching the app's error handler.
 */

const FALLBACK = Symbol.for('@_linked/server.spaFallback');

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
 * Move the tracked SPA fallback back to the tail of the router stack (ahead of
 * any trailing error handlers). Call after registering routes late — notably
 * after an HMR dispose/re-register cycle.
 *
 * A no-op when no fallback is installed, when the fallback layer is no longer
 * on the stack (it was removed on purpose — don't resurrect it), or when it is
 * already in position.
 */
export function repinSpaFallback(app: any): void {
  const layer = app?.[FALLBACK];
  if (!layer) return;
  const stack = getRouter(app)?.stack;
  if (!Array.isArray(stack)) return;

  const target = pinIndex(stack);
  if (stack[target - 1] === layer) return; // already in position

  const from = stack.indexOf(layer);
  if (from === -1) return;

  stack.splice(from, 1);
  stack.splice(pinIndex(stack), 0, layer);
}

/**
 * Register the SPA catch-all and remember its layer so it can be re-pinned
 * later. Drop-in replacement for `app.get('*', handler)`.
 */
export function installSpaFallback(app: any, ...handlers: any[]): void {
  app.get('*', ...handlers);

  const stack = getRouter(app)?.stack;
  if (!Array.isArray(stack) || !stack.length) return;
  app[FALLBACK] = stack[stack.length - 1];

  // Ordinary layers may already sit behind trailing error handlers.
  repinSpaFallback(app);
}
