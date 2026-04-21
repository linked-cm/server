import { createNameSpace } from '@_linked/core/utils/NameSpace';
import { linkedOntology } from '../package.js';
import * as _this from './lincd-server.js';

/**
 * Load the data of this ontology.
 * In @_linked/core, loadData returns the raw JSON import — no JSONLD.parse() needed.
 */
export var loadData = async () => {
  //@ts-ignore
  const data = await import('../data/lincd-server.json', {
    with: { type: 'json' },
  });
  return data.default || data;
};

export var ns = createNameSpace('http://lincd.org/ont/lincd-server/');

export var _self = ns('');

export var LincdServer = ns('LincdServer');
export var BackendFileStore = ns('BackendFileStore');
export var NodeFileStore = ns('NodeFileStore');
export var BackendStore = ns('BackendStore');
export var BackendAPIStore = ns('BackendAPIStore');
export var LincdWebApp = ns('LincdWebApp');
export var ownPackage = ns('ownPackage');
export var maintainsPackage = ns('maintainsPackage');
export var N3FileStore = ns('N3FileStore');
export var LincdAPI = ns('LincdAPI');
export var hasAPI = ns('hasAPI');

export const lincdServer = {
  LincdServer,
  BackendFileStore,
  NodeFileStore,
  BackendStore,
  N3FileStore,
  BackendAPIStore,
  LincdWebApp,
  ownPackage,
  maintainsPackage,
  LincdAPI,
  hasAPI,
};

linkedOntology(
  _this,
  ns,
  'lincd-server',
  loadData,
  '../data/lincd-server.json'
);
