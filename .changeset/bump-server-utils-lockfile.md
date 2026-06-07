---
"@_linked/server": patch
---

Rebuild against `@_linked/server-utils@1.0.5`. The lockfile previously pinned `1.0.4` whose published tarball was empty, so server's build couldn't resolve `BackendProvider`/`JSONParser`/`JSONWriter`/`RouteConfig`. Lockfile now points at `1.0.5` which ships its `lib/` correctly.
