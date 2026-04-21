import { BackendAPIStore } from './BackendAPIStore.js';
import { ShapeProvider } from '@_linked/server-utils/utils/ShapeProvider';
import { LinkedStorage } from '@_linked/core/utils/LinkedStorage';

/**
 * Server-side provider that handles BackendAPIStore query requests.
 * Routes queries to LinkedStorage which delegates to the actual backend store (e.g. FusekiStore).
 */
export class BackendAPIStoreProvider extends ShapeProvider {
  public shape = BackendAPIStore;

  selectQuery(store: BackendAPIStore, query: any) {
    return LinkedStorage.selectQuery(query);
  }

  updateQuery(store: BackendAPIStore, query: any) {
    return LinkedStorage.updateQuery(query);
  }

  createQuery(store: BackendAPIStore, query: any) {
    return LinkedStorage.createQuery(query);
  }

  deleteQuery(store: BackendAPIStore, query: any) {
    return LinkedStorage.deleteQuery(query);
  }
}
