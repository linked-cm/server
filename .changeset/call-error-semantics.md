---
'@_linked/server': minor
---

Make server call failures explicit. Update code that relied on failed calls resolving quietly.

- **No provider now answers 501.** A `/call/...` request that no provider handles gets `501 {"error": "No provider for <pkg>/<method>"}`. Before, it got `200` with an empty body (shape methods) or `200 null` (backend methods). This covers both a missing provider and a provider without the called method.
- **Provider errors answer 500 (since 2.2.0).** A provider method that throws answers `500 {"error": ...}` instead of `200 null`. The 2.2.0 changeset did not mention this.
- **Backend-to-backend `Server.call` rejects.** When `Server.call` runs on the backend, where it calls `LinkedServer` directly, a provider method that throws rejects the promise (since 2.2.0). An unmatched call throws a `ServerCallError` with status 501. `@_linked/server-utils` resolves that as `undefined` unless the caller passes `rejectOnError: true`.
- **`BackendAPIStore` rejects only on HTTP errors.** It calls with `rejectOnError: true`, so a failed query rejects with a `ServerCallError` carrying the HTTP `status` and the server's message. A successful call resolves whatever the provider returned, `undefined` included. Before, every `undefined` result was treated as a failure.
- **Dependency.** Requires `@_linked/server-utils` ^1.2.0.
