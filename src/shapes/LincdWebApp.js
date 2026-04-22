"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LincdWebApp = void 0;
var package_js_1 = require("../package.js");
var lincd_server_js_1 = require("../ontologies/lincd-server.js");
var Shape_1 = require("@_linked/core/shapes/Shape");
var SHACL_1 = require("@_linked/core/shapes/SHACL");
var Lincd_API_Client_1 = require("@_linked/server-utils/shapes/Lincd_API_Client");
var LincdWebApp = /** @class */ (function (_super) {
    __extends(LincdWebApp, _super);
    function LincdWebApp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LincdWebApp_1 = LincdWebApp;
    Object.defineProperty(LincdWebApp, "localApp", {
        get: function () {
            return new LincdWebApp_1({ id: process.env.SITE_ROOT });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LincdWebApp.prototype, "api", {
        // Module and packages properties removed — lincd-modules is in modules_old.
        // These will be re-added when the shape is properly migrated to @_linked/core query patterns.
        get: function () {
            return undefined;
        },
        enumerable: false,
        configurable: true
    });
    var LincdWebApp_1;
    var _a;
    LincdWebApp.targetClass = lincd_server_js_1.lincdServer.LincdWebApp;
    __decorate([
        (0, SHACL_1.objectProperty)({
            path: lincd_server_js_1.lincdServer.hasAPI,
            shape: Lincd_API_Client_1.Lincd_API_Client,
            maxCount: 1,
        }),
        __metadata("design:type", typeof (_a = typeof Lincd_API_Client_1.Lincd_API_Client !== "undefined" && Lincd_API_Client_1.Lincd_API_Client) === "function" ? _a : Object),
        __metadata("design:paramtypes", [])
    ], LincdWebApp.prototype, "api", null);
    LincdWebApp = LincdWebApp_1 = __decorate([
        package_js_1.linkedShape
    ], LincdWebApp);
    return LincdWebApp;
}(Shape_1.Shape));
exports.LincdWebApp = LincdWebApp;
//# sourceMappingURL=LincdWebApp.js.map