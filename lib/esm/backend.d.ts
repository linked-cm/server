import { BackendProvider } from '@_linked/server-utils/utils/BackendProvider';
export * from './shapes/quadstores/BackendAPIStoreProvider.js';
export default class LincdServerBackendProvider extends BackendProvider {
    setupBeforeControllers(): Promise<void>;
    getShapes(): Record<string, import("@_linked/server-utils/types/ShapeDetails.js").ShapeDetails>;
}
