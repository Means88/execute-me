export interface ParamDescription {
    name: string;
    type: string;
    description: Nullable<string>;
}
export declare function parseComment(comment: string): {
    params: ParamDescription[];
    version: string;
    description: string;
};
