"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackendAPIStoreProvider = void 0;
const BackendAPIStore_js_1 = require("./BackendAPIStore.js");
const ShapeProvider_1 = require("@_linked/server-utils/utils/ShapeProvider");
const LinkedStorage_1 = require("@_linked/core/utils/LinkedStorage");
/**
 * Server-side provider that handles BackendAPIStore query requests.
 * Routes queries to LinkedStorage which delegates to the actual backend store (e.g. FusekiStore).
 */
class BackendAPIStoreProvider extends ShapeProvider_1.ShapeProvider {
    constructor() {
        super(...arguments);
        this.shape = BackendAPIStore_js_1.BackendAPIStore;
    }
    selectQuery(store, query) {
        return LinkedStorage_1.LinkedStorage.selectQuery(query);
    }
    updateQuery(store, query) {
        return LinkedStorage_1.LinkedStorage.updateQuery(query);
    }
    createQuery(store, query) {
        return LinkedStorage_1.LinkedStorage.createQuery(query);
    }
    deleteQuery(store, query) {
        return LinkedStorage_1.LinkedStorage.deleteQuery(query);
    }
}
exports.BackendAPIStoreProvider = BackendAPIStoreProvider;
//# sourceMappingURL=BackendAPIStoreProvider.js.map