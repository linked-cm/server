---
"@_linked/server": patch
---

Switch to explicit per-step build pipeline (mirrors `@_linked/cli`'s and `@_linked/server-utils`'s). The previous `yarn linked build` wrapper was failing silently in CI and shipping incomplete tarballs.
