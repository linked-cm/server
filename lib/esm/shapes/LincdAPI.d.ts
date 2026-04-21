import { Shape } from '@_linked/core/shapes/Shape';
import { ShapeDetails } from '../utils/Shapes.js';
export type ShapeSummary = {
    id: string;
    label: string;
    description: string;
    target: {
        id: string;
    };
    extends?: {
        id: string;
    };
    numInstances: number;
};
export declare class LincdAPI extends Shape {
    static targetClass: import("@_linked/core/utils/NodeReference.js").NodeReferenceValue;
    process(request: any, response: any, httpMethod: 'get' | 'post' | 'put' | 'delete'): Promise<void>;
    get_shape_details({ shapes, }: {
        shapes: string[];
    }): Record<string, ShapeDetails>;
    get_all_shapes(): Promise<{
        shapes: Record<string, ShapeDetails>;
        defaultGraph: string;
    }>;
    post_select({ query }: {
        query: any;
    }): Promise<unknown>;
    post_create({ query }: {
        query: any;
    }): Promise<unknown>;
    post_update({ query }: {
        query: any;
    }): Promise<unknown>;
    post_delete({ query }: {
        query: any;
    }): Promise<import("@_linked/core/queries/DeleteQuery.js").DeleteResponse>;
    post_select_raw({ query }: {
        query: any;
    }): Promise<void | import("@_linked/core/sparql/resultMapping.js").SparqlJsonResults>;
    private checkRawQuerySupport;
}
