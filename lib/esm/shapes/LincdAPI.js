var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Shape } from '@_linked/core/shapes/Shape';
import { linkedShape } from '../package.js';
import { lincdServer } from '../ontologies/lincd-server.js';
import { JSONParser } from '@_linked/server-utils/utils/JSONParser';
import { LinkedStorage } from '@_linked/core/utils/LinkedStorage';
import { JSONWriter } from '@_linked/server-utils/utils/JSONWriter';
import { cached } from '@_linked/core/utils/cached';
import { getShapeIndex } from '../utils/Shapes.js';
const cacheTime = process.env.NODE_ENV === 'development' ? 0 : Infinity;
let LincdAPI = class LincdAPI extends Shape {
    async process(request, response, httpMethod) {
        let { method, action } = request.params;
        const body = JSONParser.parseObject(request.body);
        //replace - with _ in action names
        let localMethod = httpMethod + '_' + method.replace(/-/g, '_');
        if (typeof this[localMethod] !== 'function') {
            throw new Error('Unknown method: ' + localMethod);
        }
        //TODO: access rights, check if the current user is allowed to execute this method
        try {
            const result = await this[localMethod](body, request, response);
            if (typeof result !== 'undefined' || !response.headersSent) {
                const jsonObject = JSONWriter.toJsObject(result);
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
    }
    get_shape_details({ shapes, }) {
        return cached(() => {
            const shapeIndex = getShapeIndex();
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
        return cached(async () => {
            var _a;
            const shapeIndex = getShapeIndex();
            const typesWithInstances = new Map();
            this.checkRawQuerySupport();
            await LinkedStorage.getDefaultStore()
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
                shapesWithInstances[shapeId] = {
                    ...shape,
                    numInstances: typesWithInstances.get((_a = shape.targetClass) === null || _a === void 0 ? void 0 : _a.id) || 0,
                };
            }
            return {
                shapes: shapesWithInstances,
                defaultGraph: process.env.DATA_ROOT,
            };
        }, [], cacheTime);
    }
    post_select({ query }) {
        return LinkedStorage.selectQuery(query);
    }
    post_create({ query }) {
        return LinkedStorage.createQuery(query);
    }
    post_update({ query }) {
        return LinkedStorage.updateQuery(query);
    }
    post_delete({ query }) {
        return LinkedStorage.deleteQuery(query);
    }
    post_select_raw({ query }) {
        this.checkRawQuerySupport();
        return LinkedStorage.getDefaultStore().rawQuery(query);
    }
    checkRawQuerySupport() {
        if (!LinkedStorage.getDefaultStore().rawQuery) {
            throw new Error(`Default store (${Object.getPrototypeOf(LinkedStorage.getDefaultStore()).constructor
                .name}) does not support raw SPARQL queries`);
        }
    }
};
LincdAPI.targetClass = lincdServer.LincdAPI;
LincdAPI = __decorate([
    linkedShape
], LincdAPI);
export { LincdAPI };
//# sourceMappingURL=LincdAPI.js.map