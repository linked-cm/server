---
'@_linked/server': patch
---

Keep the SPA catch-all last on the express router stack.

The client shell was registered as a plain `server.get('*')`, so it was only a
fallback by accident of registration order. Any route registered after boot —
notably every route a `BackendProvider` re-registers on an HMR reload, because
`disposeRoutes()` splices its layers out and `registerRoute()` can only append
them back — landed behind the catch-all and was answered with the 2 MB HTML
shell instead. `GET` only, `200 OK`, so it presented as an auth/config problem
rather than a routing one.

The fallback is now tracked and re-pinned to the tail of the router stack on
every request (enforced in `app.handle`, so it is independent of how routes get
registered). Trailing error-handling middleware is kept behind it.
