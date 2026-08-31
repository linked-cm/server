---
'@_linked/server': patch
---

Build the in-memory shape index against either core property-list shape.

`indexShapesIntoMemory` read `localShape.properties`. Newer `@_linked/core`
converted shape metadata to plain objects exposing `propertyShapes` and dropped
the `NodeShape.properties` getter, so that read returned undefined and threw on
`.map`. The throw happened while evaluating the object literal, before the
`shapeIndex[...] = ...` assignment, on the first shape class carrying a
`.shape` — so the loop aborted on its first iteration and the index was left
completely empty rather than partial. Everything reading it (LincdAPI
`get_all_shapes` / `get_shape_details`, and the shape-catalog fallback and
shape-sync in create-now-js) silently saw nothing.

Nothing surfaced because the async call was not awaited at either call site
(`initOnly`, `start`): the failure escaped as an unhandled rejection and boot
continued as if it had succeeded. Both call sites now await it.

The property list is read as `.properties ?? .propertyShapes`, so the index
builds against both the core generation this package declares (which still has
the getter) and newer core (plain objects).
