---
"@_linked/server": patch
---

`BackendAPIStore` now speaks DSL-JSON over the wire, adapting to the `@_linked/core` query-contract flip (datasets receive the live/closed query, not IR).

- The frontend store serializes each query with `query.toJSON()` before `Server.call` (the live query can't cross the wire), replacing the removed `getQueryObject()` path.
- `BackendAPIStoreProvider` rehydrates it with `fromJSON(json)` back into a live query before routing through `LinkedStorage` — the backend store lowers it to SPARQL itself.

No API change for callers; the round-trip is `lower(fromJSON(query.toJSON())) ≡ lower(query)`.
