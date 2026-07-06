---
"@_linked/server": minor
---

**ESM-only.** Dropped the CommonJS build; the package now ships ES modules only (`type: module`, no `require` export condition, no `lib/cjs`). All first-party consumers are ESM; CJS projects on Node 22+ can still `require()` it (sync ESM) or use dynamic `import()`. Also fixed the root `types` field (was a non-existent `./index.d.ts`).
