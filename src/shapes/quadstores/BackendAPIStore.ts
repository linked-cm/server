import { lincdServer } from '../../ontologies/lincd-server.js';
import { linkedShape } from '../../package.js';
import { Shape } from '@_linked/core/shapes/Shape';
import { Server } from '@_linked/server-utils/utils/Server';
import type { IDataset } from '@_linked/core/interfaces/IDataset';
import type { SelectQuery } from '@_linked/core/queries/SelectQuery';
import type { AskQuery } from '@_linked/core/queries/AskQuery';
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
    return this.callBackend('selectQuery', query.toJSON());
  }

  askQuery(query: AskQuery): Promise<boolean> {
    return this.callBackend('askQuery', query.toJSON());
  }

  updateQuery(query: UpdateQuery): Promise<UpdateResult> {
    return this.callBackend('updateQuery', query.toJSON());
  }

  createQuery(query: CreateQuery): Promise<CreateResult> {
    return this.callBackend('createQuery', query.toJSON());
  }

  deleteQuery(query: DeleteQuery): Promise<DeleteResponse> {
    return this.callBackend('deleteQuery', query.toJSON());
  }

  /**
   * Every query method returns a value on success (the server sends JSON, `null`
   * at the least). `Server.call` resolves `undefined` when the HTTP call failed
   * (non-2xx status; it only logs a warning), so turn that into a rejection
   * instead of letting a failed query read as an empty result.
   */
  private async callBackend<T>(method: string, json: unknown): Promise<T> {
    const result = await Server.call(this, method, json);
    if (result === undefined) {
      throw new Error(
        `BackendAPIStore.${method} failed: the backend call returned no response`
      );
    }
    return result as T;
  }
}
