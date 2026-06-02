'use strict';
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LincdServer = void 0;
var chalk_1 = __importDefault(require("chalk"));
var events_1 = __importDefault(require("events"));
var express_1 = __importDefault(require("express"));
var fetch_cookie_1 = __importDefault(require("fetch-cookie"));
var fsNative = __importStar(require("fs"));
var fs = __importStar(require("fs/promises"));
var config_webpack_app_1 = require("@_linked/cli/config-webpack-app");
var cli_methods_1 = require("@_linked/cli/cli-methods");
var utils_1 = require("@_linked/cli/utils");
var AppContext_1 = require("@_linked/server-utils/components/AppContext");
var JSONParser_1 = require("@_linked/server-utils/utils/JSONParser");
var JSONWriter_1 = require("@_linked/server-utils/utils/JSONWriter");
var Server_1 = require("@_linked/server-utils/utils/Server");
var ShapeProvider_1 = require("@_linked/server-utils/utils/ShapeProvider");
var CoreMap_1 = require("@_linked/core/collections/CoreMap");
var Shape_1 = require("@_linked/core/shapes/Shape");
var LinkedErrorLogging_1 = require("@_linked/core/utils/LinkedErrorLogging");
var LinkedFileStorage_1 = require("@_linked/core/utils/LinkedFileStorage");
var LinkedStorage_1 = require("@_linked/core/utils/LinkedStorage");
var Package_1 = require("@_linked/core/utils/Package");
var ShapeClass_1 = require("@_linked/core/utils/ShapeClass");
var path_1 = __importDefault(require("path"));
var process_1 = __importDefault(require("process"));
var React = __importStar(require("react"));
var server_1 = require("react-dom/server");
var server_js_1 = require("react-router-dom/server.js");
var rimraf_1 = require("rimraf");
var sharp_1 = __importDefault(require("sharp"));
var stream_1 = require("stream");
var tough_cookie_1 = require("tough-cookie");
var webpack_1 = __importDefault(require("webpack"));
var webpack_dev_middleware_1 = __importDefault(require("webpack-dev-middleware"));
var webpack_hot_middleware_1 = __importDefault(require("webpack-hot-middleware"));
var lincd_server_js_1 = require("../ontologies/lincd-server.js");
var package_js_1 = require("../package.js");
var Shapes_js_1 = require("../utils/Shapes.js");
var LincdAPI_js_1 = require("./LincdAPI.js");
//prevent errors in node.js when (s)css files are imported in js
var isProduction = process_1.default.env.NODE_ENV === 'production';
var isDevelopment = process_1.default.env.NODE_ENV === 'development';
// Install a global fetch that persists cookies across redirects using a CookieJar.
// This ensures server-side requests behave more like browsers when handling Set-Cookie + redirects.
var __lincdCookieJar = new tough_cookie_1.CookieJar();
// Wrap native fetch with fetch-cookie so it reads/writes cookies in the jar.
var __lincdFetchWithCookies = (0, fetch_cookie_1.default)(fetch, __lincdCookieJar);
// Expose (optionally) for debugging/tests; not required by app logic.
globalThis.__lincdCookieJar = __lincdCookieJar;
// Set the global fetch used throughout the server code path
globalThis.fetch = __lincdFetchWithCookies;
process_1.default.on('uncaughtException', function (err) {
    console.warn(chalk_1.default.red('Asynchronous error caught.'));
    console.error(err);
    // error logging
    LinkedErrorLogging_1.LinkedErrorLogging.log(err);
});
process_1.default.on('unhandledRejection', function (err) {
    console.warn(chalk_1.default.red('Unhandled rejection caught.'));
    console.error(err);
    // error logging
    LinkedErrorLogging_1.LinkedErrorLogging.log(err);
});
process_1.default.on('warning', function (e) { return console.warn(e.stack); });
//allow more listeners for when we have many concurrent users
events_1.default.EventEmitter.prototype.setMaxListeners(500);
// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// const { document } = (new JSDOM(`...`)).window;
//
// global['document'] = document;
global['reactStaticRenderer'] = server_1.renderToStaticMarkup;
(0, Package_1.autoLoadOntologyData)(true);
var LincdServer = /** @class */ (function (_super) {
    __extends(LincdServer, _super);
    /**
     * yarn linked start sends the contents of linked.config.js as an object to this constructor
     * @param n
     */
    function LincdServer(config) {
        var _this = _super.call(this, typeof config === 'string' || (config && 'id' in config)
            ? config
            : undefined) || this;
        _this.cachedPaths = new Map();
        _this.latestManifest = null;
        _this.cssMode = 'scss-modules';
        _this.analyse = false;
        _this.shapeProviders = new CoreMap_1.CoreMap();
        _this.genericProviders = new CoreMap_1.CoreMap();
        //from resizedFileName to full resized path (CDN or similar)
        _this.resizePathsMap = new Map();
        if (config && typeof config !== 'string' && !('id' in config)) {
            _this.config = config;
        }
        _this.api = new LincdAPI_js_1.LincdAPI({ id: process_1.default.env.SITE_ROOT + '/api' });
        //Ensure the Server utility (for Server.call()) directly accesses
        // this server on the backend instead of going through a network call
        Server_1.Server.setLocalServer(_this);
        return _this;
    }
    Object.defineProperty(LincdServer.prototype, "app", {
        /*async getLincdDependencies(): Promise<string[]> {
              let lincdDependencies = [];
              let dependencies = this.package.dependencies;
      
              await Promise.all(
                  Object.keys(dependencies).map((dependencyPkgName) => {
                      let modulePackageJson = getModulePackageJSON(dependencyPkgName);
                      if (modulePackageJson['lincd']) {
                          lincdDependencies.push(modulePackageJson.name);
                      }
                      //   //TODO: also iteratively look into dependencies of this dependency
      
                      // let packagePath;
                      // try {
                      //   packagePath = require.resolve(`${dependencyPkgName}`);
                      // } catch (err) {
                      //   console.warn('Could not find package ' + dependencyPkgName+'. Error: '+err.toString());
                      //   return;
                      // }
                      // packagePath = path.dirname(packagePath) + '/package.json'
                      // return fs
                      //   .readFile(packagePath, 'utf-8')
                      //   .then((res) => {
                      //     let pkg = JSON.parse(res);
                      //     if (pkg['lincd']) {
                      //       lincdDependencies.push(pkg.name);
                      //     }
                          //   //TODO: also iteratively look into dependencies of this dependency
                          // })
                          // .catch((err) => {
                          //   console.log('Could not read package.json file: '+err);
                          // });
                  }),
              );
              return lincdDependencies;
          }*/
        get: function () {
            return this.server;
        },
        enumerable: false,
        configurable: true
    });
    LincdServer.prototype.initPackage = function () {
        this.package = JSON.parse(fsNative.readFileSync(path_1.default.resolve(process_1.default.cwd(), 'package.json'), 'utf-8'));
    };
    LincdServer.prototype.initOnly = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initOntologies()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.initStores()];
                    case 2:
                        _a.sent();
                        this.initPackage();
                        this.server = (0, express_1.default)();
                        return [4 /*yield*/, this.initBackendProviders()];
                    case 3:
                        _a.sent();
                        (0, Shapes_js_1.syncShapes)();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    // async serveData(req,res) {
    //   let nodeURI = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    //
    //   let store = LinkedStorage.getDatasets().find(store => {
    //     return nodeURI.includes(store.namedNode.uri)
    //   })
    // }
    LincdServer.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var staticAccessURL, staticAsset, manifestPath, manifestRaw, isProduction, PORT, dirName, skipBuild, webpackConfig, compiler, updatedMetadata_1, oneYear, oneMonth, HOST;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.initPackage();
                        staticAccessURL = (process_1.default.env.STATIC_ACCESS_URL ||
                            LinkedFileStorage_1.LinkedFileStorage.accessURL ||
                            '').replace(/\/$/, '');
                        staticAsset = function (assetPath) {
                            return "".concat(staticAccessURL, "/public").concat(assetPath);
                        };
                        //for apps with multiple bundles this should be read from the webpack build manifest
                        this.assets = {
                            'main.js': staticAsset('/bundles/main.bundle.js') + '?v=' + this.package.version, //output js bundle from Webpack
                            'main.css': staticAsset('/bundles/main.css'), //output css from Webpack
                        };
                        try {
                            manifestPath = path_1.default.resolve(process_1.default.cwd(), 'public/bundles/manifest.json');
                            if (fsNative.existsSync(manifestPath)) {
                                manifestRaw = fsNative.readFileSync(manifestPath, 'utf-8');
                                this.assets.manifest = JSON.parse(manifestRaw);
                            }
                        }
                        catch (err) {
                            console.warn('Could not load bundle manifest:', err);
                        }
                        isProduction = process_1.default.env.NODE_ENV === 'production';
                        if (!isProduction && this.config.cssMode === 'tailwind') {
                            this.assets['tailwind-cdn'] = 'https://cdn.tailwindcss.com';
                        }
                        PORT = parseInt(process_1.default.env.PORT) || 4000;
                        this.server = (0, express_1.default)();
                        dirName = path_1.default.resolve(process_1.default.cwd(), 'frontend');
                        return [4 /*yield*/, this.initOntologies()];
                    case 1:
                        _a.sent();
                        //TODO: when we do not keep all data in memory (and thus do not need to rely on in memory data for page requests), we can possibly remove await here, since all stores handle their own initialisation before executing commands
                        return [4 /*yield*/, this.initStores()];
                    case 2:
                        //TODO: when we do not keep all data in memory (and thus do not need to rely on in memory data for page requests), we can possibly remove await here, since all stores handle their own initialisation before executing commands
                        _a.sent();
                        this.initGarbageCollection();
                        // this.app.use((req, res, next) => {
                        //   console.log('start request');
                        //   next();
                        // });
                        // before controllers
                        return [4 /*yield*/, this.initBackendProviders()];
                    case 3:
                        // this.app.use((req, res, next) => {
                        //   console.log('start request');
                        //   next();
                        // });
                        // before controllers
                        _a.sent();
                        (0, Shapes_js_1.syncShapes)();
                        //START OF EXPRESS ROUTES AND MIDDLEWARE
                        //use cors
                        // var corsOptions = {
                        //   origin: ['http://localhost:4001', 'https://www.mynd.site'],
                        //   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
                        // };
                        // //accept JSON bodies
                        // this.server.use(bodyParser.json({limit: '50mb'}));
                        this.server.use(express_1.default.json({ limit: '50mb' }));
                        // this.server.use(cors(corsOptions));
                        //
                        // //compress server output with gzip,
                        //UPDATE ive set level to 2 (low compression fast speed) because responses were taking too long (98% of server time was used by compress)
                        // this.server.use(compress({level: 2}));
                        return [4 /*yield*/, this.callGenericBackendProvidersMethod('setupBeforeControllers')];
                    case 4:
                        // this.server.use(cors(corsOptions));
                        //
                        // //compress server output with gzip,
                        //UPDATE ive set level to 2 (low compression fast speed) because responses were taking too long (98% of server time was used by compress)
                        // this.server.use(compress({level: 2}));
                        _a.sent();
                        skipBuild = process_1.default.env.NO_WEBPACK === 'true';
                        if (!(isDevelopment && !skipBuild)) return [3 /*break*/, 7];
                        return [4 /*yield*/, (0, config_webpack_app_1.getWebpackAppConfig)()];
                    case 5:
                        webpackConfig = _a.sent();
                        // const compare = (c1,c2,path?='') => {
                        //   for(let key1 of Object.keys(c1)) {
                        //     if(typeof c1[key1] === 'object') {
                        //       compare(c1[key1],c2[key1],path+='.'+key1);
                        //     } else {
                        //       if(c1[key1] !== c2[key1]) {
                        //         console.log("Difference "+path+": ");
                        //         console.log(c1[key1]);
                        //         console.log(c2[key1]);
                        //       }
                        //     }
                        //   }
                        // }
                        // compare(webpackConfig,webpackConfig2);
                        //default to having webpack cache on and filesystem, unless explicitly set to false
                        if (this.cacheWebpack === false) {
                            webpackConfig.cache.type = 'memory';
                        }
                        else {
                            webpackConfig.cache.type = 'filesystem';
                        }
                        //clean dist/build folder
                        return [4 /*yield*/, (0, rimraf_1.rimraf)(webpackConfig.output.path).catch(function (err) {
                                if (err) {
                                    console.warn(err);
                                }
                            })];
                    case 6:
                        //clean dist/build folder
                        _a.sent();
                        compiler = (0, webpack_1.default)(webpackConfig, function (err, stats) {
                            //watch build completed
                            if (err) {
                                console.error(err);
                            }
                            // Output stats JSON for analysis
                            if (_this.analyse) {
                                fs.writeFile('./data/webpack-stats.json', JSON.stringify(stats.toJson({ all: true }), null, 2)).then(function () {
                                    console.log('Webpack stats written to ./data/webpack-stats.json');
                                });
                            }
                        });
                        if (!compiler) {
                            //something went wrong with webpack config, error will be logged above
                            return [2 /*return*/];
                        }
                        compiler.hooks.afterEmit.tap('cleanup-the-require-cache', function () {
                            // After webpack rebuild, clear the files from the require cache,
                            // so that next server side render wil be in sync
                            // console.log(Object.keys(require.cache).filter(k => k.includes(dirName)).join("\n"));
                            // if (typeof require !== 'undefined') {
                            //   Object.keys(require.cache)
                            //     .filter((key) => key.includes(dirName))
                            //     .forEach((key) => delete require.cache[key]);
                            // }
                        });
                        updatedMetadata_1 = false;
                        compiler.hooks.afterEmit.tap('update-metadata', function () {
                            if (!updatedMetadata_1) {
                                updatedMetadata_1 = true;
                                //log updated paths
                                // buildMetadata()
                                //   .then((updatedPaths) => {
                                //     // if(updatedPaths && updatedPaths.length)
                                //     // {
                                //     //   console.log(chalk.blueBright('Updated metadata:\n - '+updatedPaths.join('\n - ')));
                                //     // }
                                //   })
                                //   .catch((err) => {
                                //     console.warn('Could not update metadata: ' + err);
                                //   });
                            }
                        });
                        this.server.use((0, webpack_dev_middleware_1.default)(compiler, {
                            serverSideRender: true,
                            publicPath: webpackConfig.output.publicPath,
                            stats: {
                                children: true,
                                version: false,
                                chunks: false,
                                assets: false,
                                entrypoints: false,
                                modules: false,
                            },
                            writeToDisk: true,
                        }));
                        compiler.hooks.afterEmit.tap('store-manifest', function (compilation) {
                            try {
                                // Read manifest from the filesystem after webpack writes it
                                var manifestPath = path_1.default.resolve(compilation.options.output.path, 'manifest.json');
                                if (fsNative.existsSync(manifestPath)) {
                                    var manifestContent = fsNative.readFileSync(manifestPath, 'utf-8');
                                    _this.latestManifest = JSON.parse(manifestContent);
                                }
                            }
                            catch (err) {
                                console.warn('Failed to parse manifest from webpack emit:', err);
                            }
                        });
                        this.server.use((0, webpack_hot_middleware_1.default)(compiler, {
                            log: false,
                        }));
                        _a.label = 7;
                    case 7:
                        oneYear = 1000 * 60 * 60 * 24 * 365;
                        oneMonth = 1000 * 60 * 60 * 24 * 30;
                        this.server.use('/public', express_1.default.static('./public', {
                            maxAge: oneYear, // Tell browser to cache for 1 year
                            immutable: true, // Suggest that the content won't change
                        }));
                        this.server.use('/uploads', express_1.default.static('./data/uploads', {
                            maxAge: oneYear, // Tell browser to cache for 1 year
                            immutable: true, // Suggest that the content won't change
                        }));
                        this.server.use('/', express_1.default.static('./public/root'));
                        this.server.use('/favicon.ico', express_1.default.static('./public/favicon.ico', {
                            maxAge: oneMonth, // Tell browser to cache for 1 year
                            immutable: true, // Suggest that the content won't change
                        }));
                        this.server.use('/.well-known', express_1.default.static('./public/.well-known'));
                        // this.server.post('/data',this.handleErrorsJson(async (req,res) => this.serveData(req, res)));
                        this.server.get('/resized/*', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                this.resizeImage(req, res);
                                return [2 /*return*/];
                            });
                        }); });
                        this.server.post('/call/:pkg/:method', this.handleErrorsJson(function (req, res) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, this.processBackendMethodCall(req, res)];
                        }); }); }));
                        this.server.post('/call/:pkg/:shape/:method', this.handleErrorsJson(function (req, res) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, this.processShapeMethodCall(req, res)];
                        }); }); }));
                        this.server.post('/api/:method/:action?', this.handleErrorsJson(function (req, res) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, this.processAPICall(req, res, 'post')];
                        }); }); }));
                        this.server.get('/api/:method/:action?', this.handleErrorsJson(function (req, res) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, this.processAPICall(req, res, 'get')];
                        }); }); }));
                        // this.server.post(
                        //   '/api/query/:method',
                        //   this.handleErrorsJson(async (req, res) => this.processQuery(req, res)),
                        // );
                        // now that all the middleware is defined, we initialise the providers, before we define a catch-all route
                        // before catch all
                        // await this.initBackendProviders();
                        return [4 /*yield*/, this.callGenericBackendProvidersMethod('setupBeforeCatchAllControllers')];
                    case 8:
                        // this.server.post(
                        //   '/api/query/:method',
                        //   this.handleErrorsJson(async (req, res) => this.processQuery(req, res)),
                        // );
                        // now that all the middleware is defined, we initialise the providers, before we define a catch-all route
                        // before catch all
                        // await this.initBackendProviders();
                        _a.sent();
                        // HEAD catch-all for maintenance/health check (client fetches SITE_ROOT with method: HEAD)
                        this.server.head('__health', function (_req, res) {
                            res.sendStatus(200);
                        });
                        this.server.get('*', this.handleErrors(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                //make sure the frontend bundle has finished building
                                // await this.waitForWebpack();
                                this.render(req, res);
                                return [2 /*return*/];
                            });
                        }); }));
                        // after controller
                        return [4 /*yield*/, this.callGenericBackendProvidersMethod('setupAfterControllers')];
                    case 9:
                        // after controller
                        _a.sent();
                        HOST = process_1.default.env.SITE_ROOT.replace(/https?:\/\//, '').replace(/:\d+$/, '');
                        //backlog of 1024 means maximum of 1024 connections in the queue (higher than default)
                        this.httpServer = this.server.listen({ port: PORT, backlog: 1024 }, function () {
                            console.log("Up and running at http://localhost:".concat(PORT));
                            // open(`http://localhost:${PORT}`)
                        });
                        // Ensure all inactive connections are terminated by the ALB, by setting this a few seconds higher than the ALB idle timeout
                        this.httpServer.keepAliveTimeout = 60000;
                        // Ensure the headersTimeout is set higher than the keepAliveTimeout due to this nodejs regression bug: https://github.com/nodejs/node/issues/27363
                        this.httpServer.headersTimeout = 61000;
                        this.httpServer.on('error', function (error) {
                            if (error['syscall'] !== 'listen') {
                                throw error;
                            }
                            var isPipe = function (portOrPipe) { return Number.isNaN(portOrPipe); };
                            var bind = isPipe(PORT) ? 'Pipe ' + PORT : 'Port ' + PORT;
                            switch (error['code']) {
                                case 'EACCES':
                                    console.error(bind + ' requires elevated privileges');
                                    process_1.default.exit(1);
                                case 'EADDRINUSE':
                                    console.error(bind + ' is already in use');
                                    process_1.default.exit(1);
                                default:
                                    throw error;
                            }
                        });
                        return [2 /*return*/, this];
                }
            });
        });
    };
    LincdServer.prototype.initOntologies = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    /**
     *
     * @returns
     * @todo Check if default file store is set, if not, set it
     */
    LincdServer.prototype.initStores = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.all(LinkedStorage_1.LinkedStorage.getDatasets().map(function (store) {
                        return store.init ? store.init() : Promise.resolve();
                    }))];
            });
        });
    };
    // get generic backend providers for handle controller methods
    LincdServer.prototype.callGenericBackendProvidersMethod = function (method) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, genericProvider, e_1_1;
            var e_1, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 5, 6, 7]);
                        _a = __values(this.genericProviders.values()), _b = _a.next();
                        _d.label = 1;
                    case 1:
                        if (!!_b.done) return [3 /*break*/, 4];
                        genericProvider = _b.value;
                        if (!genericProvider || !genericProvider[method]) {
                            return [3 /*break*/, 3];
                        }
                        if (!(typeof genericProvider[method] == 'function')) return [3 /*break*/, 3];
                        return [4 /*yield*/, Promise.resolve(genericProvider[method].apply(genericProvider, __spreadArray([], __read(args), false)))];
                    case 2:
                        _d.sent();
                        _d.label = 3;
                    case 3:
                        _b = _a.next();
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 7];
                    case 6:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Removes temporary nodes from memory if they've been seen twice
     * Current interval is once per hour.
     * So after 2 hours temporary nodes are removed.
     */
    LincdServer.prototype.initGarbageCollection = function () {
        // let seenLastTime:NodeSet<NamedNode> = null;
        // setInterval(() => {
        //
        //   let tempNodes = new NodeSet<NamedNode>();
        //   NamedNode.getAllNamedNodes().forEach(n => {
        //     if(n.isTemporaryNode) {
        //       if(seenLastTime && seenLastTime.has(n))
        //       {
        //         n.remove();
        //       } else {
        //         tempNodes.add(n);
        //       }
        //     }
        //   })
        //   seenLastTime = tempNodes;
        // }, 1000 * 10); //every 10 sec
        // // }, 1000 * 60 * 60); //every hour
    };
    LincdServer.prototype.initBackendProviders = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allLocalPackages, localPackageMap, relevantPackages, relevantPackages_1, relevantPackages_1_1, _a, pkgName, pkg, e_2_1, err_1;
            var e_2, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        allLocalPackages = (0, cli_methods_1.getLincdPackages)();
                        localPackageMap = new Map(allLocalPackages.map(function (pkg) { return [pkg.packageName, pkg]; }));
                        relevantPackages = this.filterPackagesByDependencyTree(localPackageMap, this.package);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 7, 8, 9]);
                        relevantPackages_1 = __values(relevantPackages), relevantPackages_1_1 = relevantPackages_1.next();
                        _c.label = 2;
                    case 2:
                        if (!!relevantPackages_1_1.done) return [3 /*break*/, 6];
                        _a = __read(relevantPackages_1_1.value, 2), pkgName = _a[0], pkg = _a[1];
                        return [4 /*yield*/, this.indexPackageBackendProviders(pkgName)];
                    case 3:
                        _c.sent();
                        return [4 /*yield*/, this.indexLincdPackage(pkgName)];
                    case 4:
                        _c.sent();
                        _c.label = 5;
                    case 5:
                        relevantPackages_1_1 = relevantPackages_1.next();
                        return [3 /*break*/, 2];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_2_1 = _c.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (relevantPackages_1_1 && !relevantPackages_1_1.done && (_b = relevantPackages_1.return)) _b.call(relevantPackages_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 9:
                        _c.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, fs
                                .readFile(path_1.default.join(process_1.default.cwd(), 'package.json'), 'utf-8')
                                .then(function (contents) { return __awaiter(_this, void 0, void 0, function () {
                                var pkg;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            pkg = JSON.parse(contents);
                                            return [4 /*yield*/, this.indexPackageBackendProviders(pkg.name, false, path_1.default.join(process_1.default.cwd(), 'src', 'backend.ts'))];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 10:
                        _c.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        err_1 = _c.sent();
                        console.warn(err_1);
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Filters local workspace packages to only those reachable from the app's
     * dependency tree. Mirrors the logic used by `buildAll` in lincd-cli.
     */
    LincdServer.prototype.filterPackagesByDependencyTree = function (allPackages, appPackageJson) {
        var e_3, _a, e_4, _b;
        var relevantPackages = new Map();
        var packagesToCheck = new Set();
        var processedPackages = new Set();
        // Start with direct dependencies from the app
        if (appPackageJson.dependencies) {
            try {
                for (var _c = __values(Object.keys(appPackageJson.dependencies)), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var dep = _d.value;
                    if (allPackages.has(dep)) {
                        packagesToCheck.add(dep);
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        // Recursively follow each package's dependencies
        while (packagesToCheck.size > 0) {
            var packageName = packagesToCheck.values().next().value;
            packagesToCheck.delete(packageName);
            if (processedPackages.has(packageName)) {
                continue;
            }
            processedPackages.add(packageName);
            var packageDetails = allPackages.get(packageName);
            if (packageDetails) {
                relevantPackages.set(packageName, packageDetails);
                var pkg = (0, utils_1.getPackageJSON)(packageDetails.path);
                if (pkg === null || pkg === void 0 ? void 0 : pkg.dependencies) {
                    try {
                        for (var _e = (e_4 = void 0, __values(Object.keys(pkg.dependencies))), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var dep = _f.value;
                            if (allPackages.has(dep) && !processedPackages.has(dep)) {
                                packagesToCheck.add(dep);
                            }
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                }
            }
        }
        return relevantPackages;
    };
    LincdServer.prototype.resizeImage = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var width, height, imageFileName, accessURL, url, _a, name_1, ext, newName, newPathname, resizedImageFileName_1, imageExists, resizedPathOnCdn, image, format, err_2, outputOptions, resizedImage, resizedPathOnCdn, _b, trueFileName, extensions, extension, resizedImageFileName, resizedFilePath, originalImagePath, image, err_3;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        width = req.query.w;
                        height = req.query.h;
                        //if not
                        if (!width && !height) {
                            //redirect to the original image
                            res.redirect(req.originalUrl.replace('/resized', '/uploads'));
                            return [2 /*return*/];
                        }
                        imageFileName = req.query.src;
                        accessURL = LinkedFileStorage_1.LinkedFileStorage.accessURL;
                        if (!imageFileName) return [3 /*break*/, 11];
                        url = new URL(imageFileName);
                        _a = path_1.default.parse(url.pathname), name_1 = _a.name, ext = _a.ext;
                        newName = "".concat(name_1).concat(width ? '_w' + width : '').concat(height ? 'h' + height : '');
                        newPathname = path_1.default.join(path_1.default.dirname(url.pathname), 'resized', "".concat(newName).concat(ext));
                        resizedImageFileName_1 = newPathname.startsWith('/')
                            ? newPathname.slice(1)
                            : newPathname;
                        if (this.resizePathsMap.has(resizedImageFileName_1)) {
                            res.redirect(this.resizePathsMap.get(resizedImageFileName_1));
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, LinkedFileStorage_1.LinkedFileStorage.fileExists(resizedImageFileName_1)];
                    case 1:
                        imageExists = _d.sent();
                        if (!imageExists) return [3 /*break*/, 2];
                        resizedPathOnCdn = accessURL + '/' + resizedImageFileName_1;
                        //save to cache
                        this.resizePathsMap.set(resizedImageFileName_1, resizedPathOnCdn);
                        //redirect this request to the resized image
                        res.redirect(resizedPathOnCdn);
                        return [2 /*return*/];
                    case 2:
                        console.log("".concat(process_1.default.pid, " - ").concat(process_1.default.env.PORT, ": Resizing image: ").concat(imageFileName, " to ").concat(width, " x ").concat(height || ''));
                        return [4 /*yield*/, globalThis
                                .fetch(imageFileName)
                                .then(function (res) { return res.arrayBuffer(); })
                                .then(function (arrayBuffer) { return Buffer.from(arrayBuffer); })
                                .catch(function (err) {
                                console.warn('Could not fetch image from URL: ' + err);
                                return null;
                            })];
                    case 3:
                        image = _d.sent();
                        // if image is null, return 404
                        if (!image) {
                            res.status(404).send({ error: 'Could not fetch image from URL' });
                            return [2 /*return*/];
                        }
                        format = void 0;
                        _d.label = 4;
                    case 4:
                        _d.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, (0, sharp_1.default)(image)
                                .metadata()
                                .then(function (meta) { return meta.format; })];
                    case 5:
                        format = _d.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        err_2 = _d.sent();
                        console.warn('Unsupported image format: ' + err_2);
                        res.status(400).send({ error: 'Unsupported image format' });
                        return [2 /*return*/];
                    case 7:
                        outputOptions = void 0;
                        switch (format) {
                            case 'jpeg':
                                outputOptions = { quality: 90 };
                                break;
                            case 'png':
                                outputOptions = { compressionLevel: 9 };
                                break;
                            case 'webp':
                                outputOptions = { quality: 90 };
                                break;
                            // add more formats here
                            default:
                                outputOptions = {};
                        }
                        return [4 /*yield*/, (0, sharp_1.default)(image)
                                .resize(width ? parseInt(width) : null, height ? parseInt(height) : null)
                                .toFormat(format, outputOptions)
                                .toBuffer()
                                .catch(function (err) {
                                console.warn('Could not resize image: ' + err);
                                return null;
                            })];
                    case 8:
                        resizedImage = _d.sent();
                        // if resizedImage is null, return 500
                        if (!resizedImage) {
                            res.status(500).send({ error: 'Could not resize image' });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, LinkedFileStorage_1.LinkedFileStorage.saveFile(newPathname, resizedImage)];
                    case 9:
                        resizedPathOnCdn = _d.sent();
                        //save to cache
                        this.resizePathsMap.set(resizedImageFileName_1, resizedPathOnCdn);
                        //redirect this request to the resized image
                        res.redirect(resizedPathOnCdn);
                        return [2 /*return*/];
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        imageFileName = (_c = req.originalUrl.split('/resized/')[1]) === null || _c === void 0 ? void 0 : _c.split('?')[0];
                        _d.label = 12;
                    case 12:
                        _b = __read(imageFileName.split('.')), trueFileName = _b[0], extensions = _b.slice(1);
                        extension = extensions.join('.');
                        resizedImageFileName = trueFileName +
                            '_' +
                            (width ? 'w' + width : '') +
                            (height ? 'h' + height : '') +
                            '.' +
                            extension;
                        resizedFilePath = path_1.default.join(process_1.default.cwd(), 'data', 'uploads', 'resized', resizedImageFileName);
                        if (!!fsNative.existsSync(resizedFilePath)) return [3 /*break*/, 16];
                        originalImagePath = path_1.default.join(process_1.default.cwd(), 'data', 'uploads', imageFileName);
                        if (!fsNative.existsSync(originalImagePath)) {
                            console.warn('Could not find original image at ' + originalImagePath);
                            return [2 /*return*/, res.status(404).send({ error: 'Could not find original image' })];
                        }
                        _d.label = 13;
                    case 13:
                        _d.trys.push([13, 15, , 16]);
                        image = (0, sharp_1.default)(originalImagePath);
                        image.resize(width ? parseInt(width) : null, height ? parseInt(height) : null);
                        //write image to disk
                        return [4 /*yield*/, image
                                .toFile(resizedFilePath)
                                .then(function () {
                                // console.log('resized image written to disk: ' + resizedFilePath);
                            })
                                .catch(function (err) {
                                console.warn('Could not write resized image to disk at ' +
                                    resizedFilePath +
                                    ': ' +
                                    err);
                            })];
                    case 14:
                        //write image to disk
                        _d.sent();
                        return [3 /*break*/, 16];
                    case 15:
                        err_3 = _d.sent();
                        console.warn(err_3);
                        res.status(500).send({ error: 'Could not resize image' });
                        return [3 /*break*/, 16];
                    case 16:
                        //send the resized image
                        res.sendFile(resizedFilePath);
                        return [2 /*return*/];
                }
            });
        });
    };
    LincdServer.prototype.indexLincdPackage = function (pkg_1) {
        return __awaiter(this, arguments, void 0, function (pkg, warnIfNotFound) {
            var e_5, providerNotFound, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
            if (warnIfNotFound === void 0) { warnIfNotFound = false; }
            return __generator(this, function (_r) {
                switch (_r.label) {
                    case 0:
                        if (pkg === this.package.name) {
                            return [2 /*return*/];
                        }
                        _r.label = 1;
                    case 1:
                        _r.trys.push([1, 3, , 13]);
                        // console.log(`🔍 Loading package: ${pkg}`);
                        // console.log(
                        //   `🔍 Module resolution for ${pkg}:`,
                        //@ts-ignore
                        //   await import.meta.resolve(pkg)
                        // );
                        return [4 /*yield*/, Promise.resolve("".concat(pkg)).then(function (s) { return __importStar(require(s)); })];
                    case 2:
                        // console.log(`🔍 Loading package: ${pkg}`);
                        // console.log(
                        //   `🔍 Module resolution for ${pkg}:`,
                        //@ts-ignore
                        //   await import.meta.resolve(pkg)
                        // );
                        _r.sent();
                        return [3 /*break*/, 13];
                    case 3:
                        e_5 = _r.sent();
                        providerNotFound = e_5.code === 'MODULE_NOT_FOUND' &&
                            e_5.message.indexOf("Cannot find package '".concat(pkg, "'")) !== -1;
                        if (!providerNotFound) return [3 /*break*/, 8];
                        if (!warnIfNotFound) return [3 /*break*/, 7];
                        _b = (_a = console).warn;
                        _d = (_c = chalk_1.default).magenta;
                        _e = ["Could not load package ".concat(pkg)];
                        if (!(typeof module !== 'undefined' && typeof exports !== 'undefined')) return [3 /*break*/, 5];
                        _g = ' at ';
                        return [4 /*yield*/, import.meta.resolve(pkg)];
                    case 4:
                        _f = _g + (_r.sent());
                        return [3 /*break*/, 6];
                    case 5:
                        _f = '';
                        _r.label = 6;
                    case 6:
                        _b.apply(_a, [_d.apply(_c, _e.concat([_f]))]);
                        _r.label = 7;
                    case 7: return [3 /*break*/, 12];
                    case 8:
                        _j = (_h = console).warn;
                        _l = (_k = chalk_1.default).red;
                        _o = (_m = "Error loading '".concat(pkg, "' ")).concat;
                        if (!(typeof module !== 'undefined' && typeof exports !== 'undefined')) return [3 /*break*/, 10];
                        _q = ' at ';
                        return [4 /*yield*/, import.meta.resolve(pkg)];
                    case 9:
                        _p = _q + (_r.sent());
                        return [3 /*break*/, 11];
                    case 10:
                        _p = '';
                        _r.label = 11;
                    case 11:
                        _j.apply(_h, [_l.apply(_k, [_o.apply(_m, [_p, ": "]).concat(e_5.message, "\n")]),
                            e_5.stack]);
                        _r.label = 12;
                    case 12: return [3 /*break*/, 13];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    LincdServer.prototype.indexPackageBackendProviders = function (pkg_1) {
        return __awaiter(this, arguments, void 0, function (pkg, warnIfNotFound, backendIndexFilePath) {
            var backendProviderExports, genericBackendProvider, shapeProviders;
            var _this = this;
            if (warnIfNotFound === void 0) { warnIfNotFound = false; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!backendIndexFilePath) {
                            backendIndexFilePath = "".concat(pkg, "/backend");
                        }
                        shapeProviders = [];
                        return [4 /*yield*/, Promise.resolve("".concat(backendIndexFilePath)).then(function (s) { return __importStar(require(s)); }).then(function (backendProviderExports) {
                                //instantiate the exported provider classes and add them to the right place
                                Object.keys(backendProviderExports).forEach(function (key) {
                                    var providerClass = backendProviderExports[key];
                                    //always send an instance of the express server
                                    //TODO: do not create an instance, just save the class and instantiate it when needed
                                    var provider = new providerClass(_this.server, _this);
                                    if (provider instanceof ShapeProvider_1.ShapeProvider) {
                                        shapeProviders.push(provider);
                                        if (!Object.getOwnPropertyNames(provider).includes('shape')) {
                                            console.warn(chalk_1.default.red("".concat(Object.getPrototypeOf(provider).constructor.name, " in package ").concat(pkg, "\n               is not properly linked to a shape. Use public shape = SomeShape.")));
                                        }
                                    }
                                    else {
                                        if (genericBackendProvider) {
                                            console.warn("Package ".concat(pkg, " exports two generic backend providers. Only one will work"));
                                        }
                                        else {
                                            genericBackendProvider = provider;
                                        }
                                    }
                                });
                            })
                                .catch(function (e) {
                                var match = e.message.match(/module \'([^\']+)'/);
                                //check that the imported /backend path is not found (and only that path, not an import IN that file that is not found, that should still throw an error)
                                var providerNotFound = e.code === 'ERR_MODULE_NOT_FOUND' &&
                                    e.message.indexOf("Cannot find module") !== -1 &&
                                    match &&
                                    match[1] &&
                                    match[1].includes('/backend');
                                if (providerNotFound) {
                                    // console.warn('Error loading ' + providerPath + ': ' + e.stack);
                                    if (warnIfNotFound) {
                                        console.warn(chalk_1.default.magenta("Could not find backend file of package ".concat(pkg, ". \n        Check:\n\n          - Make sure backend.ts exists and is included in tsconfig.json\n\n          - Make sure the package name in src/package.ts matches the package name in package.json")));
                                    }
                                }
                                else {
                                    console.warn(chalk_1.default.red("Could not load backend file of module '".concat(pkg, "' from ").concat(process_1.default.cwd(), ":\n")), e.stack);
                                }
                                genericBackendProvider = null;
                            })];
                    case 1:
                        _a.sent();
                        this.genericProviders.set(pkg, genericBackendProvider);
                        this.shapeProviders.set(pkg, shapeProviders);
                        return [2 /*return*/, { backendProviderExports: backendProviderExports, shapeProviders: shapeProviders }];
                }
            });
        });
    };
    LincdServer.prototype.processBackendMethodCall = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, pkg, method, args;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.noCache(response);
                        return [4 /*yield*/, this.initRequest(request, response)];
                    case 1:
                        _b.sent();
                        _a = request.params, pkg = _a.pkg, method = _a.method;
                        args = JSONParser_1.JSONParser.parseObject(request.body).args;
                        return [2 /*return*/, this.callBackendMethod(pkg, method, args, request, response).then(function (result) {
                                //some methods of backend providers may choose to work with request/response directly and will not return anything
                                //so only if a result is returned
                                if (typeof result !== 'undefined') {
                                    //do we convert it to JSON and send it to the frontend
                                    _this.sendJson(response, result);
                                }
                                else {
                                    //in other cases, we still need to close the request and send an empty response
                                    if (!response.headersSent) {
                                        _this.sendJson(response, null);
                                    }
                                }
                            })];
                }
            });
        });
    };
    LincdServer.prototype.noCache = function (response) {
        response.setHeader('Surrogate-Control', 'no-store');
        response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        response.setHeader('Expires', '0');
    };
    LincdServer.prototype.processAPICall = function (request, response, method) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.noCache(response);
                        return [4 /*yield*/, this.api.process(request, response, method)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // async processQuery(request, response) {
    //
    //   this.api.process(request, response);
    // }
    LincdServer.prototype.processShapeMethodCall = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, pkg, shape, method, _b, shapeURI, instanceNode, args;
            var _this = this;
            var _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        this.noCache(response);
                        // console.log('process shape call');
                        // response.on('finish', function() {
                        //   console.log('shape method call request finish');
                        // });
                        //
                        // response.on('close', function() {
                        //   console.log('close');
                        // });
                        //
                        // response.on('end', function() {
                        //   console.log('end');
                        // });
                        //
                        // response.on('header', function() {
                        //   console.log('header');
                        //   console.log(response.statusCode);
                        // });
                        return [4 /*yield*/, this.initRequest(request, response)];
                    case 1:
                        // console.log('process shape call');
                        // response.on('finish', function() {
                        //   console.log('shape method call request finish');
                        // });
                        //
                        // response.on('close', function() {
                        //   console.log('close');
                        // });
                        //
                        // response.on('end', function() {
                        //   console.log('end');
                        // });
                        //
                        // response.on('header', function() {
                        //   console.log('header');
                        //   console.log(response.statusCode);
                        // });
                        _e.sent();
                        _a = request.params, pkg = _a.pkg, shape = _a.shape, method = _a.method;
                        _b = JSONParser_1.JSONParser.parseObject(request.body), shapeURI = _b.shapeURI, instanceNode = _b.instanceNode, args = _b.args;
                        if (!shapeURI) {
                            if ((_c = request.query) === null || _c === void 0 ? void 0 : _c.shapeURI) {
                                shapeURI = (_d = request.query) === null || _d === void 0 ? void 0 : _d.shapeURI;
                            }
                            else {
                                response.status(500).send({
                                    error: 'Invalid server call request: ' + request.originalUrl,
                                });
                                console.warn(chalk_1.default.red('Invalid server call request: ' + request.originalUrl));
                                return [2 /*return*/];
                            }
                        }
                        return [2 /*return*/, this.callShapeMethod(pkg, method, shapeURI, instanceNode, args, request, response).then(function (result) {
                                //we return json if something was returned or, if nothing was returned, we still close the request if the method has not accessed response itself already to send things over
                                if (typeof result !== 'undefined' || !response.headersSent) {
                                    _this.sendJson(response, result);
                                }
                            })];
                }
            });
        });
    };
    LincdServer.prototype.callShapeMethod = function (pkg, method, shapeURI, instanceNode, args, request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var packageShapeProviders, findProviderForShape, shapeClass, shapeProvider, superShapeClasses, superShapeClasses_1, superShapeClasses_1_1, superShapeClass, superShapeProvider, providerShapeClass, instance, result, e_6, err_4;
            var e_7, _a;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!!this.shapeProviders.has(pkg)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.indexPackageBackendProviders(pkg, true)];
                    case 1:
                        _c.sent();
                        _c.label = 2;
                    case 2:
                        packageShapeProviders = this.shapeProviders.get(pkg);
                        findProviderForShape = function (nodeShapeId) {
                            return packageShapeProviders.find(function (provider) {
                                var _a, _b;
                                //access the static shape (which is a linkedShape() / Shape class)
                                //then access the SHACL NodeShape of that shape class, and its id
                                return (provider instanceof ShapeProvider_1.ShapeProvider &&
                                    ((_b = (_a = provider.shape) === null || _a === void 0 ? void 0 : _a.shape) === null || _b === void 0 ? void 0 : _b.id) === nodeShapeId);
                            });
                        };
                        _c.label = 3;
                    case 3:
                        _c.trys.push([3, 16, , 17]);
                        shapeClass = (0, ShapeClass_1.getShapeClass)(shapeURI);
                        shapeProvider = findProviderForShape(shapeClass.shape.id);
                        if (!shapeProvider) {
                            superShapeClasses = (0, ShapeClass_1.getSuperShapesClasses)(shapeClass);
                            try {
                                for (superShapeClasses_1 = __values(superShapeClasses), superShapeClasses_1_1 = superShapeClasses_1.next(); !superShapeClasses_1_1.done; superShapeClasses_1_1 = superShapeClasses_1.next()) {
                                    superShapeClass = superShapeClasses_1_1.value;
                                    superShapeProvider = findProviderForShape((_b = superShapeClass.shape) === null || _b === void 0 ? void 0 : _b.id);
                                    if (superShapeProvider) {
                                        shapeProvider = superShapeProvider;
                                        break;
                                    }
                                }
                            }
                            catch (e_7_1) { e_7 = { error: e_7_1 }; }
                            finally {
                                try {
                                    if (superShapeClasses_1_1 && !superShapeClasses_1_1.done && (_a = superShapeClasses_1.return)) _a.call(superShapeClasses_1);
                                }
                                finally { if (e_7) throw e_7.error; }
                            }
                        }
                        if (!shapeProvider) return [3 /*break*/, 14];
                        if (!(request && response)) return [3 /*break*/, 5];
                        //give the provider a chance to prepare for this request
                        //wrap the call in a promise and wait for it, because providers MAY return a promise
                        return [4 /*yield*/, Promise.resolve(shapeProvider.initRequest(request, response))];
                    case 4:
                        //give the provider a chance to prepare for this request
                        //wrap the call in a promise and wait for it, because providers MAY return a promise
                        _c.sent();
                        _c.label = 5;
                    case 5:
                        if (!shapeProvider[method]) return [3 /*break*/, 12];
                        if (!shapeProvider.shape) return [3 /*break*/, 10];
                        //instance nodes are not always sent. A shape can also call a shape provider from a static method without a shape instance.
                        if (instanceNode) {
                            providerShapeClass = shapeProvider.shape;
                            instance = new providerShapeClass({
                                id: instanceNode.id,
                            });
                            //always send instanceNode as first argument to static provider methods
                            args.unshift(instance);
                        }
                        _c.label = 6;
                    case 6:
                        _c.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, Promise.resolve(shapeProvider[method].apply(shapeProvider, args))];
                    case 7:
                        result = _c.sent();
                        return [2 /*return*/, result];
                    case 8:
                        e_6 = _c.sent();
                        console.warn("Error whilst calling ".concat(Object.getPrototypeOf(shapeProvider).constructor.name, ".").concat(method, "(): "), e_6);
                        return [3 /*break*/, 9];
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        console.warn("".concat(Object.getPrototypeOf(shapeProvider).constructor.name, " does not define its own 'static shape' property. Please connect the provider to a shape."));
                        _c.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12: return [2 /*return*/, this.sendError(response, 501, "".concat(Object.getPrototypeOf(shapeProvider).constructor.name, " does not have a method called ").concat(method))];
                    case 13: return [3 /*break*/, 15];
                    case 14: return [2 /*return*/, this.sendError(response, 501, "Could not find provider for shape '" + shapeURI + "'")];
                    case 15: return [3 /*break*/, 17];
                    case 16:
                        err_4 = _c.sent();
                        console.warn("Error whilst trying to access provider of ".concat(pkg, ": "), err_4);
                        return [3 /*break*/, 17];
                    case 17: return [2 /*return*/, null];
                }
            });
        });
    };
    LincdServer.prototype.handleErrors = function (fn) {
        return function (req, res, next) {
            return __awaiter(this, void 0, void 0, function () {
                var x_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, fn(req, res)];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2:
                            x_1 = _a.sent();
                            console.log(x_1);
                            next(x_1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
    };
    LincdServer.prototype.handleErrorsJson = function (fn) {
        var _this = this;
        return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fn(req, res)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_5 = _a.sent();
                        this.sendError(res, 500, 'internal server error' + (isDevelopment ? ': ' + (err_5 === null || err_5 === void 0 ? void 0 : err_5.stack) : ''), 'internal server error: ' + (err_5 === null || err_5 === void 0 ? void 0 : err_5.stack));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    };
    LincdServer.prototype.sendError = function (res, statusCode, message, logMessage) {
        if (statusCode === void 0) { statusCode = 500; }
        res === null || res === void 0 ? void 0 : res.status(statusCode);
        if (message) {
            res === null || res === void 0 ? void 0 : res.send({ error: message });
            console.warn(chalk_1.default.red(logMessage || message));
        }
    };
    LincdServer.prototype.render = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var html, didError, App, _a, _b, requestLD, requestObject, stream, timedout, manifest, preloadScripts, preloadStyles, matchedRouteKey, routesModule, ROUTES, matchedRoute, _c, _d, _e, key, route, pathPattern, regex, err_6, timeout;
            var e_8, _f;
            var _g, _h, _j, _k;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        res.socket.on('error', function (error) {
                            console.error('Fatal socket error', error);
                        });
                        //when render() is called, the request is always an 'initial page request', and the server which will return HTML (so this is a SSR request)
                        //in that case we send data back to the frontend in a <script> tag.
                        //We initiate that object here
                        if (req['frontendData'] == null) {
                            req['frontendData'] = {};
                        }
                        //if we are caching this page
                        if (((_g = this.config.server) === null || _g === void 0 ? void 0 : _g.cachePaths) &&
                            this.config.server.cachePaths.includes(req.url)) {
                            //if there is a cach for this path, send it
                            if (this.cachedPaths.has(req.url)) {
                                html = this.cachedPaths.get(req.url);
                                // res.setHeader('Content-Type', 'text/html; charset=utf-8');
                                // res.setHeader('Content-Length', Buffer.byteLength(html, 'utf8').toString());
                                // res.status(200).end(html);
                                res.send(html);
                                return [2 /*return*/];
                            }
                        }
                        didError = false;
                        if (!((_h = this.config.server) === null || _h === void 0 ? void 0 : _h.loadAppComponent)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.config.server.loadAppComponent()];
                    case 1:
                        _a = _l.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = null;
                        _l.label = 3;
                    case 3:
                        App = _a;
                        return [4 /*yield*/, this.initRequest(req, res)];
                    case 4:
                        _l.sent();
                        return [4 /*yield*/, this.getRequestData(req, res)];
                    case 5:
                        _b = _l.sent(), requestLD = _b.requestLD, requestObject = _b.requestObject;
                        timedout = false;
                        manifest = this.latestManifest || this.assets.manifest || {};
                        preloadScripts = [];
                        preloadStyles = [];
                        matchedRouteKey = null;
                        if (!((_j = this.config.server) === null || _j === void 0 ? void 0 : _j.loadRoutes)) return [3 /*break*/, 9];
                        _l.label = 6;
                    case 6:
                        _l.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, this.config.server.loadRoutes()];
                    case 7:
                        routesModule = _l.sent();
                        ROUTES = routesModule.ROUTES ||
                            ((_k = routesModule.default) === null || _k === void 0 ? void 0 : _k.ROUTES) ||
                            routesModule;
                        matchedRoute = null;
                        try {
                            for (_c = __values(Object.entries(ROUTES)), _d = _c.next(); !_d.done; _d = _c.next()) {
                                _e = __read(_d.value, 2), key = _e[0], route = _e[1];
                                if (!(route === null || route === void 0 ? void 0 : route.path))
                                    continue;
                                pathPattern = route.path
                                    .replace(/:\w+\??/g, '([^/]+)')
                                    .replace(/\*/g, '.*');
                                regex = new RegExp('^' + pathPattern + '$');
                                if (regex.test(req.path)) {
                                    matchedRoute = route;
                                    matchedRouteKey = key;
                                    break;
                                }
                            }
                        }
                        catch (e_8_1) { e_8 = { error: e_8_1 }; }
                        finally {
                            try {
                                if (_d && !_d.done && (_f = _c.return)) _f.call(_c);
                            }
                            finally { if (e_8) throw e_8.error; }
                        }
                        // If we found a matching route with preloadChunks, resolve them to URLs (both JS and CSS)
                        if ((matchedRoute === null || matchedRoute === void 0 ? void 0 : matchedRoute.preloadChunks) &&
                            Array.isArray(matchedRoute.preloadChunks)) {
                            preloadScripts = matchedRoute.preloadChunks
                                .map(function (chunkName) {
                                return manifest["".concat(chunkName, ".js")] ||
                                    manifest["".concat(chunkName, ".bundle.js")] ||
                                    manifest["".concat(chunkName, ".mjs")];
                            })
                                .filter(Boolean);
                            // Also collect CSS chunks for the same routes
                            preloadStyles = matchedRoute.preloadChunks
                                .map(function (chunkName) { return manifest["".concat(chunkName, ".css")]; })
                                .filter(Boolean);
                        }
                        return [3 /*break*/, 9];
                    case 8:
                        err_6 = _l.sent();
                        console.warn('Failed to resolve preload chunks:', err_6);
                        return [3 /*break*/, 9];
                    case 9:
                        // Add matched route key to request object for Html component
                        req['matchedRouteKey'] = matchedRouteKey;
                        stream = (0, server_1.renderToPipeableStream)(React.createElement(React.StrictMode, null,
                            React.createElement(server_js_1.StaticRouter, { location: req.url },
                                React.createElement(AppContext_1.AppContextProvider, { assets: this.assets, requestLD: requestLD, requestObject: requestObject, preloadScripts: preloadScripts, preloadStyles: preloadStyles, expressRequest: req, expressResponse: res },
                                    React.createElement(App, null)))), {
                            bootstrapScripts: [
                                this.assets['main.js'], //generated webpack bundle from frontend/src
                            ],
                            onShellReady: function () {
                                var _this = this;
                                var _a;
                                res.statusCode = didError ? 500 : 200;
                                res.setHeader('Content-type', 'text/html');
                                // Create a caching transform stream à la mxstbr.com/thoughts/streaming-ssr
                                if (((_a = this.config.server) === null || _a === void 0 ? void 0 : _a.cachePaths) &&
                                    this.config.server.cachePaths.includes(req.url)) {
                                    var bufferedChunks_1 = [];
                                    var cacheStream = new stream_1.Transform({
                                        transform: function (chunk, _enc, cb) {
                                            bufferedChunks_1.push(chunk); // keep a copy
                                            cb(null, chunk); // forward unchanged
                                        },
                                        flush: function (cb) {
                                            var html = Buffer.concat(bufferedChunks_1).toString('utf8');
                                            _this.cachedPaths.set(req.url, html);
                                            if (_this.config.server.cacheTimeout) {
                                                setTimeout(function () { return _this.cachedPaths.delete(req.url); }, _this.config.server.cacheTimeout);
                                            }
                                            clearTimeout(timeout); // rendering finished → stop timer
                                            cb();
                                        },
                                    });
                                    // Pipe the caching stream into the real response
                                    cacheStream.pipe(res);
                                    // React may **only be piped once**, so pipe it to the cacheStream
                                    stream.pipe(cacheStream);
                                }
                                else {
                                    stream.pipe(res);
                                }
                            }.bind(this),
                            onShellError: function (x) {
                                didError = true;
                                console.error(x);
                            },
                        });
                        timeout = setTimeout(function () {
                            stream.abort('⏱ SSR stream took too long — force abort');
                            if (!res.headersSent) {
                                res.statusCode = 500;
                                res.end('SSR timed out');
                            }
                        }, 10000);
                        res.on('close', function () {
                            clearTimeout(timeout); // if you're using a safety timeout
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    //If we ever need to use multiple webpack entry-points and different bundle names, then uncomment this
    /*getWebpackAssets()
      {
          // const { devMiddleware } = res.locals.webpack;
          // const outputFileSystem = devMiddleware.outputFileSystem;
          // const jsonWebpackStats = devMiddleware.stats.toJson();
          // const { assetsByChunkName, outputPath } = jsonWebpackStats;
          //
          // let normalizedAssets = normalizeAssets(assetsByChunkName.main);
          // let cssAssets = normalizedAssets
          //   .filter((path) => path.endsWith(".css"))
          //   .map((filePath) => outputFileSystem.readFileSync(path.join(outputPath, filePath)))
          //   .join("\n");
          //
          // let jsAssets = normalizeAssets(assetsByChunkName.main)
          //     .filter((path) => path.endsWith(".js"))
          //     .map((path) => `<script src="${path}"></script>`)
          //   .join("\n")}
      }*/
    LincdServer.prototype.sendJson = function (res, obj) {
        var jsonObject = JSONWriter_1.JSONWriter.toJsObject(obj);
        res.json(jsonObject);
    };
    LincdServer.prototype.initRequest = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var p;
            return __generator(this, function (_a) {
                p = Promise.resolve();
                __spreadArray([], __read(this.genericProviders.values()), false).filter(Boolean)
                    .forEach(function (backendProvider) {
                    p = p
                        .then(function () {
                        return backendProvider.initRequest(request, response);
                    })
                        .catch(function (err) {
                        console.warn("Error during initRequest for provider ".concat(Object.getPrototypeOf(backendProvider).constructor.name, ": "), err);
                    });
                });
                return [2 /*return*/, p];
            });
        });
    };
    LincdServer.prototype.getRequestData = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var requestData, requestLD, requestObject;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestData = {};
                        return [4 /*yield*/, Promise.all(__spreadArray([], __read(this.genericProviders.values()), false).map(function (backendProvider) {
                                if (backendProvider) {
                                    return Promise.resolve(backendProvider.supplyDataForRequest(request, response, requestData)).catch(function (err) {
                                        console.warn("Error requesting page-request data from ".concat(Object.getPrototypeOf(backendProvider).constructor.name, ": "), err);
                                    });
                                }
                            }))];
                    case 1:
                        _a.sent();
                        requestLD = '';
                        requestObject = JSONWriter_1.JSONWriter.stringify(request['frontendData']);
                        return [2 /*return*/, { requestLD: requestLD, requestObject: requestObject }];
                }
            });
        });
    };
    LincdServer.prototype.callBackendMethod = function (pkg, method, args, request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var genericBackendProvider, result, e_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.genericProviders.has(pkg)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.indexPackageBackendProviders(pkg, true)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        genericBackendProvider = this.genericProviders.get(pkg);
                        if (!genericBackendProvider) {
                            console.warn("".concat(chalk_1.default.magenta(pkg), " does not have a generic backend provider. If you can edit this package, make sure 'backend.ts' is included in 'tsconfig.json' and that it exports a provider."));
                            return [2 /*return*/, null];
                        }
                        //test if there is a matching method in the backend provider
                        if (!genericBackendProvider[method]) {
                            console.warn("Generic provider '".concat(Object.getPrototypeOf(genericBackendProvider).constructor.name, "' of ").concat(pkg, " does not have a method called ").concat(method));
                            return [2 /*return*/, null];
                        }
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 7, , 8]);
                        if (!(request && response)) return [3 /*break*/, 5];
                        //initialise the request for this specific provider
                        //wrap the call in a promise and wait for it, because providers MAY return a promise
                        return [4 /*yield*/, Promise.resolve(genericBackendProvider.initRequest(request, response))];
                    case 4:
                        //initialise the request for this specific provider
                        //wrap the call in a promise and wait for it, because providers MAY return a promise
                        _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, Promise.resolve(genericBackendProvider[method].apply(genericBackendProvider, args))];
                    case 6:
                        // args.push(request);
                        // args.push(response);
                        //call the method with the given arguments and return the result as json
                        result = _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        e_9 = _a.sent();
                        console.warn("Error whilst calling ".concat(method, "() in provider ").concat(Object.getPrototypeOf(genericBackendProvider).constructor.name, " of package ").concat(pkg, ":\n"), e_9);
                        // error logging
                        LinkedErrorLogging_1.LinkedErrorLogging.log(e_9);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * indicates that instances of this shape need to have this rdf.type
     */
    LincdServer.targetClass = lincd_server_js_1.lincdServer.LincdServer;
    LincdServer = __decorate([
        package_js_1.linkedShape,
        __metadata("design:paramtypes", [Object])
    ], LincdServer);
    return LincdServer;
}(Shape_1.Shape));
exports.LincdServer = LincdServer;
//# sourceMappingURL=LincdServer.js.map