import { BackendAPIStore } from './BackendAPIStore.js';
import { ShapeProvider } from '@_linked/server-utils/utils/ShapeProvider';
import { LinkedStorage } from '@_linked/core/utils/LinkedStorage';

/**
 * Server-side provider that handles BackendAPIStore query requests.
 * Routes queries to LinkedStorage which delegates to the actual backend store (e.g. FusekiStore).
 */
export class BackendAPIStoreProvider extends ShapeProvider {
  public shape = BackendAPIStore;

  selectQuery(query: any) {
    return LinkedStorage.selectQuery(query);
  }

  updateQuery(query: any) {
    return LinkedStorage.updateQuery(query);
  }

  createQuery(query: any) {
    return LinkedStorage.createQuery(query);
  }

  deleteQuery(query: any) {
    return LinkedStorage.deleteQuery(query);
  }
}
