---
'@_linked/server': minor
---

Honour `server.apiOnly` (set by `linked start --api-only`): LinkedServer skips the SPA catch-all, so a backend without a web frontend serves its API routes and answers page requests with a plain 404 instead of failing to render a missing `src/App.tsx`.

`BackendAPIStore` implements `askQuery`, required by `IDataset` since `@_linked/core` 2.18.1. It is forwarded to the backend like the other query kinds (as DSL-JSON through `Server.call`, rehydrated and answered by `BackendAPIStoreProvider` through `LinkedStorage.askQuery`), so it type-checks as an `IDataset` without a cast. `@_linked/core` is bumped to `^2.18.1`.

Linked packages whose `exports` have no `./backend` entry no longer log a `Missing "./backend" specifier` error at boot. Real backend load errors are still reported.

A backend or shape provider method that throws during a `/call/...` request now answers with HTTP 500 and a JSON `{error}` body (the same shape as other server errors) instead of `200 null`; direct backend-to-backend calls get a rejected promise. `BackendAPIStore` rejects when `Server.call` returns no response (a failed HTTP call), so a failed query no longer reads as an empty result.
