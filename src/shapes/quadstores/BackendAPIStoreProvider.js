"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackendAPIStoreProvider = void 0;
var BackendAPIStore_js_1 = require("./BackendAPIStore.js");
var ShapeProvider_1 = require("@_linked/server-utils/utils/ShapeProvider");
var LinkedStorage_1 = require("@_linked/core/utils/LinkedStorage");
/**
 * Server-side provider that handles BackendAPIStore query requests.
 * Routes queries to LinkedStorage which delegates to the actual backend store (e.g. FusekiStore).
 */
var BackendAPIStoreProvider = /** @class */ (function (_super) {
    __extends(BackendAPIStoreProvider, _super);
    function BackendAPIStoreProvider() {
        var _this = _super.apply(this, __spreadArray([], __read(arguments), false)) || this;
        _this.shape = BackendAPIStore_js_1.BackendAPIStore;
        return _this;
    }
    BackendAPIStoreProvider.prototype.selectQuery = function (store, query) {
        return LinkedStorage_1.LinkedStorage.selectQuery(query);
    };
    BackendAPIStoreProvider.prototype.updateQuery = function (store, query) {
        return LinkedStorage_1.LinkedStorage.updateQuery(query);
    };
    BackendAPIStoreProvider.prototype.createQuery = function (store, query) {
        return LinkedStorage_1.LinkedStorage.createQuery(query);
    };
    BackendAPIStoreProvider.prototype.deleteQuery = function (store, query) {
        return LinkedStorage_1.LinkedStorage.deleteQuery(query);
    };
    return BackendAPIStoreProvider;
}(ShapeProvider_1.ShapeProvider));
exports.BackendAPIStoreProvider = BackendAPIStoreProvider;
//# sourceMappingURL=BackendAPIStoreProvider.js.map