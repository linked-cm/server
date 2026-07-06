import { BackendAPIStore } from './BackendAPIStore.js';
import { ShapeProvider } from '@_linked/server-utils/utils/ShapeProvider';
import { LinkedStorage } from '@_linked/core/utils/LinkedStorage';
import { fromJSON } from '@_linked/core';

/**
 * Server-side provider that handles BackendAPIStore query requests.
 *
 * The client (BackendAPIStore) ships each query as DSL-JSON over Server.call
 * (core 2.10.0 contract flip — the live query can't cross the wire). Here we
 * rehydrate it with `fromJSON()` back into a live (closed) query, then route it
 * through LinkedStorage, which delegates to the actual backend store (e.g.
 * FusekiStore) — the store lowers the live query to IR/SPARQL itself.
 */
export class BackendAPIStoreProvider extends ShapeProvider {
  public shape = BackendAPIStore;

  selectQuery(store: BackendAPIStore, json: any) {
    return LinkedStorage.selectQuery(fromJSON(json) as any);
  }

  updateQuery(store: BackendAPIStore, json: any) {
    return LinkedStorage.updateQuery(fromJSON(json) as any);
  }

  createQuery(store: BackendAPIStore, json: any) {
    return LinkedStorage.createQuery(fromJSON(json) as any);
  }

  deleteQuery(store: BackendAPIStore, json: any) {
    return LinkedStorage.deleteQuery(fromJSON(json) as any);
  }
}
