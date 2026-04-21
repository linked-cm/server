var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { lincdServer } from '../../ontologies/lincd-server.js';
import { linkedShape } from '../../package.js';
import { Shape } from '@_linked/core/shapes/Shape';
import { Server } from '@_linked/server-utils/utils/Server';
/**
 * Frontend-side store that routes all queries to the backend via Server.call().
 * The backend's BackendAPIStoreProvider handles execution against the actual store.
 */
let BackendAPIStore = class BackendAPIStore extends Shape {
    constructor(n) {
        if (typeof n === 'string') {
            const uri = `${process.env.DATA_ROOT}/backend-api-store/${n}`;
            super({ id: uri });
        }
        else if (n) {
            super(n);
        }
        else {
            super();
        }
    }
    async init() {
        // No initialization needed — queries are routed to the backend
    }
    selectQuery(query) {
        const queryObj = typeof query.getQueryObject === 'function'
            ? query.getQueryObject()
            : query;
        return Server.call(this, 'selectQuery', queryObj);
    }
    updateQuery(query) {
        return Server.call(this, 'updateQuery', query);
    }
    createQuery(query) {
        return Server.call(this, 'createQuery', query);
    }
    deleteQuery(query) {
        return Server.call(this, 'deleteQuery', query);
    }
};
BackendAPIStore.targetClass = lincdServer.BackendAPIStore;
BackendAPIStore = __decorate([
    linkedShape,
    __metadata("design:paramtypes", [Object])
], BackendAPIStore);
export { BackendAPIStore };
//# sourceMappingURL=BackendAPIStore.js.map