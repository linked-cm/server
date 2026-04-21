import { BackendAPIStore } from './BackendAPIStore.js';
import { ShapeProvider } from '@_linked/server-utils/utils/ShapeProvider';
/**
 * Server-side provider that handles BackendAPIStore query requests.
 * Routes queries to LinkedStorage which delegates to the actual backend store (e.g. FusekiStore).
 */
export declare class BackendAPIStoreProvider extends ShapeProvider {
    shape: typeof BackendAPIStore;
    selectQuery(store: BackendAPIStore, query: any): Promise<unknown>;
    updateQuery(store: BackendAPIStore, query: any): Promise<unknown>;
    createQuery(store: BackendAPIStore, query: any): Promise<unknown>;
    deleteQuery(store: BackendAPIStore, query: any): Promise<import("@_linked/core/queries/DeleteQuery.js").DeleteResponse>;
}
