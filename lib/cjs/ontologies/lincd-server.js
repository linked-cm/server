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
Object.defineProperty(exports, "__esModule", { value: true });
exports.lincdServer = exports.hasAPI = exports.LincdAPI = exports.N3FileStore = exports.maintainsPackage = exports.ownPackage = exports.LincdWebApp = exports.BackendAPIStore = exports.BackendStore = exports.NodeFileStore = exports.BackendFileStore = exports.LincdServer = exports._self = exports.ns = exports.loadData = void 0;
const NameSpace_1 = require("@_linked/core/utils/NameSpace");
const package_js_1 = require("../package.js");
const _this = __importStar(require("./lincd-server.js"));
/**
 * Load the data of this ontology.
 * In @_linked/core, loadData returns the raw JSON import — no JSONLD.parse() needed.
 */
var loadData = () => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const data = yield Promise.resolve().then(() => __importStar(require('../data/lincd-server.json')));
    return data.default || data;
});
exports.loadData = loadData;
exports.ns = (0, NameSpace_1.createNameSpace)('http://lincd.org/ont/lincd-server/');
exports._self = (0, exports.ns)('');
exports.LincdServer = (0, exports.ns)('LincdServer');
exports.BackendFileStore = (0, exports.ns)('BackendFileStore');
exports.NodeFileStore = (0, exports.ns)('NodeFileStore');
exports.BackendStore = (0, exports.ns)('BackendStore');
exports.BackendAPIStore = (0, exports.ns)('BackendAPIStore');
exports.LincdWebApp = (0, exports.ns)('LincdWebApp');
exports.ownPackage = (0, exports.ns)('ownPackage');
exports.maintainsPackage = (0, exports.ns)('maintainsPackage');
exports.N3FileStore = (0, exports.ns)('N3FileStore');
exports.LincdAPI = (0, exports.ns)('LincdAPI');
exports.hasAPI = (0, exports.ns)('hasAPI');
exports.lincdServer = {
    LincdServer: exports.LincdServer,
    BackendFileStore: exports.BackendFileStore,
    NodeFileStore: exports.NodeFileStore,
    BackendStore: exports.BackendStore,
    N3FileStore: exports.N3FileStore,
    BackendAPIStore: exports.BackendAPIStore,
    LincdWebApp: exports.LincdWebApp,
    ownPackage: exports.ownPackage,
    maintainsPackage: exports.maintainsPackage,
    LincdAPI: exports.LincdAPI,
    hasAPI: exports.hasAPI,
};
(0, package_js_1.linkedOntology)(_this, exports.ns, 'lincd-server', exports.loadData, '../data/lincd-server.json');
//# sourceMappingURL=lincd-server.js.map