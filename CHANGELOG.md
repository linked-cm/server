# @\_linked/server

## 2.1.0

### Minor Changes

- [#13](https://github.com/linked-cm/server/pull/13) [`8932811`](https://github.com/linked-cm/server/commit/89328117fa9500897a5a57b86e07efe5860d81cd) Thanks [@flyon](https://github.com/flyon)! - **ESM-only.** Dropped the CommonJS build; the package now ships ES modules only (`type: module`, no `require` export condition, no `lib/cjs`). All first-party consumers are ESM; CJS projects on Node 22+ can still `require()` it (sync ESM) or use dynamic `import()`. Also fixed the root `types` field (was a non-existent `./index.d.ts`).

### Patch Changes

- [#13](https://github.com/linked-cm/server/pull/13) [`daef98d`](https://github.com/linked-cm/server/commit/daef98d777144285c2f63ed43821902371df2c66) Thanks [@flyon](https://github.com/flyon)! - `BackendAPIStore` now speaks DSL-JSON over the wire, adapting to the `@_linked/core` query-contract flip (datasets receive the live/closed query, not IR).

  - The frontend store serializes each query with `query.toJSON()` before `Server.call` (the live query can't cross the wire), replacing the removed `getQueryObject()` path.
  - `BackendAPIStoreProvider` rehydrates it with `fromJSON(json)` back into a live query before routing through `LinkedStorage` — the backend store lowers it to SPARQL itself.

  No API change for callers; the round-trip is `lower(fromJSON(query.toJSON())) ≡ lower(query)`.

- [#13](https://github.com/linked-cm/server/pull/13) [`28d0f49`](https://github.com/linked-cm/server/commit/28d0f497b332a663af9d40162d017a2a35cbfb31) Thanks [@flyon](https://github.com/flyon)! - Dropped `lincd-sioc: ~1.0` from `package.json` dependencies. Audit
  confirmed no source file in `packages/server/src` imports from sioc;
  the dep was vestigial.

  No API change. Consumers that depended on `@_linked/server` transitively
  pulling sioc into their lockfile will need to add `@_linked/sioc` (the
  new name; see its own release notes) as a direct dep if they actually
  use it.

  Context: see create-now plan-011 report (docs/reports/009-legacy-lincd-eradication.md).

## 2.0.3

### Patch Changes

- [#10](https://github.com/linked-cm/server/pull/10) [`5619ddf`](https://github.com/linked-cm/server/commit/5619ddf9268469eea566e110ce5c3c4fd68b407d) Thanks [@flyon](https://github.com/flyon)! - Switch to explicit per-step build pipeline (mirrors `@_linked/cli`'s and `@_linked/server-utils`'s). The previous `yarn linked build` wrapper was failing silently in CI and shipping incomplete tarballs.

## 2.0.2

### Patch Changes

- [#8](https://github.com/linked-cm/server/pull/8) [`17e6771`](https://github.com/linked-cm/server/commit/17e6771ba1c2eae2daf24b97dcb9e934827f4396) Thanks [@flyon](https://github.com/flyon)! - Rebuild against `@_linked/server-utils@1.0.5`. The lockfile previously pinned `1.0.4` whose published tarball was empty, so server's build couldn't resolve `BackendProvider`/`JSONParser`/`JSONWriter`/`RouteConfig`. Lockfile now points at `1.0.5` which ships its `lib/` correctly.

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
