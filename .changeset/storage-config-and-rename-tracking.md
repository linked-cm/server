---
"@_linked/server": major
---

Track `@_linked/core` storage-API renames and adopt the new BackendAPIStore config-object constructor.

**Breaking — call-site renames** (paired with the matching changes in `@_linked/core`):

- `LinkedStorage.setDefaultStore` → `setDefaultDataset`
- `LinkedStorage.setStoreForShapes` → `setDatasetForShapes`
- `LinkedStorage.getDefaultStore` → `getDefaultDataset`
- `LinkedStorage.getStores` → `getDatasets`
- `SparqlStore` → `SparqlDataset`

**Breaking — `BackendAPIStore` constructor takes a config object:**

```ts
// before
new BackendAPIStore('appData')

// after
new BackendAPIStore({ name: 'appData' })
```

The config field is `name` (renamed from `alias` in the intermediate iteration).

**Fix — scoped-package `/call` routes.** Backend now correctly routes `/call/@scope/pkg/method` requests, not just `/call/pkg/method`.

**Fix — relative bundle URLs in dev.** Drops the baked-in `:4000` origin so bundle URLs work whatever `PORT` the dev server binds to.

**Docs.** Constructor doc-comments refreshed from the older `lincd` naming to `linked`.
