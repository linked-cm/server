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
 * Constructor argument for `new BackendAPIStore(config)`. Per the
 * docs/backlog/016-ejection-export-flow.md spec — a single JSON object
 * passed verbatim from linked.{frontend,backend}.datasets.json's `config`.
 */
export interface BackendAPIStoreConfig {
  /** Stable name; becomes the suffix of the store URI: ${DATA_ROOT}/backend-api-store/<name>. */
  name?: string;
  /** Or pass a fully-qualified URI directly. */
  id?: string;
}

/**
 * Frontend-side store that routes all queries to the backend via Server.call().
 * The backend's BackendAPIStoreProvider handles execution against the actual store.
 */
@linkedShape
export class BackendAPIStore extends Shape implements IDataset {
  static targetClass = lincdServer.BackendAPIStore;

  constructor(config?: BackendAPIStoreConfig | string | { id?: string }) {
    if (!config) {
      super();
      return;
    }
    if (typeof config === 'string') {
      // Legacy string-as-name form. Wrap into config shape.
      super({ id: `${process.env.DATA_ROOT}/backend-api-store/${config}` });
      return;
    }
    if ((config as BackendAPIStoreConfig).id) {
      super({ id: (config as BackendAPIStoreConfig).id! });
      return;
    }
    if ((config as BackendAPIStoreConfig).name) {
      const name = (config as BackendAPIStoreConfig).name!;
      super({ id: `${process.env.DATA_ROOT}/backend-api-store/${name}` });
      return;
    }
    super();
  }

  async init(): Promise<void> {
    // No initialization needed — queries are routed to the backend
  }

  // Queries serialize to DSL-JSON for the wire (core 2.10.0 contract flip): the
  // live (closed) query can't cross Server.call as-is, so we ship `toJSON()` and
  // the BackendAPIStoreProvider rehydrates with `fromJSON()` on the backend.
  selectQuery(query: SelectQuery): Promise<SelectResult> {
    return Server.call(this, 'selectQuery', query.toJSON()) as Promise<SelectResult>;
  }

  updateQuery(query: UpdateQuery): Promise<UpdateResult> {
    return Server.call(this, 'updateQuery', query.toJSON()) as Promise<UpdateResult>;
  }

  createQuery(query: CreateQuery): Promise<CreateResult> {
    return Server.call(this, 'createQuery', query.toJSON()) as Promise<CreateResult>;
  }

  deleteQuery(query: DeleteQuery): Promise<DeleteResponse> {
    return Server.call(this, 'deleteQuery', query.toJSON()) as Promise<DeleteResponse>;
  }
}
