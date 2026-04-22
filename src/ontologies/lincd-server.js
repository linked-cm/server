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
Object.defineProperty(exports, "__esModule", { value: true });
exports.lincdServer = exports.hasAPI = exports.LincdAPI = exports.N3FileStore = exports.maintainsPackage = exports.ownPackage = exports.LincdWebApp = exports.BackendAPIStore = exports.BackendStore = exports.NodeFileStore = exports.BackendFileStore = exports.LincdServer = exports._self = exports.ns = exports.loadData = void 0;
var NameSpace_1 = require("@_linked/core/utils/NameSpace");
var package_js_1 = require("../package.js");
var _this = __importStar(require("./lincd-server.js"));
/**
 * Load the data of this ontology.
 * In @_linked/core, loadData returns the raw JSON import — no JSONLD.parse() needed.
 */
var loadData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('../data/lincd-server.json')); })];
            case 1:
                data = _a.sent();
                return [2 /*return*/, data.default || data];
        }
    });
}); };
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