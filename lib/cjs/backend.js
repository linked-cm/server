"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BackendProvider_1 = require("@_linked/server-utils/utils/BackendProvider");
const LinkedFileStorage_1 = require("@_linked/core/utils/LinkedFileStorage");
const LocalFileStore_js_1 = require("./shapes/filestores/LocalFileStore.js");
const Shapes_js_1 = require("./utils/Shapes.js");
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
__exportStar(require("./shapes/quadstores/BackendAPIStoreProvider.js"), exports);
class LincdServerBackendProvider extends BackendProvider_1.BackendProvider {
    setupBeforeControllers() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!LinkedFileStorage_1.LinkedFileStorage.getDefaultStore()) {
                LinkedFileStorage_1.LinkedFileStorage.setDefaultStore(new LocalFileStore_js_1.LocalFileStore(process.env.NODE_ENV + '-filestore'));
            }
            let fileSystemUploadPath = path_1.default.join('data', 'filestores');
            try {
                yield promises_1.default.access(fileSystemUploadPath);
            }
            catch (err) {
                yield promises_1.default.mkdir(path_1.default.join(fileSystemUploadPath, 'filestores'), {
                    recursive: true,
                });
            }
        });
    }
    getShapes() {
        return (0, Shapes_js_1.getShapeIndex)();
    }
}
exports.default = LincdServerBackendProvider;
//# sourceMappingURL=backend.js.map