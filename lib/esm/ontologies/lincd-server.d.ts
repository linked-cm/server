/**
 * Load the data of this ontology.
 * In @_linked/core, loadData returns the raw JSON import — no JSONLD.parse() needed.
 */
export declare var loadData: () => Promise<any>;
export declare var ns: (term: string) => import("@_linked/core/utils/NodeReference.js").NodeReferenceValue;
export declare var _self: import("@_linked/core/utils/NodeReference.js").NodeReferenceValue;
export declare var LincdServer: import("@_linked/core/utils/NodeReference.js").NodeReferenceValue;
export declare var BackendFileStore: import("@_linked/core/utils/NodeReference.js").NodeReferenceValue;
export declare var NodeFileStore: import("@_linked/core/utils/NodeReference.js").NodeReferenceValue;
export declare var BackendStore: import("@_linked/core/utils/NodeReference.js").NodeReferenceValue;
export declare var BackendAPIStore: import("@_linked/core/utils/NodeReference.js").NodeReferenceValue;
export declare var LincdWebApp: import("@_linked/core/utils/NodeReference.js").NodeReferenceValue;
export declare var ownPackage: import("@_linked/core/utils/NodeReference.js").NodeReferenceValue;
export declare var maintainsPackage: import("@_linked/core/utils/NodeReference.js").NodeReferenceValue;
export declare var N3FileStore: import("@_linked/core/utils/NodeReference.js").NodeReferenceValue;
export declare var LincdAPI: import("@_linked/core/utils/NodeReference.js").NodeReferenceValue;
export declare var hasAPI: import("@_linked/core/utils/NodeReference.js").NodeReferenceValue;
export declare const lincdServer: {
    LincdServer: import("@_linked/core/utils/NodeReference.js").NodeReferenceValue;
    BackendFileStore: import("@_linked/core/utils/NodeReference.js").NodeReferenceValue;
    NodeFileStore: import("@_linked/core/utils/NodeReference.js").NodeReferenceValue;
    BackendStore: import("@_linked/core/utils/NodeReference.js").NodeReferenceValue;
    N3FileStore: import("@_linked/core/utils/NodeReference.js").NodeReferenceValue;
    BackendAPIStore: import("@_linked/core/utils/NodeReference.js").NodeReferenceValue;
    LincdWebApp: import("@_linked/core/utils/NodeReference.js").NodeReferenceValue;
    ownPackage: import("@_linked/core/utils/NodeReference.js").NodeReferenceValue;
    maintainsPackage: import("@_linked/core/utils/NodeReference.js").NodeReferenceValue;
    LincdAPI: import("@_linked/core/utils/NodeReference.js").NodeReferenceValue;
    hasAPI: import("@_linked/core/utils/NodeReference.js").NodeReferenceValue;
};
