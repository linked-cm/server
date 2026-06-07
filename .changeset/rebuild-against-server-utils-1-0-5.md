---
"@_linked/server": patch
---

Rebuild + republish. The 2.0.0 tarball shipped without `lib/` because the build silently failed against an empty `@_linked/server-utils@1.0.4` tarball. `@_linked/server-utils@1.0.5` now ships its `lib/` correctly, so this version compiles + packages as intended.
