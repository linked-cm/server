/// <reference types="node" />
import { Express as ExpressServer } from 'express';
import { Server as HttpServer } from 'http';
import type { LincdConfig } from 'lincd-cli/interfaces';
import { Shape } from '@_linked/core/shapes/Shape';
export declare class LincdServer extends Shape {
    /**
     * indicates that instances of this shape need to have this rdf.type
     */
    static targetClass: import("@_linked/core/utils/NodeReference.js").NodeReferenceValue;
    private config;
    private cachedPaths;
    private assets;
    private latestManifest;
    protected server: ExpressServer;
    protected httpServer: HttpServer;
    private package;
    private cacheWebpack;
    private cssMode;
    private analyse;
    private shapeProviders;
    private genericProviders;
    private resizePathsMap;
    private api;
    /**
     * yarn lincd start sends the contents of lincd.config.js as an object to this constructor
     * @param n
     */
    constructor(config?: LincdConfig | string | {
        id: string;
    });
    get app(): ExpressServer;
    initPackage(): void;
    initOnly(): Promise<this>;
    start(): Promise<this>;
    initOntologies(): Promise<void>;
    /**
     *
     * @returns
     * @todo Check if default file store is set, if not, set it
     */
    initStores(): Promise<any[]>;
    callGenericBackendProvidersMethod(method: string, ...args: any[]): Promise<void>;
    /**
     * Removes temporary nodes from memory if they've been seen twice
     * Current interval is once per hour.
     * So after 2 hours temporary nodes are removed.
     */
    initGarbageCollection(): void;
    initBackendProviders(): Promise<void>;
    /**
     * Filters local workspace packages to only those reachable from the app's
     * dependency tree. Mirrors the logic used by `buildAll` in lincd-cli.
     */
    private filterPackagesByDependencyTree;
    resizeImage(req: any, res: any): Promise<any>;
    indexLincdPackage(pkg: string, warnIfNotFound?: boolean): Promise<void>;
    indexPackageBackendProviders(pkg: string, warnIfNotFound?: boolean, backendIndexFilePath?: string): Promise<{
        backendProviderExports: any;
        shapeProviders: any[];
    }>;
    processBackendMethodCall(request: any, response: any): Promise<void>;
    noCache(response: any): void;
    processAPICall(request: any, response: any, method: 'get' | 'post' | 'put' | 'delete'): Promise<void>;
    processShapeMethodCall(request: any, response: any): Promise<void>;
    callShapeMethod(pkg: string, method: string, shapeURI: string, instanceNode: {
        id: string;
    } | null, args: any[], request: any, response: any): Promise<any>;
    handleErrors(fn: any): (req: any, res: any, next: any) => Promise<any>;
    handleErrorsJson(fn: any): (req: any, res: any, next: any) => Promise<any>;
    sendError(res: any, statusCode: number, message: any, logMessage?: string): void;
    render(req: any, res: any): Promise<void>;
    sendJson(res: any, obj: any): void;
    initRequest(request: any, response: any): Promise<void>;
    getRequestData(request: any, response: any): Promise<{
        requestLD: string;
        requestObject: string;
    }>;
    callBackendMethod(pkg: string, method: string, args: any[], request: any, response: any): Promise<any>;
}
