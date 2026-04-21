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
import { linkedShape } from '../package.js';
import { lincdServer } from '../ontologies/lincd-server.js';
import { Shape } from '@_linked/core/shapes/Shape';
import { objectProperty } from '@_linked/core/shapes/SHACL';
import { Lincd_API_Client } from '@_linked/server-utils/shapes/Lincd_API_Client';
let LincdWebApp = LincdWebApp_1 = class LincdWebApp extends Shape {
    static get localApp() {
        return new LincdWebApp_1({ id: process.env.SITE_ROOT });
    }
    // Module and packages properties removed — lincd-modules is in modules_old.
    // These will be re-added when the shape is properly migrated to @_linked/core query patterns.
    get api() {
        return undefined;
    }
};
LincdWebApp.targetClass = lincdServer.LincdWebApp;
__decorate([
    objectProperty({
        path: lincdServer.hasAPI,
        shape: Lincd_API_Client,
        maxCount: 1,
    }),
    __metadata("design:type", Lincd_API_Client),
    __metadata("design:paramtypes", [])
], LincdWebApp.prototype, "api", null);
LincdWebApp = LincdWebApp_1 = __decorate([
    linkedShape
], LincdWebApp);
export { LincdWebApp };
//# sourceMappingURL=LincdWebApp.js.map