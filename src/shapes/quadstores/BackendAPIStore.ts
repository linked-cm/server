import { lincdServer } from '../../ontologies/lincd-server.js';
import { linkedShape } from '../../package.js';
import { Shape } from '@_linked/core/shapes/Shape';
import { Server } from '@_linked/server-utils/utils/Server';
import type { IDataset } from '@_linked/core/interfaces/IDataset';
import type { SelectQuery } from '@_linked/core/queries/SelectQuery';
import type { UpdateQuery } from '@_linked/core/queries/UpdateQuery';
import type { CreateQuery } from '@_linked/core/queries/CreateQuery';
import type {
  DeleteQuery,
  DeleteResponse,
} from '@_linked/core/queries/DeleteQuery';
import type {
  SelectResult,
  UpdateResult,
  CreateResult,
} from '@_linked/core/queries/IntermediateRepresentation';

/**
 * Frontend-side store that routes all queries to the backend via Server.call().
 * The backend's BackendAPIStoreProvider handles execution against the actual store.
 */
@linkedShape
export class BackendAPIStore extends Shape implements IDataset {
  static targetClass = lincdServer.BackendAPIStore;

  constructor(n?: string | { id: string }) {
    if (typeof n === 'string') {
      const uri = `${process.env.DATA_ROOT}/backend-api-store/${n}`;
      super({ id: uri });
    } else if (n) {
      super(n);
    } else {
      super();
    }
  }

  async init(): Promise<void> {
    // No initialization needed — queries are routed to the backend
  }

  selectQuery(query: SelectQuery): Promise<SelectResult> {
    const queryObj =
      typeof (query as any).getQueryObject === 'function'
        ? (query as any).getQueryObject()
        : query;
    if (!(queryObj as any)?.root) {
      return Promise.reject(
        new Error(
          `BackendAPIStore.selectQuery() received an invalid query payload. Expected a built select query with a root shape scan, got: ${
            queryObj ? JSON.stringify(queryObj) : 'undefined'
          }`,
        ),
      );
    }
    return Server.call(this, 'selectQuery', queryObj) as Promise<SelectResult>;
  }

  updateQuery(query: UpdateQuery): Promise<UpdateResult> {
    return Server.call(this, 'updateQuery', query) as Promise<UpdateResult>;
  }

  createQuery(query: CreateQuery): Promise<CreateResult> {
    return Server.call(this, 'createQuery', query) as Promise<CreateResult>;
  }

  deleteQuery(query: DeleteQuery): Promise<DeleteResponse> {
    return Server.call(this, 'deleteQuery', query) as Promise<DeleteResponse>;
  }
}
