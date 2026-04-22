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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShapeIndex = exports.getShapeFromIndex = void 0;
exports.syncShapes = syncShapes;
/**
 * Shape metadata index builder (backend-only).
 *
 * Types and read-only access (ShapeDetails, PropertyDetails, getShapeIndex)
 * are in @_linked/server-utils. This module provides syncShapes() which
 * populates the shared index at startup.
 */
var SHACL_1 = require("@_linked/core/shapes/SHACL");
var ShapeClass_1 = require("@_linked/core/utils/ShapeClass");
var ShapeIndex_1 = require("@_linked/server-utils/utils/ShapeIndex");
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
    return __awaiter(this, void 0, void 0, function () {
        var allShapeClasses, allShapeClasses_1, allShapeClasses_1_1, _a, _uri, shapeClass, localShape;
        var e_1, _b;
        return __generator(this, function (_c) {
            allShapeClasses = (0, ShapeClass_1.getAllShapeClasses)();
            try {
                for (allShapeClasses_1 = __values(allShapeClasses), allShapeClasses_1_1 = allShapeClasses_1.next(); !allShapeClasses_1_1.done; allShapeClasses_1_1 = allShapeClasses_1.next()) {
                    _a = __read(allShapeClasses_1_1.value, 2), _uri = _a[0], shapeClass = _a[1];
                    localShape = shapeClass.shape;
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
                        properties: localShape.properties.map(function (p) { return ({
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
                        }); }),
                    };
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (allShapeClasses_1_1 && !allShapeClasses_1_1.done && (_b = allShapeClasses_1.return)) _b.call(allShapeClasses_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            delete ShapeIndex_1.shapeIndex[(0, SHACL_1.getNodeShapeUri)('lincd', 'shape')];
            return [2 /*return*/];
        });
    });
}
//# sourceMappingURL=Shapes.js.map