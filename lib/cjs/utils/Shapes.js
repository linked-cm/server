"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncShapes = exports.getShapeIndex = exports.getShapeFromIndex = void 0;
/**
 * Shape metadata index builder (backend-only).
 *
 * Types and read-only access (ShapeDetails, PropertyDetails, getShapeIndex)
 * are in @_linked/server-utils. This module provides syncShapes() which
 * populates the shared index at startup.
 */
const SHACL_1 = require("@_linked/core/shapes/SHACL");
const ShapeClass_1 = require("@_linked/core/utils/ShapeClass");
const ShapeIndex_1 = require("@_linked/server-utils/utils/ShapeIndex");
var ShapeIndex_2 = require("@_linked/server-utils/utils/ShapeIndex");
Object.defineProperty(exports, "getShapeFromIndex", { enumerable: true, get: function () { return ShapeIndex_2.getShapeFromIndex; } });
Object.defineProperty(exports, "getShapeIndex", { enumerable: true, get: function () { return ShapeIndex_2.getShapeIndex; } });
/**
 * Helper: convert a PathExpr to `{id: string}` or `{id: string}[]` for the shape index.
 */
function pathToIndexValue(path) {
    if (typeof path === 'string') {
        return { id: path };
    }
    if (path && 'id' in path) {
        return { id: path.id };
    }
    // Complex path (seq, alt, inv, etc.) — omit for now
    return { id: '' };
}
/**
 * Build the shape index from locally-registered NodeShape instances.
 * Backend-only — populates the shared shapeIndex from @_linked/server-utils.
 */
function syncShapes() {
    return __awaiter(this, void 0, void 0, function* () {
        const allShapeClasses = (0, ShapeClass_1.getAllShapeClasses)();
        for (let [_uri, shapeClass] of allShapeClasses) {
            const localShape = shapeClass.shape;
            if (!localShape)
                continue;
            ShapeIndex_1.shapeIndex[localShape.id] = {
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
            };
        }
        delete ShapeIndex_1.shapeIndex[(0, SHACL_1.getNodeShapeUri)('lincd', 'shape')];
    });
}
exports.syncShapes = syncShapes;
//# sourceMappingURL=Shapes.js.map