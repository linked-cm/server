import { afterEach, describe, expect, it } from '@jest/globals';
import express from 'express';
import { BackendProvider } from '@_linked/server-utils/utils/BackendProvider';
import type { AddressInfo } from 'net';
import { installSpaFallback, repinSpaFallback } from '../utils/spaFallback.js';

// The SPA shell is deliberately much larger than any real route body: in the
// wild the tell was `GET /auth/dev` answering with 2,271,965 bytes of shell
// instead of its own 1,550-byte JSON. A status assertion cannot catch this —
// the bug returns 200. Every assertion below is therefore on the BYTES.
const SHELL = `<!doctype html><div id="root"></div>${'x'.repeat(4096)}`;
const ROUTE_BODY = '{"ok":true,"route":"late"}';

const servers: any[] = [];

function makeApp(fallback?: any) {
  const app = express();
  installSpaFallback(
    app,
    fallback ?? ((_req: any, res: any) => res.type('html').send(SHELL))
  );
  return app;
}

async function listen(app: any): Promise<string> {
  const server = await new Promise<any>((resolve) => {
    const s = app.listen(0, () => resolve(s));
  });
  servers.push(server);
  const { port } = server.address() as AddressInfo;
  return `http://127.0.0.1:${port}`;
}

async function get(base: string, path: string) {
  const res = await fetch(base + path);
  const body = await res.text();
  return { status: res.status, body, bytes: Buffer.byteLength(body) };
}

function stackOf(app: any): any[] {
  return (app._router ?? app.router).stack;
}

afterEach(async () => {
  await Promise.all(
    servers
      .splice(0)
      .map((s) => new Promise<void>((resolve) => s.close(() => resolve())))
  );
});

describe('SPA fallback ordering', () => {
  it('serves the shell for unknown paths', async () => {
    const base = await listen(makeApp());
    const res = await get(base, '/nonsense');
    expect(res.status).toBe(200);
    expect(res.bytes).toBe(Buffer.byteLength(SHELL));
  });

  it('reaches a GET route registered after the fallback, once re-pinned', async () => {
    const app = makeApp();
    // This is what `setupAfterControllers` does: register once the catch-all
    // already exists. Before the fix the route landed behind `GET *` and was
    // answered with the shell — status 200 either way.
    app.get('/late', (_req: any, res: any) => res.type('json').send(ROUTE_BODY));
    repinSpaFallback(app);
    const base = await listen(app);

    const res = await get(base, '/late');
    expect(res.status).toBe(200);
    expect(res.body).toBe(ROUTE_BODY);
    expect(res.bytes).not.toBe(Buffer.byteLength(SHELL));
  });

  it('shadows a late GET route when re-pinning is skipped', async () => {
    // Guards the contract itself: re-pinning is what fixes this, so the test
    // must fail for the right reason. Without the call the shell wins — exactly
    // the production symptom.
    const app = makeApp();
    app.get('/late', (_req: any, res: any) => res.type('json').send(ROUTE_BODY));
    const base = await listen(app);

    const res = await get(base, '/late');
    expect(res.status).toBe(200);
    expect(res.bytes).toBe(Buffer.byteLength(SHELL));
  });

  it('survives repeated BackendProvider dispose/re-register cycles (HMR)', async () => {
    // Exercises the real mechanism rather than a stand-in: `disposeRoutes()`
    // splices the provider's layers out of `router.stack` and `registerRoute()`
    // can only append them back, so on every reload the provider's GET routes
    // ended up behind `GET *`. `LinkedServer.onSourceChange` re-pins at the end
    // of each cycle; this mirrors that.
    class AuthLikeProvider extends BackendProvider {
      setup() {
        this.registerRoute('get', '/auth/dev', (_req: any, res: any) =>
          res.type('json').send(ROUTE_BODY)
        );
      }
      dispose() {
        this.disposeRoutes();
      }
    }

    const app = makeApp();
    const provider = new AuthLikeProvider(app, null);
    provider.setup();
    repinSpaFallback(app);
    const base = await listen(app);

    expect((await get(base, '/auth/dev')).bytes).toBe(
      Buffer.byteLength(ROUTE_BODY)
    );

    // …now simulate edits under `src/**`: dispose + re-run setup, repeatedly.
    for (let reload = 0; reload < 3; reload++) {
      provider.dispose();
      provider.setup();
      repinSpaFallback(app);

      const after = await get(base, '/auth/dev');
      expect(after.status).toBe(200);
      expect(after.body).toBe(ROUTE_BODY);
      expect(after.bytes).toBe(Buffer.byteLength(ROUTE_BODY));
    }

    // The fallback itself must survive all of that — re-pinning must never let
    // a provider capture (and later dispose) the fallback's own layer.
    expect((await get(base, '/nonsense')).bytes).toBe(Buffer.byteLength(SHELL));
  });

  it('keeps trailing error-handling middleware behind the fallback', async () => {
    // Errors thrown while rendering the shell must still reach an error handler
    // registered after the catch-all (e.g. from setupAfterControllers), so the
    // fallback is pinned in front of trailing arity-4 middleware, not dead last.
    const app = makeApp(() => {
      throw new Error('render failed');
    });
    app.get('/late', (_req: any, res: any) => res.type('json').send(ROUTE_BODY));
    app.use((err: any, _req: any, res: any, _next: any) =>
      res.status(500).send(`handled:${err.message}`)
    );
    repinSpaFallback(app);
    const base = await listen(app);

    const shell = await get(base, '/nonsense');
    expect(shell.status).toBe(500);
    expect(shell.body).toBe('handled:render failed');

    // …and the late route still beats the fallback.
    expect((await get(base, '/late')).body).toBe(ROUTE_BODY);

    const stack = stackOf(app);
    expect(stack[stack.length - 1].handle.length).toBe(4);
  });

  it('is idempotent — re-pinning repeatedly does not duplicate the layer', async () => {
    const app = makeApp();
    const before = stackOf(app).length;
    repinSpaFallback(app);
    repinSpaFallback(app);
    repinSpaFallback(app);
    expect(stackOf(app).length).toBe(before);
  });

  it('does not resurrect a fallback that was removed on purpose', async () => {
    const app = makeApp();
    const stack = stackOf(app);
    const fallback = stack[stack.length - 1];
    stack.splice(stack.indexOf(fallback), 1);

    repinSpaFallback(app);
    expect(stackOf(app)).not.toContain(fallback);
  });

  it('does not disturb express’s own settings getter', async () => {
    const app = makeApp();
    app.set('some-setting', 'value');
    expect(app.get('some-setting')).toBe('value');
  });
});
