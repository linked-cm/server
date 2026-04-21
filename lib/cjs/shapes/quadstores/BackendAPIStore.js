"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
exports.BackendAPIStore = void 0;
const lincd_server_js_1 = require("../../ontologies/lincd-server.js");
const package_js_1 = require("../../package.js");
const Shape_1 = require("@_linked/core/shapes/Shape");
const Server_1 = require("@_linked/server-utils/utils/Server");
/**
 * Frontend-side store that routes all queries to the backend via Server.call().
 * The backend's BackendAPIStoreProvider handles execution against the actual store.
 */
let BackendAPIStore = class BackendAPIStore extends Shape_1.Shape {
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
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            // No initialization needed — queries are routed to the backend
        });
    }
    selectQuery(query) {
        const queryObj = typeof query.getQueryObject === 'function'
            ? query.getQueryObject()
            : query;
        return Server_1.Server.call(this, 'selectQuery', queryObj);
    }
    updateQuery(query) {
        return Server_1.Server.call(this, 'updateQuery', query);
    }
    createQuery(query) {
        return Server_1.Server.call(this, 'createQuery', query);
    }
    deleteQuery(query) {
        return Server_1.Server.call(this, 'deleteQuery', query);
    }
};
exports.BackendAPIStore = BackendAPIStore;
BackendAPIStore.targetClass = lincd_server_js_1.lincdServer.BackendAPIStore;
exports.BackendAPIStore = BackendAPIStore = __decorate([
    package_js_1.linkedShape,
    __metadata("design:paramtypes", [Object])
], BackendAPIStore);
//# sourceMappingURL=BackendAPIStore.js.map