'use strict';
import chalk from 'chalk';
import events from 'events';
import express, { Express as ExpressServer } from 'express';
import fetchCookie from 'fetch-cookie';
import * as fsNative from 'fs';
import * as fs from 'fs/promises';
import { Server as HttpServer } from 'http';
import { getWebpackAppConfig } from '@_linked/cli/config-webpack-app';
import { getLincdPackages } from '@_linked/cli/cli-methods';
import { getPackageJSON } from '@_linked/cli/utils';
import type { LincdConfig } from '@_linked/cli/interfaces';
import { AppContextProvider } from '@_linked/server-utils/components/AppContext';
import { BackendProvider } from '@_linked/server-utils/utils/BackendProvider';
import { JSONParser } from '@_linked/server-utils/utils/JSONParser';
import { JSONWriter } from '@_linked/server-utils/utils/JSONWriter';
import { Server } from '@_linked/server-utils/utils/Server';
import { ShapeProvider } from '@_linked/server-utils/utils/ShapeProvider';
import { CoreMap } from '@_linked/core/collections/CoreMap';
import { Shape } from '@_linked/core/shapes/Shape';
import { LinkedErrorLogging } from '@_linked/core/utils/LinkedErrorLogging';
import { LinkedFileStorage } from '@_linked/core/utils/LinkedFileStorage';
import { LinkedStorage } from '@_linked/core/utils/LinkedStorage';
import { autoLoadOntologyData } from '@_linked/core/utils/Package';
import {
  getShapeClass,
  getSuperShapesClasses,
} from '@_linked/core/utils/ShapeClass';
import path from 'path';
import process from 'process';
import * as React from 'react';
import { renderToPipeableStream, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server.js';
import { rimraf } from 'rimraf';
import sharp from 'sharp';
import { Transform } from 'stream';
import { CookieJar } from 'tough-cookie';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { lincdServer } from '../ontologies/lincd-server.js';
import { linkedShape } from '../package.js';
import { syncShapes } from '../utils/Shapes.js';
import { LincdAPI } from './LincdAPI.js';
import type { RoutesConfig, RouteConfig } from '../types/RouteConfig.js';

//prevent errors in node.js when (s)css files are imported in js
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

declare var globalThis: any;
// Install a global fetch that persists cookies across redirects using a CookieJar.
// This ensures server-side requests behave more like browsers when handling Set-Cookie + redirects.
const __lincdCookieJar = new CookieJar();
// Wrap native fetch with fetch-cookie so it reads/writes cookies in the jar.
const __lincdFetchWithCookies = fetchCookie(fetch, __lincdCookieJar);

// Expose (optionally) for debugging/tests; not required by app logic.
(globalThis as any).__lincdCookieJar = __lincdCookieJar;

// Set the global fetch used throughout the server code path
(globalThis as any).fetch = __lincdFetchWithCookies;

process.on('uncaughtException', (err) => {
  console.warn(chalk.red('Asynchronous error caught.'));
  console.error(err);

  // error logging
  LinkedErrorLogging.log(err);
});
process.on('unhandledRejection', (err) => {
  console.warn(chalk.red('Unhandled rejection caught.'));
  console.error(err);

  // error logging
  LinkedErrorLogging.log(err as Error);
});

process.on('warning', (e) => console.warn(e.stack));

//allow more listeners for when we have many concurrent users
events.EventEmitter.prototype.setMaxListeners(500);

// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// const { document } = (new JSDOM(`...`)).window;
//
// global['document'] = document;
global['reactStaticRenderer'] = renderToStaticMarkup;

autoLoadOntologyData(true);

@linkedShape
export class LincdServer extends Shape {
  /**
   * indicates that instances of this shape need to have this rdf.type
   */
  static targetClass = lincdServer.LincdServer;
  private config: LincdConfig;
  private cachedPaths: Map<string, string> = new Map();
  private assets: { [key: string]: string } & {
    manifest?: Record<string, string>;
  };
  private latestManifest: Record<string, string> | null = null;
  protected server: ExpressServer;
  protected httpServer: HttpServer;
  private package: any;
  private cacheWebpack: boolean;
  private cssMode = 'scss-modules';
  private analyse: boolean = false;
  private shapeProviders: CoreMap<string, ShapeProvider[]> = new CoreMap();
  private genericProviders: CoreMap<string, BackendProvider> = new CoreMap();
  //from resizedFileName to full resized path (CDN or similar)
  private resizePathsMap: Map<string, string> = new Map();
  private api: LincdAPI;

  /**
   * yarn lincd start sends the contents of lincd.config.js as an object to this constructor
   * @param n
   */
  constructor(config?: LincdConfig | string | { id: string }) {
    super(
      typeof config === 'string' || (config && 'id' in config)
        ? config
        : undefined
    );
    if (config && typeof config !== 'string' && !('id' in config)) {
      this.config = config;
    }

    this.api = new LincdAPI({ id: process.env.SITE_ROOT + '/api' });

    //Ensure the Server utility (for Server.call()) directly accesses
    // this server on the backend instead of going through a network call
    Server.setLocalServer(this);
  }

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
  get app() {
    return this.server;
  }

  initPackage() {
    this.package = JSON.parse(
      fsNative.readFileSync(
        path.resolve(process.cwd(), 'package.json'),
        'utf-8'
      )
    );
  }
  async initOnly() {
    await this.initOntologies();
    await this.initStores();

    this.initPackage();

    this.server = express();

    await this.initBackendProviders();

    syncShapes();
    return this;
  }

  // async serveData(req,res) {
  //   let nodeURI = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  //
  //   let store = LinkedStorage.getStores().find(store => {
  //     return nodeURI.includes(store.namedNode.uri)
  //   })
  // }

  async start() {
    this.initPackage();
    // Static assets should come from the static store URL (versioned path),
    // not the upload store URL. storage-config sets STATIC_ACCESS_URL accordingly.
    const staticAccessURL = (
      process.env.STATIC_ACCESS_URL ||
      LinkedFileStorage.accessURL ||
      ''
    ).replace(/\/$/, '');
    const staticAsset = (assetPath: string) =>
      `${staticAccessURL}/public${assetPath}`;
    //for apps with multiple bundles this should be read from the webpack build manifest
    this.assets = {
      'main.js':
        staticAsset('/bundles/main.bundle.js') + '?v=' + this.package.version, //output js bundle from Webpack
      'main.css': staticAsset('/bundles/main.css'), //output css from Webpack
    };
    try {
      const manifestPath = path.resolve(
        process.cwd(),
        'public/bundles/manifest.json'
      );
      if (fsNative.existsSync(manifestPath)) {
        const manifestRaw = fsNative.readFileSync(manifestPath, 'utf-8');
        this.assets.manifest = JSON.parse(manifestRaw);
      }
    } catch (err) {
      console.warn('Could not load bundle manifest:', err);
    }

    const isProduction = process.env.NODE_ENV === 'production';
    if (!isProduction && this.config.cssMode === 'tailwind') {
      this.assets['tailwind-cdn'] = 'https://cdn.tailwindcss.com';
    }

    //for multicore we use PM2, and each instance needs to listen to port 0.
    // whilst the main thread will listen to env.PORT automatically
    // const PORT = this.config.multiCore ? 0 : process.env.PORT || 3000;
    // const publicPort = process.env.PORT || 3000;
    //update: back to original setup. multicore handles itself inside @semantu/multicore
    const PORT = parseInt(process.env.PORT) || 4000;
    this.server = express();

    const dirName = path.resolve(process.cwd(), 'frontend');

    await this.initOntologies();
    //TODO: when we do not keep all data in memory (and thus do not need to rely on in memory data for page requests), we can possibly remove await here, since all stores handle their own initialisation before executing commands
    await this.initStores();

    this.initGarbageCollection();
    // this.app.use((req, res, next) => {
    //   console.log('start request');
    //   next();
    // });
    // before controllers
    await this.initBackendProviders();

    syncShapes();

    //START OF EXPRESS ROUTES AND MIDDLEWARE

    //use cors
    // var corsOptions = {
    //   origin: ['http://localhost:4001', 'https://www.mynd.site'],
    //   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    // };
    // //accept JSON bodies
    // this.server.use(bodyParser.json({limit: '50mb'}));
    this.server.use(express.json({ limit: '50mb' }));

    // this.server.use(cors(corsOptions));
    //
    // //compress server output with gzip,
    //UPDATE ive set level to 2 (low compression fast speed) because responses were taking too long (98% of server time was used by compress)
    // this.server.use(compress({level: 2}));

    await this.callGenericBackendProvidersMethod('setupBeforeControllers');

    // if development, run webpack from the server
    // for production you need to build the bundles before starting the server
    const skipBuild = process.env.NO_WEBPACK === 'true';
    if (isDevelopment && !skipBuild) {
      //three levels up because of lib/esm (2) instead of src (1)
      //@ts-ignore
      // const getWebpackConfig = (await import('../../../site.webpack.config.cjs')).default;
      // let webpackConfig = await getWebpackConfig();
      let webpackConfig = await getWebpackAppConfig();

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
      } else {
        webpackConfig.cache.type = 'filesystem';
      }
      //clean dist/build folder
      await rimraf(webpackConfig.output.path).catch((err) => {
        if (err) {
          console.warn(err);
        }
      });

      const compiler = webpack(webpackConfig as any, (err, stats) => {
        //watch build completed
        if (err) {
          console.error(err);
        }

        // Output stats JSON for analysis
        if (this.analyse) {
          fs.writeFile(
            './data/webpack-stats.json',
            JSON.stringify(stats.toJson({ all: true }), null, 2)
          ).then(() => {
            console.log('Webpack stats written to ./data/webpack-stats.json');
          });
        }
      });

      if (!compiler) {
        //something went wrong with webpack config, error will be logged above
        return;
      }

      compiler.hooks.afterEmit.tap('cleanup-the-require-cache', () => {
        // After webpack rebuild, clear the files from the require cache,
        // so that next server side render wil be in sync
        // console.log(Object.keys(require.cache).filter(k => k.includes(dirName)).join("\n"));
        // if (typeof require !== 'undefined') {
        //   Object.keys(require.cache)
        //     .filter((key) => key.includes(dirName))
        //     .forEach((key) => delete require.cache[key]);
        // }
      });

      //after the first emit (which means bundles are ready and the site is running) also rebuild the index files of the site
      let updatedMetadata = false;
      compiler.hooks.afterEmit.tap('update-metadata', () => {
        if (!updatedMetadata) {
          updatedMetadata = true;
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

      this.server.use(
        webpackDevMiddleware(compiler, {
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
        })
      );
      compiler.hooks.afterEmit.tap('store-manifest', (compilation) => {
        try {
          // Read manifest from the filesystem after webpack writes it
          const manifestPath = path.resolve(
            compilation.options.output.path,
            'manifest.json'
          );
          if (fsNative.existsSync(manifestPath)) {
            const manifestContent = fsNative.readFileSync(
              manifestPath,
              'utf-8'
            );
            this.latestManifest = JSON.parse(manifestContent);
          }
        } catch (err) {
          console.warn('Failed to parse manifest from webpack emit:', err);
        }
      });
      this.server.use(
        webpackHotMiddleware(compiler, {
          log: false,
        })
      );
    }

    // //map URL routes to file paths
    const oneYear = 1000 * 60 * 60 * 24 * 365; // in milliseconds
    const oneMonth = 1000 * 60 * 60 * 24 * 30; // in milliseconds
    this.server.use(
      '/public',
      express.static('./public', {
        maxAge: oneYear, // Tell browser to cache for 1 year
        immutable: true, // Suggest that the content won't change
      })
    );

    this.server.use(
      '/uploads',
      express.static('./data/uploads', {
        maxAge: oneYear, // Tell browser to cache for 1 year
        immutable: true, // Suggest that the content won't change
      })
    );
    this.server.use('/', express.static('./public/root'));
    this.server.use(
      '/favicon.ico',
      express.static('./public/favicon.ico', {
        maxAge: oneMonth, // Tell browser to cache for 1 year
        immutable: true, // Suggest that the content won't change
      })
    );
    this.server.use('/.well-known', express.static('./public/.well-known'));

    // this.server.post('/data',this.handleErrorsJson(async (req,res) => this.serveData(req, res)));
    this.server.get('/resized/*', async (req, res) => {
      this.resizeImage(req, res);
    });

    this.server.post(
      '/call/:pkg/:method',
      this.handleErrorsJson(async (req, res) =>
        this.processBackendMethodCall(req, res)
      )
    );
    this.server.post(
      '/call/:pkg/:shape/:method',
      this.handleErrorsJson(async (req, res) =>
        this.processShapeMethodCall(req, res)
      )
    );
    this.server.post(
      '/api/:method/:action?',
      this.handleErrorsJson(async (req, res) =>
        this.processAPICall(req, res, 'post')
      )
    );
    this.server.get(
      '/api/:method/:action?',
      this.handleErrorsJson(async (req, res) =>
        this.processAPICall(req, res, 'get')
      )
    );
    // this.server.post(
    //   '/api/query/:method',
    //   this.handleErrorsJson(async (req, res) => this.processQuery(req, res)),
    // );

    // now that all the middleware is defined, we initialise the providers, before we define a catch-all route
    // before catch all
    // await this.initBackendProviders();
    await this.callGenericBackendProvidersMethod(
      'setupBeforeCatchAllControllers'
    );

    // HEAD catch-all for maintenance/health check (client fetches SITE_ROOT with method: HEAD)
    this.server.head('__health', (_req, res) => {
      res.sendStatus(200);
    });

    this.server.get(
      '*',
      this.handleErrors(async (req, res) => {
        //make sure the frontend bundle has finished building
        // await this.waitForWebpack();
        this.render(req, res);
      })
    );

    // after controller
    await this.callGenericBackendProvidersMethod('setupAfterControllers');

    //remove http(s):// and remove port :[port]
    const HOST = process.env.SITE_ROOT.replace(/https?:\/\//, '').replace(
      /:\d+$/,
      ''
    );

    //backlog of 1024 means maximum of 1024 connections in the queue (higher than default)
    this.httpServer = this.server.listen({ port: PORT, backlog: 1024 }, () => {
      console.log(`Up and running at http://localhost:${PORT}`);
      // open(`http://localhost:${PORT}`)
    });
    // Ensure all inactive connections are terminated by the ALB, by setting this a few seconds higher than the ALB idle timeout
    this.httpServer.keepAliveTimeout = 60_000;
    // Ensure the headersTimeout is set higher than the keepAliveTimeout due to this nodejs regression bug: https://github.com/nodejs/node/issues/27363
    this.httpServer.headersTimeout = 61_000;

    this.httpServer.on('error', function (error) {
      if (error['syscall'] !== 'listen') {
        throw error;
      }
      const isPipe = (portOrPipe) => Number.isNaN(portOrPipe);
      const bind = isPipe(PORT) ? 'Pipe ' + PORT : 'Port ' + PORT;
      switch (error['code']) {
        case 'EACCES':
          console.error(bind + ' requires elevated privileges');
          process.exit(1);
        case 'EADDRINUSE':
          console.error(bind + ' is already in use');
          process.exit(1);
        default:
          throw error;
      }
    });
    return this;
  }

  async initOntologies() {}

  /**
   *
   * @returns
   * @todo Check if default file store is set, if not, set it
   */
  async initStores() {
    return Promise.all(
      LinkedStorage.getStores().map((store) => {
        return store.init ? store.init() : Promise.resolve();
      })
    );
  }

  // get generic backend providers for handle controller methods
  async callGenericBackendProvidersMethod(method: string, ...args: any[]) {
    for (let genericProvider of this.genericProviders.values()) {
      if (!genericProvider || !genericProvider[method]) {
        continue;
      }
      if (typeof genericProvider[method] == 'function') {
        await Promise.resolve(genericProvider[method](...args));
      }
    }
  }

  /**
   * Removes temporary nodes from memory if they've been seen twice
   * Current interval is once per hour.
   * So after 2 hours temporary nodes are removed.
   */
  initGarbageCollection() {
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
  }
  async initBackendProviders() {
    //get all local workspace lincd packages, then filter to only those
    //in this app's dependency tree. This avoids loading npm-installed
    //legacy packages that may use an old version of the core.
    const allLocalPackages = getLincdPackages();
    const localPackageMap = new Map(
      allLocalPackages.map((pkg) => [pkg.packageName, pkg])
    );
    const relevantPackages = this.filterPackagesByDependencyTree(
      localPackageMap,
      this.package
    );
    for (let [pkgName, pkg] of relevantPackages) {
      await this.indexPackageBackendProviders(pkgName);
      await this.indexLincdPackage(pkgName);
    }

    try {
      await fs
        .readFile(path.join(process.cwd(), 'package.json'), 'utf-8')
        .then(async (contents) => {
          let pkg = JSON.parse(contents);
          await this.indexPackageBackendProviders(
            pkg.name,
            false,
            path.join(process.cwd(), 'src', 'backend.ts')
          );
        });
    } catch (err) {
      console.warn(err);
    }
  }

  /**
   * Filters local workspace packages to only those reachable from the app's
   * dependency tree. Mirrors the logic used by `buildAll` in lincd-cli.
   */
  private filterPackagesByDependencyTree(
    allPackages: Map<string, { packageName: string; path: string }>,
    appPackageJson: any
  ): Map<string, { packageName: string; path: string }> {
    const relevantPackages = new Map<
      string,
      { packageName: string; path: string }
    >();
    const packagesToCheck = new Set<string>();
    const processedPackages = new Set<string>();

    // Start with direct dependencies from the app
    if (appPackageJson.dependencies) {
      for (const dep of Object.keys(appPackageJson.dependencies)) {
        if (allPackages.has(dep)) {
          packagesToCheck.add(dep);
        }
      }
    }

    // Recursively follow each package's dependencies
    while (packagesToCheck.size > 0) {
      const packageName = packagesToCheck.values().next().value;
      packagesToCheck.delete(packageName);
      if (processedPackages.has(packageName)) {
        continue;
      }
      processedPackages.add(packageName);
      const packageDetails = allPackages.get(packageName);
      if (packageDetails) {
        relevantPackages.set(packageName, packageDetails);
        const pkg = getPackageJSON(packageDetails.path);
        if (pkg?.dependencies) {
          for (const dep of Object.keys(pkg.dependencies)) {
            if (allPackages.has(dep) && !processedPackages.has(dep)) {
              packagesToCheck.add(dep);
            }
          }
        }
      }
    }

    return relevantPackages;
  }

  async resizeImage(req, res) {
    //check if the w or h query parameters are set
    let width = req.query.w;
    let height = req.query.h;
    //if not
    if (!width && !height) {
      //redirect to the original image
      res.redirect(req.originalUrl.replace('/resized', '/uploads'));
      return;
    }

    let imageFileName = req.query.src; // example: https://cdnurl.com/uploads/1710814765388-935b511c9_cropped.jpeg
    const accessURL = LinkedFileStorage.accessURL;

    if (imageFileName) {
      // TODO: restrict resizing to images that are stored by LinkedFileStorage.fileExists()
      // if (imageFileName.startsWith(accessURL)) {
      //   const exists = await LinkedFileStorage.fileExists(
      //     imageFileName.replace(`${accessURL}/`, ''),
      //   );

      // extract the base name and extension from the imageFileName
      // example: /uploads/resized/935b511c9_cropped.jpeg
      const url = new URL(imageFileName);
      const { name, ext } = path.parse(url.pathname);

      // append the width and height parameters to the base name
      // example: 935b511c9_cropped_w190.jpeg or 935b511c9_cropped_w190h190.jpeg
      const newName = `${name}${width ? '_w' + width : ''}${
        height ? 'h' + height : ''
      }`;

      // create a new pathname with dimensions
      // example: /uploads/resized/935b511c9_cropped.jpeg -> /uploads/resized/935b511c9_cropped_w190.jpeg
      const newPathname = path.join(
        path.dirname(url.pathname),
        'resized',
        `${newName}${ext}`
      );

      // remove the leading slash from the pathname
      // example: /uploads/resized/935b511c9_cropped_w190.jpeg -> uploads/resized/935b511c9_cropped_w190.jpeg
      const resizedImageFileName = newPathname.startsWith('/')
        ? newPathname.slice(1)
        : newPathname;

      if (this.resizePathsMap.has(resizedImageFileName)) {
        res.redirect(this.resizePathsMap.get(resizedImageFileName));
        return;
      }

      // check if the resized image already exists in the CDN
      const imageExists: boolean = await LinkedFileStorage.fileExists(
        resizedImageFileName
      );

      // if exists, redirect to the resized image
      if (imageExists) {
        const resizedPathOnCdn: string = accessURL + '/' + resizedImageFileName;
        //save to cache
        this.resizePathsMap.set(resizedImageFileName, resizedPathOnCdn);
        //redirect this request to the resized image
        res.redirect(resizedPathOnCdn);
        return;
      } else {
        console.log(
          `${process.pid} - ${
            process.env.PORT
          }: Resizing image: ${imageFileName} to ${width} x ${height || ''}`
        );
        //in multicore development, we need to access the site from 127.0.0.1, and so all requests need to go there
        // // if (process.env.NODE_ENV === 'development' && process.env.NUM_WORKER_PROCESSES) {
        // //   imageFileName = imageFileName.replace('localhost', '127.0.0.1');
        // // }

        // get the image from imageFileName
        const image = await globalThis
          .fetch(imageFileName)
          .then((res) => res.arrayBuffer())
          .then((arrayBuffer) => Buffer.from(arrayBuffer))
          .catch((err) => {
            console.warn('Could not fetch image from URL: ' + err);
            return null;
          });

        // if image is null, return 404
        if (!image) {
          res.status(404).send({ error: 'Could not fetch image from URL' });
          return;
        }

        // get the format of the image
        let format;
        try {
          format = await sharp(image)
            .metadata()
            .then((meta) => meta.format);
        } catch (err) {
          console.warn('Unsupported image format: ' + err);
          res.status(400).send({ error: 'Unsupported image format' });
          return;
        }

        // set the output options based on the format for quality and compression
        let outputOptions;
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

        // resize the image
        const resizedImage: Buffer = await sharp(image)
          .resize(
            width ? parseInt(width) : null,
            height ? parseInt(height) : null
          )
          .toFormat(format, outputOptions)
          .toBuffer()
          .catch((err) => {
            console.warn('Could not resize image: ' + err);
            return null;
          });

        // if resizedImage is null, return 500
        if (!resizedImage) {
          res.status(500).send({ error: 'Could not resize image' });
          return;
        }

        // upload the resized image to the CDN
        const resizedPathOnCdn = await LinkedFileStorage.saveFile(
          newPathname,
          resizedImage
        );

        //save to cache
        this.resizePathsMap.set(resizedImageFileName, resizedPathOnCdn);
        //redirect this request to the resized image
        res.redirect(resizedPathOnCdn);
        return;
      }
    } else {
      imageFileName = req.originalUrl.split('/resized/')[1]?.split('?')[0];
    }

    //if this request has not been made (and stored on the HD) before
    let [trueFileName, ...extensions] = imageFileName.split('.');
    let extension = extensions.join('.');

    let resizedImageFileName =
      trueFileName +
      '_' +
      (width ? 'w' + width : '') +
      (height ? 'h' + height : '') +
      '.' +
      extension;

    let resizedFilePath = path.join(
      process.cwd(),
      'data',
      'uploads',
      'resized',
      resizedImageFileName
    );

    if (!fsNative.existsSync(resizedFilePath)) {
      //ensure the resized folder exists
      // if (!fsNative.existsSync(path.join(process.cwd(), 'data', 'uploads', 'resized'))) {
      //   fsNative.mkdirSync(path.join(process.cwd(), 'data', 'uploads', 'resized'), {recursive: true});
      // }

      //then lets resize and store the image:
      // resize the image with sharp and return it
      let originalImagePath = path.join(
        process.cwd(),
        'data',
        'uploads',
        imageFileName
      );
      if (!fsNative.existsSync(originalImagePath)) {
        console.warn('Could not find original image at ' + originalImagePath);
        return res.status(404).send({ error: 'Could not find original image' });
      }

      try {
        let image = sharp(originalImagePath);
        image.resize(
          width ? parseInt(width) : null,
          height ? parseInt(height) : null
        );

        //write image to disk
        await image
          .toFile(resizedFilePath)
          .then(() => {
            // console.log('resized image written to disk: ' + resizedFilePath);
          })
          .catch((err) => {
            console.warn(
              'Could not write resized image to disk at ' +
                resizedFilePath +
                ': ' +
                err
            );
          });
        //
        // //get content type from the file extension
        // let contentType;
        // let extension = imageFileName.split('.').pop();
        // switch (extension) {
        //   case 'jpg':
        //   case 'jpeg':
        //     contentType = 'image/jpeg';
        //     break;
        //   case 'png':
        //     contentType = 'image/png';
        //     break;
        //   case 'gif':
        //     contentType = 'image/gif';
        //     break;
        //   default:
        //     contentType = 'image/jpeg';
        // }
        // res.setHeader('Content-Type', contentType);
        // image.pipe(res);
      } catch (err) {
        console.warn(err);
        res.status(500).send({ error: 'Could not resize image' });
      }
    }
    //send the resized image
    res.sendFile(resizedFilePath);
  }

  async indexLincdPackage(pkg: string, warnIfNotFound: boolean = false) {
    if (pkg === this.package.name) {
      return;
    }
    try {
      // console.log(`🔍 Loading package: ${pkg}`);
      // console.log(
      //   `🔍 Module resolution for ${pkg}:`,
      //@ts-ignore
      //   await import.meta.resolve(pkg)
      // );
      await import(pkg);
      // console.log(`✅ Successfully loaded: ${pkg}`);
    } catch (e) {
      let providerNotFound =
        e.code === 'MODULE_NOT_FOUND' &&
        e.message.indexOf(`Cannot find package '${pkg}'`) !== -1;
      if (providerNotFound) {
        // console.warn('Error loading ' + providerPath + ': ' + e.stack);
        if (warnIfNotFound) {
          console.warn(
            chalk.magenta(
              `Could not load package ${pkg}`,
              typeof module !== 'undefined' && typeof exports !== 'undefined'
                ? //@ts-ignore
                  ' at ' + (await import.meta.resolve(pkg))
                : ''
            )
          );
        }
      } else {
        console.warn(
          chalk.red(
            `Error loading '${pkg}' ${
              typeof module !== 'undefined' && typeof exports !== 'undefined'
                ? //@ts-ignore
                  ' at ' + (await import.meta.resolve(pkg))
                : ''
            }: ${e.message}\n`
          ),
          e.stack
        );
      }
    }
  }
  async indexPackageBackendProviders(
    pkg: string,
    warnIfNotFound: boolean = false,
    backendIndexFilePath?: string
  ) {
    if (!backendIndexFilePath) {
      backendIndexFilePath = `${pkg}/backend`;
    }
    let backendProviderExports;
    let genericBackendProvider;
    let shapeProviders = [];
    await import(backendIndexFilePath)
      .then((backendProviderExports) => {
        //instantiate the exported provider classes and add them to the right place
        Object.keys(backendProviderExports).forEach((key) => {
          let providerClass = backendProviderExports[key];
          //always send an instance of the express server
          //TODO: do not create an instance, just save the class and instantiate it when needed
          let provider = new providerClass(this.server, this);
          if (provider instanceof ShapeProvider) {
            shapeProviders.push(provider);
            if (!Object.getOwnPropertyNames(provider).includes('shape')) {
              console.warn(
                chalk.red(`${
                  Object.getPrototypeOf(provider).constructor.name
                } in package ${pkg}
               is not properly linked to a shape. Use public shape = SomeShape.`)
              );
            }
          } else {
            if (genericBackendProvider) {
              console.warn(
                `Package ${pkg} exports two generic backend providers. Only one will work`
              );
            } else {
              genericBackendProvider = provider;
            }
          }
        });
      })
      .catch((e) => {
        const match = e.message.match(/module \'([^\']+)'/);
        //check that the imported /backend path is not found (and only that path, not an import IN that file that is not found, that should still throw an error)
        let providerNotFound =
          e.code === 'ERR_MODULE_NOT_FOUND' &&
          e.message.indexOf(`Cannot find module`) !== -1 &&
          match &&
          match[1] &&
          match[1].includes('/backend');
        if (providerNotFound) {
          // console.warn('Error loading ' + providerPath + ': ' + e.stack);
          if (warnIfNotFound) {
            console.warn(
              chalk.magenta(`Could not find backend file of package ${pkg}. 
        Check:\n
          - Make sure backend.ts exists and is included in tsconfig.json\n
          - Make sure the package name in src/package.ts matches the package name in package.json`)
            );
          }
        } else {
          console.warn(
            chalk.red(
              `Could not load backend file of module '${pkg}' from ${process.cwd()}:\n`
            ),
            e.stack
          );
        }
        genericBackendProvider = null;
      });
    this.genericProviders.set(pkg, genericBackendProvider);
    this.shapeProviders.set(pkg, shapeProviders);
    return { backendProviderExports, shapeProviders };
  }

  async processBackendMethodCall(request, response) {
    this.noCache(response);
    await this.initRequest(request, response);
    let { pkg, method } = request.params;
    let { args } = JSONParser.parseObject<{ args }>(request.body);

    return this.callBackendMethod(pkg, method, args, request, response).then(
      (result) => {
        //some methods of backend providers may choose to work with request/response directly and will not return anything
        //so only if a result is returned
        if (typeof result !== 'undefined') {
          //do we convert it to JSON and send it to the frontend
          this.sendJson(response, result);
        } else {
          //in other cases, we still need to close the request and send an empty response
          if (!response.headersSent) {
            this.sendJson(response, null);
          }
        }
      }
    );
  }

  noCache(response) {
    response.setHeader('Surrogate-Control', 'no-store');
    response.setHeader(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate'
    );
    response.setHeader('Expires', '0');
  }
  async processAPICall(
    request,
    response,
    method: 'get' | 'post' | 'put' | 'delete'
  ) {
    this.noCache(response);
    const result = await this.api.process(request, response, method);
  }
  // async processQuery(request, response) {
  //
  //   this.api.process(request, response);
  // }
  async processShapeMethodCall(request, response) {
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

    await this.initRequest(request, response);
    let { pkg, shape, method } = request.params;
    let { shapeURI, instanceNode, args } = JSONParser.parseObject<{
      shapeURI: string;
      instanceNode: { id: string } | null;
      args: any[];
    }>(request.body);

    if (!shapeURI) {
      if (request.query?.shapeURI) {
        shapeURI = request.query?.shapeURI;
      } else {
        response.status(500).send({
          error: 'Invalid server call request: ' + request.originalUrl,
        });
        console.warn(
          chalk.red('Invalid server call request: ' + request.originalUrl)
        );
        return;
      }
    }
    return this.callShapeMethod(
      pkg,
      method,
      shapeURI,
      instanceNode,
      args,
      request,
      response
    ).then((result) => {
      //we return json if something was returned or, if nothing was returned, we still close the request if the method has not accessed response itself already to send things over
      if (typeof result !== 'undefined' || !response.headersSent) {
        this.sendJson(response, result);
      }
    });
  }

  async callShapeMethod(
    pkg: string,
    method: string,
    shapeURI: string,
    instanceNode: { id: string } | null,
    args: any[],
    request,
    response
  ) {
    //- index module providers if not done yet
    if (!this.shapeProviders.has(pkg)) {
      await this.indexPackageBackendProviders(pkg, true);
    }

    let packageShapeProviders = this.shapeProviders.get(pkg);

    let findProviderForShape = (nodeShapeId: string) => {
      return packageShapeProviders.find((provider) => {
        //access the static shape (which is a linkedShape() / Shape class)
        //then access the SHACL NodeShape of that shape class, and its id
        return (
          provider instanceof ShapeProvider &&
          provider.shape?.shape?.id === nodeShapeId
        );
      });
    };

    try {
      //- find matching provider
      let shapeClass = getShapeClass(shapeURI);
      let shapeProvider: ShapeProvider = findProviderForShape(
        shapeClass.shape.id
      );
      if (!shapeProvider) {
        let superShapeClasses = getSuperShapesClasses(
          shapeClass as unknown as typeof Shape
        );
        for (let superShapeClass of superShapeClasses) {
          let superShapeProvider = findProviderForShape(
            superShapeClass.shape?.id
          );
          if (superShapeProvider) {
            shapeProvider = superShapeProvider;
            break;
          }
        }
      }

      if (shapeProvider) {
        //NOTE: if this is a direct call from backend to backend, we won't know the request & response here because those don't get passed to the Server utility
        //if this is an issue, we need to see how we can get those back
        if (request && response) {
          //give the provider a chance to prepare for this request
          //wrap the call in a promise and wait for it, because providers MAY return a promise
          await Promise.resolve(shapeProvider.initRequest(request, response));
        }

        //see if the shapeProvider implements the called method
        if (shapeProvider[method]) {
          //prepare the first argument
          //we want to convert the instance node into an instance of the shape that this shapeProvider provides for
          //let's find the shape class
          if (shapeProvider.shape) {
            //instance nodes are not always sent. A shape can also call a shape provider from a static method without a shape instance.
            if (instanceNode) {
              let providerShapeClass = shapeProvider.shape;
              let instance = new (providerShapeClass as any)({
                id: instanceNode.id,
              });

              //always send instanceNode as first argument to static provider methods
              args.unshift(instance);
            }

            try {
              //call the method with the given arguments
              let result = await Promise.resolve(
                shapeProvider[method].apply(shapeProvider, args)
              );
              return result;
            } catch (e) {
              console.warn(
                `Error whilst calling ${
                  Object.getPrototypeOf(shapeProvider).constructor.name
                }.${method}(): `,
                e
              );
            }
          } else {
            console.warn(
              `${
                Object.getPrototypeOf(shapeProvider).constructor.name
              } does not define its own 'static shape' property. Please connect the provider to a shape.`
            );
          }
        } else {
          return this.sendError(
            response,
            501,
            `${
              Object.getPrototypeOf(shapeProvider).constructor.name
            } does not have a method called ${method}`
          );
        }
      } else {
        return this.sendError(
          response,
          501,
          "Could not find provider for shape '" + shapeURI + "'"
        );
      }
    } catch (err) {
      console.warn(`Error whilst trying to access provider of ${pkg}: `, err);
    }
    return null;
  }

  handleErrors(fn) {
    return async function (req, res, next) {
      try {
        return await fn(req, res);
      } catch (x) {
        console.log(x);
        next(x);
      }
    };
  }

  handleErrorsJson(fn) {
    return async (req, res, next) => {
      try {
        return await fn(req, res);
      } catch (err) {
        this.sendError(
          res,
          500,
          'internal server error' + (isDevelopment ? ': ' + err?.stack : ''),
          'internal server error: ' + err?.stack
        );
      }
    };
  }

  sendError(res, statusCode = 500, message, logMessage?: string) {
    res?.status(statusCode);
    if (message) {
      res?.send({ error: message });
      console.warn(chalk.red(logMessage || message));
    }
  }

  async render(req, res) {
    res.socket.on('error', (error) => {
      console.error('Fatal socket error', error);
    });

    //when render() is called, the request is always an 'initial page request', and the server which will return HTML (so this is a SSR request)
    //in that case we send data back to the frontend in a <script> tag.
    //We initiate that object here
    if (req['frontendData'] == null) {
      req['frontendData'] = {};
    }

    //if we are caching this page
    if (
      this.config.server?.cachePaths &&
      this.config.server.cachePaths.includes(req.url)
    ) {
      //if there is a cach for this path, send it
      if (this.cachedPaths.has(req.url)) {
        // console.log(req.url + ': Returning cached path');
        const html = this.cachedPaths.get(req.url);
        // res.setHeader('Content-Type', 'text/html; charset=utf-8');
        // res.setHeader('Content-Length', Buffer.byteLength(html, 'utf8').toString());
        // res.status(200).end(html);
        res.send(html);
        return;
      }
    }

    let didError = false;

    let App = this.config.server?.loadAppComponent
      ? await this.config.server.loadAppComponent()
      : null;
    await this.initRequest(req, res);
    let { requestLD, requestObject } = await this.getRequestData(req, res);

    //on the backend we need to inform the hook of the request-data value
    //on the frontend it will be read from the HTML
    // setRequestData(requestObject);
    // Abandon and switch to client rendering if enough time passes.
    // Try lowering this to see the client recover.
    // Abandon and switch to client rendering if enough time passes.
    // Try lowering this to see the client recover.
    let stream;
    let timedout = false;
    // const timeout = setTimeout(() => {
    //   stream.abort(`${req.url}: ⏱ SSR stream took too long — force abort`);
    //   if (!res.headersSent) {
    //     res.statusCode = 500;
    //     res.end('SSR timed out');
    //   }
    //   timedout = true;
    // }, 8_000);

    let manifest = this.latestManifest || this.assets.manifest || {};
    let preloadScripts: string[] = [];
    let preloadStyles: string[] = [];
    let matchedRouteKey: string | null = null;

    // Load routes config if available and extract preload chunks for the current route
    if (this.config.server?.loadRoutes) {
      try {
        const routesModule = await this.config.server.loadRoutes();
        const ROUTES: RoutesConfig =
          routesModule.ROUTES ||
          routesModule.default?.ROUTES ||
          (routesModule as RoutesConfig);

        // Match the current request path to a route
        let matchedRoute: RouteConfig | null = null;
        for (const [key, route] of Object.entries(ROUTES)) {
          if (!route?.path) continue;
          const pathPattern = route.path
            .replace(/:\w+\??/g, '([^/]+)')
            .replace(/\*/g, '.*');
          const regex = new RegExp('^' + pathPattern + '$');
          if (regex.test(req.path)) {
            matchedRoute = route;
            matchedRouteKey = key;
            break;
          }
        }

        // If we found a matching route with preloadChunks, resolve them to URLs (both JS and CSS)
        if (
          matchedRoute?.preloadChunks &&
          Array.isArray(matchedRoute.preloadChunks)
        ) {
          preloadScripts = matchedRoute.preloadChunks
            .map(
              (chunkName: string) =>
                manifest[`${chunkName}.js`] ||
                manifest[`${chunkName}.bundle.js`] ||
                manifest[`${chunkName}.mjs`]
            )
            .filter(Boolean);

          // Also collect CSS chunks for the same routes
          preloadStyles = matchedRoute.preloadChunks
            .map((chunkName: string) => manifest[`${chunkName}.css`])
            .filter(Boolean);
        }
      } catch (err) {
        console.warn('Failed to resolve preload chunks:', err);
      }
    }

    // Add matched route key to request object for Html component
    req['matchedRouteKey'] = matchedRouteKey;

    stream = renderToPipeableStream(
      <React.StrictMode>
        <StaticRouter location={req.url}>
          <AppContextProvider
            assets={this.assets}
            requestLD={requestLD}
            requestObject={requestObject}
            preloadScripts={preloadScripts}
            preloadStyles={preloadStyles}
            expressRequest={req}
            expressResponse={res}
          >
            <App />
          </AppContextProvider>
        </StaticRouter>
      </React.StrictMode>,
      {
        bootstrapScripts: [
          this.assets['main.js'], //generated webpack bundle from frontend/src
        ],
        onShellReady: function () {
          res.statusCode = didError ? 500 : 200;
          res.setHeader('Content-type', 'text/html');

          // Create a caching transform stream à la mxstbr.com/thoughts/streaming-ssr
          if (
            this.config.server?.cachePaths &&
            this.config.server.cachePaths.includes(req.url)
          ) {
            const bufferedChunks: Buffer[] = [];

            const cacheStream = new Transform({
              transform(chunk, _enc, cb) {
                bufferedChunks.push(chunk); // keep a copy
                cb(null, chunk); // forward unchanged
              },
              flush: (cb) => {
                const html = Buffer.concat(bufferedChunks).toString('utf8');
                this.cachedPaths.set(req.url, html);
                if (this.config.server.cacheTimeout) {
                  setTimeout(
                    () => this.cachedPaths.delete(req.url),
                    this.config.server.cacheTimeout
                  );
                }
                clearTimeout(timeout); // rendering finished → stop timer
                cb();
              },
            });

            // Pipe the caching stream into the real response
            cacheStream.pipe(res);

            // React may **only be piped once**, so pipe it to the cacheStream
            stream.pipe(cacheStream);
          } else {
            stream.pipe(res);
          }
        }.bind(this),
        onShellError(x) {
          didError = true;
          console.error(x);
        },
      }
    );

    // Abandon and switch to client rendering if enough time passes.
    // Try lowering this to see the client recover.
    const timeout = setTimeout(() => {
      stream.abort('⏱ SSR stream took too long — force abort');
      if (!res.headersSent) {
        res.statusCode = 500;
        res.end('SSR timed out');
      }
    }, 10_000);

    res.on('close', () => {
      clearTimeout(timeout); // if you're using a safety timeout
    });
  }

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

  sendJson(res, obj) {
    let jsonObject = JSONWriter.toJsObject(obj);
    res.json(jsonObject);
  }

  async initRequest(request, response) {
    // initialise the request for all providers, do it synchroniously, one after the other
    let p = Promise.resolve();
    [...this.genericProviders.values()]
      .filter(Boolean)
      .forEach((backendProvider) => {
        p = p
          .then(() => {
            return backendProvider.initRequest(request, response);
          })
          .catch((err) => {
            console.warn(
              `Error during initRequest for provider ${
                Object.getPrototypeOf(backendProvider).constructor.name
              }: `,
              err
            );
          });
      });

    return p;
  }

  async getRequestData(
    request,
    response
  ): Promise<{ requestLD: string; requestObject: string }> {
    // Phase 1: providers return plain JSON data via supplyDataForRequest.
    // requestLD is kept as empty string for now — SSR data seeding will be
    // reworked in Phase 2/3 to inject query results instead of graph data.
    let requestData: Record<string, any> = {};
    await Promise.all(
      [...this.genericProviders.values()].map((backendProvider) => {
        if (backendProvider) {
          return Promise.resolve(
            backendProvider.supplyDataForRequest(request, response, requestData)
          ).catch((err) => {
            console.warn(
              `Error requesting page-request data from ${
                Object.getPrototypeOf(backendProvider).constructor.name
              }: `,
              err
            );
          });
        }
      })
    );

    let requestLD = '';
    let requestObject = JSONWriter.stringify(request['frontendData']);
    return { requestLD, requestObject };
  }

  async callBackendMethod(
    pkg: string,
    method: string,
    args: any[],
    request,
    response
  ) {
    if (!this.genericProviders.has(pkg)) {
      await this.indexPackageBackendProviders(pkg, true);
    }

    //retrieve the indexed provider class and create a new instance for this request
    let genericBackendProvider = this.genericProviders.get(pkg);

    let result;
    if (!genericBackendProvider) {
      console.warn(
        `${chalk.magenta(
          pkg
        )} does not have a generic backend provider. If you can edit this package, make sure 'backend.ts' is included in 'tsconfig.json' and that it exports a provider.`
      );
      return null;
    }
    //test if there is a matching method in the backend provider
    if (!genericBackendProvider[method]) {
      console.warn(
        `Generic provider '${
          Object.getPrototypeOf(genericBackendProvider).constructor.name
        }' of ${pkg} does not have a method called ${method}`
      );
      return null;
    }

    try {
      //TODO: remove init request.
      //TODO: refactor this.request and this.response to a request parameter
      //NOTE: if this is a direct call from backend to backend, we won't know the request & response here because those don't get passed to the Server utility
      //if this is an issue, we need to see how we can get those back
      if (request && response) {
        //initialise the request for this specific provider
        //wrap the call in a promise and wait for it, because providers MAY return a promise
        await Promise.resolve(
          genericBackendProvider.initRequest(request, response)
        );
      }
      // args.push(request);
      // args.push(response);

      //call the method with the given arguments and return the result as json
      result = await Promise.resolve(
        genericBackendProvider[method].apply(genericBackendProvider, args)
      );
    } catch (e) {
      console.warn(
        `Error whilst calling ${method}() in provider ${
          Object.getPrototypeOf(genericBackendProvider).constructor.name
        } of package ${pkg}:\n`,
        e
      );

      // error logging
      LinkedErrorLogging.log(e);
    }
    return result;
  }
}
