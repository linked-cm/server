---
'@_linked/server': minor
---

Honour `server.apiOnly` (set by `linked start --api-only`): LinkedServer skips the SPA catch-all, so a backend without a web frontend serves its API routes and answers page requests with a plain 404 instead of failing to render a missing `src/App.tsx`.
