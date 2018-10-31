export interface ParamDescription {
    name: string;
    type: string;
    description: Nullable<string>;
}
export interface CommentDescription {
    params: ParamDescription[];
    version: string;
    description: string;
}
export declare function parseComment(blockComment: string): CommentDescription;
