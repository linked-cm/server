import { Shape } from '@_linked/core/shapes/Shape';
import { Lincd_API_Client } from '@_linked/server-utils/shapes/Lincd_API_Client';
export declare class LincdWebApp extends Shape {
    static targetClass: import("@_linked/core/utils/NodeReference.js").NodeReferenceValue;
    static get localApp(): LincdWebApp;
    get api(): Lincd_API_Client;
}
