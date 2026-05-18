---
'@_linked/server': patch
---

Align `BackendAPIStore` with the `IDataset` query contract and improve invalid select-query handling.

- `BackendAPIStore` now implements `IDataset` instead of the old `IQuadStore` name
- `BackendAPIStore.selectQuery()` now rejects malformed select-query payloads before dispatching to the backend
- `BackendAPIStoreProvider` now matches the current query-dispatch argument shape and forwards query operations directly through `LinkedStorage`
