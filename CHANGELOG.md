# @\_linked/server

## 2.0.1

### Patch Changes

- [#6](https://github.com/linked-cm/server/pull/6) [`7eb425b`](https://github.com/linked-cm/server/commit/7eb425b26cc1e234041c6a678b184874ef2be017) Thanks [@flyon](https://github.com/flyon)! - Rebuild + republish. The 2.0.0 tarball shipped without `lib/` because the build silently failed against an empty `@_linked/server-utils@1.0.4` tarball. `@_linked/server-utils@1.0.5` now ships its `lib/` correctly, so this version compiles + packages as intended.

## 2.0.0

### Major Changes

- [#4](https://github.com/linked-cm/server/pull/4) [`d1ad65c`](https://github.com/linked-cm/server/commit/d1ad65ccda75e643a30e911f97584d3a2b6ff3e8) Thanks [@flyon](https://github.com/flyon)! - Track `@_linked/core` storage-API renames and adopt the new BackendAPIStore config-object constructor.

  **Breaking — call-site renames** (paired with the matching changes in `@_linked/core`):

  - `LinkedStorage.setDefaultStore` → `setDefaultDataset`
  - `LinkedStorage.setStoreForShapes` → `setDatasetForShapes`
  - `LinkedStorage.getDefaultStore` → `getDefaultDataset`
  - `LinkedStorage.getStores` → `getDatasets`
  - `SparqlStore` → `SparqlDataset`

  **Breaking — `BackendAPIStore` constructor takes a config object:**

  ```ts
  // before
  new BackendAPIStore("appData");

  // after
  new BackendAPIStore({ name: "appData" });
  ```

  The config field is `name` (renamed from `alias` in the intermediate iteration).

  **Fix — scoped-package `/call` routes.** Backend now correctly routes `/call/@scope/pkg/method` requests, not just `/call/pkg/method`.

  **Fix — relative bundle URLs in dev.** Drops the baked-in `:4000` origin so bundle URLs work whatever `PORT` the dev server binds to.

  **Docs.** Constructor doc-comments refreshed from the older `lincd` naming to `linked`.

### Minor Changes

- [#4](https://github.com/linked-cm/server/pull/4) [`2ae7a72`](https://github.com/linked-cm/server/commit/2ae7a72b6381e1758cded50309762bd11de57bd5) Thanks [@flyon](https://github.com/flyon)! - Update `BackendAPIStore` to implement `IDataset` (renamed from `IQuadStore` in `@_linked/core`).

  No functional change — import path and interface name updated to match the new `@_linked/core` export.

## 1.0.8

### Patch Changes

- [`bb74f32`](https://github.com/linked-cm/server/commit/bb74f320c407db168300c78c8aea005f2dff3d0e) - Initial release under the new publishing setup.
