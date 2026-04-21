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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.LocalFileStore = void 0;
const Upload_1 = require("@_linked/server-utils/utils/Upload");
const Shape_1 = require("@_linked/core/shapes/Shape");
const fsSync = __importStar(require("node:fs"));
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
class LocalFileStore extends Shape_1.Shape {
    constructor(n, basePath = Upload_1.relativeFileSystemUploadPath) {
        if (typeof n === 'string') {
            const uri = `${process.env.DATA_ROOT}/local-filestore/${n}`;
            super({ id: uri });
        }
        else {
            super(n);
        }
        this.accessURL = process.env.SITE_ROOT;
        this.basePath = basePath;
    }
    /**
     * Delete a file from the local filesystem
     * @param filePath The path to the file to delete, relative to the base upload folder
     * @returns A promise that resolves when the file is deleted
     */
    deleteFile(filePath) {
        const fileToDelete = node_path_1.default.join(this.basePath, filePath);
        return promises_1.default.rm(fileToDelete);
    }
    /**
     * Check if a file exists on the local filesystem
     * @param filePath The path to the file to check, relative to the base upload folder
     * @returns A promise that resolves to true if the file exists, false otherwise
     */
    fileExists(filePath) {
        const fileToCheck = node_path_1.default.join(this.basePath, filePath);
        return promises_1.default
            .access(fileToCheck)
            .then(() => true)
            .catch(() => false);
    }
    /**
     * Get a file from the local filesystem
     * @param filePath The path to the file to get, relative to the base upload folder
     * @returns A promise that resolves to the file contents as a buffer, or null if the file does not exist
     */
    getFile(filePath) {
        const fileToGet = node_path_1.default.join(this.basePath, filePath);
        return promises_1.default.readFile(fileToGet).catch(() => null);
    }
    /**
     * List all files in the local filesystem, relative to the base upload folder
     * @param recursive Whether or not to search all subdirectories recursively
     * @returns A promise that resolves to a list of file paths, relative to the base upload folder
     * @todo Think about taking an options parameter instead of positional args
     * @todo Take a path parameter to list files in a subdirectory
     */
    listFiles(prefix) {
        return __awaiter(this, void 0, void 0, function* () {
            let files = yield promises_1.default.readdir(this.basePath);
            // if (recursive) {
            const allFiles = yield Promise.all(files.map((file) => {
                const filePath = node_path_1.default.join(this.basePath, file);
                return promises_1.default
                    .stat(filePath)
                    .then((stat) => {
                    if (stat.isDirectory()) {
                        return this.listFiles(prefix).then((files) => files.map((file) => node_path_1.default.join(filePath, file)));
                    }
                    else {
                        return [filePath];
                    }
                })
                    .catch((err) => {
                    console.warn('Error during listFiles', err);
                    return [];
                });
            }));
            return allFiles.flat();
        });
    }
    /**
     * Save a file to the local filesystem
     * @param filePath The path to save the file to, relative to the base upload folder
     * @param fileContent The contents of the file as a buffer
     * @returns A promise that resolves to the public URL of the file
     */
    saveFile(filePath, fileContent, mimeType) {
        return __awaiter(this, void 0, void 0, function* () {
            const { publicURL, targetFilePath } = (0, Upload_1.getUploadTarget)(filePath, mimeType, null, '', this.accessURL);
            //make sure the target folder exists
            if (!fsSync.existsSync(node_path_1.default.dirname(targetFilePath))) {
                fsSync.mkdirSync(node_path_1.default.dirname(targetFilePath), { recursive: true });
            }
            yield promises_1.default.writeFile(targetFilePath, fileContent);
            return publicURL;
        });
    }
}
exports.LocalFileStore = LocalFileStore;
//# sourceMappingURL=LocalFileStore.js.map