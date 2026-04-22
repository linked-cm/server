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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalFileStore = void 0;
var Upload_1 = require("@_linked/server-utils/utils/Upload");
var Shape_1 = require("@_linked/core/shapes/Shape");
var fsSync = __importStar(require("node:fs"));
var promises_1 = __importDefault(require("node:fs/promises"));
var node_path_1 = __importDefault(require("node:path"));
var LocalFileStore = /** @class */ (function (_super) {
    __extends(LocalFileStore, _super);
    function LocalFileStore(n, basePath) {
        if (basePath === void 0) { basePath = Upload_1.relativeFileSystemUploadPath; }
        var _this = this;
        if (typeof n === 'string') {
            var uri = "".concat(process.env.DATA_ROOT, "/local-filestore/").concat(n);
            _this = _super.call(this, { id: uri }) || this;
        }
        else {
            _this = _super.call(this, n) || this;
        }
        _this.accessURL = process.env.SITE_ROOT;
        _this.basePath = basePath;
        return _this;
    }
    /**
     * Delete a file from the local filesystem
     * @param filePath The path to the file to delete, relative to the base upload folder
     * @returns A promise that resolves when the file is deleted
     */
    LocalFileStore.prototype.deleteFile = function (filePath) {
        var fileToDelete = node_path_1.default.join(this.basePath, filePath);
        return promises_1.default.rm(fileToDelete);
    };
    /**
     * Check if a file exists on the local filesystem
     * @param filePath The path to the file to check, relative to the base upload folder
     * @returns A promise that resolves to true if the file exists, false otherwise
     */
    LocalFileStore.prototype.fileExists = function (filePath) {
        var fileToCheck = node_path_1.default.join(this.basePath, filePath);
        return promises_1.default
            .access(fileToCheck)
            .then(function () { return true; })
            .catch(function () { return false; });
    };
    /**
     * Get a file from the local filesystem
     * @param filePath The path to the file to get, relative to the base upload folder
     * @returns A promise that resolves to the file contents as a buffer, or null if the file does not exist
     */
    LocalFileStore.prototype.getFile = function (filePath) {
        var fileToGet = node_path_1.default.join(this.basePath, filePath);
        return promises_1.default.readFile(fileToGet).catch(function () { return null; });
    };
    /**
     * List all files in the local filesystem, relative to the base upload folder
     * @param recursive Whether or not to search all subdirectories recursively
     * @returns A promise that resolves to a list of file paths, relative to the base upload folder
     * @todo Think about taking an options parameter instead of positional args
     * @todo Take a path parameter to list files in a subdirectory
     */
    LocalFileStore.prototype.listFiles = function (prefix) {
        return __awaiter(this, void 0, void 0, function () {
            var files, allFiles;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, promises_1.default.readdir(this.basePath)];
                    case 1:
                        files = _a.sent();
                        return [4 /*yield*/, Promise.all(files.map(function (file) {
                                var filePath = node_path_1.default.join(_this.basePath, file);
                                return promises_1.default
                                    .stat(filePath)
                                    .then(function (stat) {
                                    if (stat.isDirectory()) {
                                        return _this.listFiles(prefix).then(function (files) {
                                            return files.map(function (file) { return node_path_1.default.join(filePath, file); });
                                        });
                                    }
                                    else {
                                        return [filePath];
                                    }
                                })
                                    .catch(function (err) {
                                    console.warn('Error during listFiles', err);
                                    return [];
                                });
                            }))];
                    case 2:
                        allFiles = _a.sent();
                        return [2 /*return*/, allFiles.flat()];
                }
            });
        });
    };
    /**
     * Save a file to the local filesystem
     * @param filePath The path to save the file to, relative to the base upload folder
     * @param fileContent The contents of the file as a buffer
     * @returns A promise that resolves to the public URL of the file
     */
    LocalFileStore.prototype.saveFile = function (filePath, fileContent, mimeType) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, publicURL, targetFilePath;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = (0, Upload_1.getUploadTarget)(filePath, mimeType, null, '', this.accessURL), publicURL = _a.publicURL, targetFilePath = _a.targetFilePath;
                        //make sure the target folder exists
                        if (!fsSync.existsSync(node_path_1.default.dirname(targetFilePath))) {
                            fsSync.mkdirSync(node_path_1.default.dirname(targetFilePath), { recursive: true });
                        }
                        return [4 /*yield*/, promises_1.default.writeFile(targetFilePath, fileContent)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, publicURL];
                }
            });
        });
    };
    return LocalFileStore;
}(Shape_1.Shape));
exports.LocalFileStore = LocalFileStore;
//# sourceMappingURL=LocalFileStore.js.map