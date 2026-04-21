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
var LincdWebApp_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LincdWebApp = void 0;
const package_js_1 = require("../package.js");
const lincd_server_js_1 = require("../ontologies/lincd-server.js");
const Shape_1 = require("@_linked/core/shapes/Shape");
const SHACL_1 = require("@_linked/core/shapes/SHACL");
const Lincd_API_Client_1 = require("@_linked/server-utils/shapes/Lincd_API_Client");
let LincdWebApp = LincdWebApp_1 = class LincdWebApp extends Shape_1.Shape {
    static get localApp() {
        return new LincdWebApp_1({ id: process.env.SITE_ROOT });
    }
    // Module and packages properties removed — lincd-modules is in modules_old.
    // These will be re-added when the shape is properly migrated to @_linked/core query patterns.
    get api() {
        return undefined;
    }
};
exports.LincdWebApp = LincdWebApp;
LincdWebApp.targetClass = lincd_server_js_1.lincdServer.LincdWebApp;
__decorate([
    (0, SHACL_1.objectProperty)({
        path: lincd_server_js_1.lincdServer.hasAPI,
        shape: Lincd_API_Client_1.Lincd_API_Client,
        maxCount: 1,
    }),
    __metadata("design:type", Lincd_API_Client_1.Lincd_API_Client),
    __metadata("design:paramtypes", [])
], LincdWebApp.prototype, "api", null);
exports.LincdWebApp = LincdWebApp = LincdWebApp_1 = __decorate([
    package_js_1.linkedShape
], LincdWebApp);
//# sourceMappingURL=LincdWebApp.js.map