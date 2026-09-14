---
'@_linked/server': minor
---

Honour `server.apiOnly` (set by `linked start --api-only`): LinkedServer skips the SPA catch-all, so a backend without a web frontend serves its API routes and answers page requests with a plain 404 instead of failing to render a missing `src/App.tsx`.

`BackendAPIStore` implements `askQuery`, required by `IDataset` since `@_linked/core` 2.18.1. It is forwarded to the backend like the other query kinds (as DSL-JSON through `Server.call`, rehydrated and answered by `BackendAPIStoreProvider` through `LinkedStorage.askQuery`), so it type-checks as an `IDataset` without a cast. `@_linked/core` is bumped to `^2.18.1`.

Linked packages whose `exports` have no `./backend` entry no longer log a `Missing "./backend" specifier` error at boot. Real backend load errors are still reported.
