---
"@_linked/server": patch
---

`LinkedServer.callShapeMethod` now degrades gracefully (warns and skips) when a shape URI can't be resolved to a provider, instead of throwing and turning the whole request into a 500.
