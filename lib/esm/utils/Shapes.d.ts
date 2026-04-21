export type { ShapeDetails, PropertyDetails } from '@_linked/server-utils/types/ShapeDetails';
export { getShapeFromIndex, getShapeIndex } from '@_linked/server-utils/utils/ShapeIndex';
/**
 * Build the shape index from locally-registered NodeShape instances.
 * Backend-only — populates the shared shapeIndex from @_linked/server-utils.
 */
export declare function syncShapes(): Promise<void>;
