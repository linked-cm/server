import { Shape } from '@_linked/core/shapes/Shape';
import type { IQuadStore } from '@_linked/core/interfaces/IQuadStore';
import type { SelectQuery } from '@_linked/core/queries/SelectQuery';
import type { UpdateQuery } from '@_linked/core/queries/UpdateQuery';
import type { CreateQuery } from '@_linked/core/queries/CreateQuery';
import type { DeleteQuery, DeleteResponse } from '@_linked/core/queries/DeleteQuery';
import type { SelectResult, UpdateResult, CreateResult } from '@_linked/core/queries/IntermediateRepresentation';
/**
 * Frontend-side store that routes all queries to the backend via Server.call().
 * The backend's BackendAPIStoreProvider handles execution against the actual store.
 */
export declare class BackendAPIStore extends Shape implements IQuadStore {
    static targetClass: import("@_linked/core/utils/NodeReference.js").NodeReferenceValue;
    constructor(n?: string | {
        id: string;
    });
    init(): Promise<void>;
    selectQuery(query: SelectQuery): Promise<SelectResult>;
    updateQuery(query: UpdateQuery): Promise<UpdateResult>;
    createQuery(query: CreateQuery): Promise<CreateResult>;
    deleteQuery(query: DeleteQuery): Promise<DeleteResponse>;
}
