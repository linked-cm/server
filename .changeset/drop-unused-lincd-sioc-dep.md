---
'@_linked/server': patch
---

Dropped `lincd-sioc: ~1.0` from `package.json` dependencies. Audit
confirmed no source file in `packages/server/src` imports from sioc;
the dep was vestigial.

No API change. Consumers that depended on `@_linked/server` transitively
pulling sioc into their lockfile will need to add `@_linked/sioc` (the
new name; see its own release notes) as a direct dep if they actually
use it.

Context: see create-now plan-011 report (docs/reports/009-legacy-lincd-eradication.md).
