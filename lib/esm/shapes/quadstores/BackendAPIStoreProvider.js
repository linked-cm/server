import { BackendAPIStore } from './BackendAPIStore.js';
import { ShapeProvider } from '@_linked/server-utils/utils/ShapeProvider';
import { LinkedStorage } from '@_linked/core/utils/LinkedStorage';
/**
 * Server-side provider that handles BackendAPIStore query requests.
 * Routes queries to LinkedStorage which delegates to the actual backend store (e.g. FusekiStore).
 */
export class BackendAPIStoreProvider extends ShapeProvider {
    constructor() {
        super(...arguments);
        this.shape = BackendAPIStore;
    }
    selectQuery(store, query) {
        return LinkedStorage.selectQuery(query);
    }
    updateQuery(store, query) {
        return LinkedStorage.updateQuery(query);
    }
    createQuery(store, query) {
        return LinkedStorage.createQuery(query);
    }
    deleteQuery(store, query) {
        return LinkedStorage.deleteQuery(query);
    }
}
//# sourceMappingURL=BackendAPIStoreProvider.js.map