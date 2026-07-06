/**
 * Shape metadata index builder (backend-only).
 *
 * Types and read-only access (ShapeDetails, PropertyDetails, getShapeIndex)
 * are in @_linked/server-utils. This module provides indexShapesIntoMemory()
 * which populates the shared in-memory index at startup. (Distinct from core's
 * `syncShapes`, which materializes shapes into the RDF store as SHACL.)
 */
import { NodeShape, getNodeShapeUri } from '@_linked/core/shapes/SHACL';
import { getAllShapeClasses } from '@_linked/core/utils/ShapeClass';
import type { PathExpr } from '@_linked/core/paths/PropertyPathExpr';
import type { ShapeDetails } from '@_linked/server-utils/types/ShapeDetails';
import { shapeIndex } from '@_linked/server-utils/utils/ShapeIndex';

// Re-export for backward compatibility
export type { ShapeDetails, PropertyDetails } from '@_linked/server-utils/types/ShapeDetails';
export { getShapeFromIndex, getShapeIndex } from '@_linked/server-utils/utils/ShapeIndex';

/**
 * Helper: convert a PathExpr to `{id: string}` or `{id: string}[]` for the shape index.
 */
function pathToIndexValue(path: PathExpr): { id: string } | { id: string }[] {
  if (typeof path === 'string') {
    return { id: path };
  }
  if (path && 'id' in path) {
    return { id: (path as { id: string }).id };
  }
  // Complex path (seq, alt, inv, etc.) — omit for now
  return { id: '' };
}

/**
 * Build the shape index from locally-registered NodeShape instances.
 * Backend-only — populates the shared shapeIndex from @_linked/server-utils.
 */
export async function indexShapesIntoMemory() {
  const allShapeClasses = getAllShapeClasses();

  for (let [_uri, shapeClass] of allShapeClasses) {
    const localShape = (shapeClass as any).shape as NodeShape;
    if (!localShape) continue;
    shapeIndex[localShape.id] = {
      id: localShape.id,
      label: localShape.label,
      description: localShape.description,
      extends: localShape.extends ? { id: localShape.extends.id } : undefined,
      targetClass: localShape.targetClass
        ? { id: localShape.targetClass.id }
        : undefined,
      properties: localShape.properties.map((p) => ({
        id: p.id,
        label: p.label,
        path: pathToIndexValue(p.path),
        valueShape: p.valueShape ? { id: p.valueShape.id } : undefined,
        datatype: p.datatype ? { id: p.datatype.id } : undefined,
        description: p.description,
        maxCount: p.maxCount,
        minCount: p.minCount,
        nodeKind: p.nodeKind ? { id: p.nodeKind.id } : undefined,
        name: p.name,
      })),
    } as any as ShapeDetails;
  }

  delete shapeIndex[getNodeShapeUri('lincd', 'shape')];
}
