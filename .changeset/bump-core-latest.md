---
'@_linked/server': patch
---

Track the current `@_linked/core` (^2.17.0).

The declared range was `^2.2.1` while the lockfile pinned 2.11.1, so CI built
against a core three minor versions behind the one consumers actually run. That
divergence is invisible locally — the monorepo resolves core to 2.17.0 — and it
surfaced as a build failure only after a change referenced a module that exists
in 2.17.0 but not in 2.11.1.
