"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.LincdAPI = void 0;
const Shape_1 = require("@_linked/core/shapes/Shape");
const package_js_1 = require("../package.js");
const lincd_server_js_1 = require("../ontologies/lincd-server.js");
const JSONParser_1 = require("@_linked/server-utils/utils/JSONParser");
const LinkedStorage_1 = require("@_linked/core/utils/LinkedStorage");
const JSONWriter_1 = require("@_linked/server-utils/utils/JSONWriter");
const cached_1 = require("@_linked/core/utils/cached");
const Shapes_js_1 = require("../utils/Shapes.js");
const cacheTime = process.env.NODE_ENV === 'development' ? 0 : Infinity;
let LincdAPI = class LincdAPI extends Shape_1.Shape {
    process(request, response, httpMethod) {
        return __awaiter(this, void 0, void 0, function* () {
            let { method, action } = request.params;
            const body = JSONParser_1.JSONParser.parseObject(request.body);
            //replace - with _ in action names
            let localMethod = httpMethod + '_' + method.replace(/-/g, '_');
            if (typeof this[localMethod] !== 'function') {
                throw new Error('Unknown method: ' + localMethod);
            }
            //TODO: access rights, check if the current user is allowed to execute this method
            try {
                const result = yield this[localMethod](body, request, response);
                if (typeof result !== 'undefined' || !response.headersSent) {
                    const jsonObject = JSONWriter_1.JSONWriter.toJsObject(result);
                    response.json(jsonObject);
                }
            }
            catch (error) {
                console.error(`Error while processing ${localMethod}:`, error);
                if (!response.headersSent) {
                    const message = error instanceof Error ? error.message : 'Unknown server error';
                    response.status(500).json({ error: message });
                }
            }
        });
    }
    get_shape_details({ shapes, }) {
        return (0, cached_1.cached)(() => {
            const shapeIndex = (0, Shapes_js_1.getShapeIndex)();
            const filteredShapeIndex = {};
            for (const shapeId of shapes) {
                if (shapeIndex[shapeId]) {
                    filteredShapeIndex[shapeId] = shapeIndex[shapeId];
                }
            }
            return filteredShapeIndex;
        }, [shapes], cacheTime);
    }
    get_all_shapes() {
        return (0, cached_1.cached)(() => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const shapeIndex = (0, Shapes_js_1.getShapeIndex)();
            const typesWithInstances = new Map();
            this.checkRawQuerySupport();
            yield LinkedStorage_1.LinkedStorage.getDefaultStore()
                .rawQuery(`SELECT (COUNT(?s) AS ?count) ?type WHERE { ?s a ?type } GROUP BY ?type`)
                .then((results) => {
                if (!results)
                    return;
                results.results.bindings.forEach((binding) => {
                    if (binding.type && binding.type.value) {
                        typesWithInstances.set(binding.type.value, parseInt(binding.count.value));
                    }
                });
            })
                .catch(console.error);
            const shapesWithInstances = {};
            for (const shapeId in shapeIndex) {
                const shape = shapeIndex[shapeId];
                shapesWithInstances[shapeId] = Object.assign(Object.assign({}, shape), { numInstances: typesWithInstances.get((_a = shape.targetClass) === null || _a === void 0 ? void 0 : _a.id) || 0 });
            }
            return {
                shapes: shapesWithInstances,
                defaultGraph: process.env.DATA_ROOT,
            };
        }), [], cacheTime);
    }
    post_select({ query }) {
        return LinkedStorage_1.LinkedStorage.selectQuery(query);
    }
    post_create({ query }) {
        return LinkedStorage_1.LinkedStorage.createQuery(query);
    }
    post_update({ query }) {
        return LinkedStorage_1.LinkedStorage.updateQuery(query);
    }
    post_delete({ query }) {
        return LinkedStorage_1.LinkedStorage.deleteQuery(query);
    }
    post_select_raw({ query }) {
        this.checkRawQuerySupport();
        return LinkedStorage_1.LinkedStorage.getDefaultStore().rawQuery(query);
    }
    checkRawQuerySupport() {
        if (!LinkedStorage_1.LinkedStorage.getDefaultStore().rawQuery) {
            throw new Error(`Default store (${Object.getPrototypeOf(LinkedStorage_1.LinkedStorage.getDefaultStore()).constructor
                .name}) does not support raw SPARQL queries`);
        }
    }
};
exports.LincdAPI = LincdAPI;
LincdAPI.targetClass = lincd_server_js_1.lincdServer.LincdAPI;
exports.LincdAPI = LincdAPI = __decorate([
    package_js_1.linkedShape
], LincdAPI);
//# sourceMappingURL=LincdAPI.js.map