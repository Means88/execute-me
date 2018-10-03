import { BaseNode, FunctionExpression } from "@babel/types";
export interface ParamOption {
    index: number;
    name: string;
    type: string;
    default: string | boolean | number | void;
    description: Nullable<string>;
    shortName: Nullable<string>;
    longName: Nullable<string>;
}
export interface FunctionDescription {
    version?: string;
    description: Nullable<string>;
    options: ParamOptions;
}
export declare type Plugin = (arg: FunctionDescription, ast: FunctionExpression) => FunctionDescription;
export interface TagNode {
    title: string;
    description: Nullable<string>;
    type: {
        type: string;
        name: string;
    };
    name: string;
}
export interface DocNode {
    description: string;
    tags: TagNode[];
}
export declare type ParamOptions = ParamOption[];
export declare function parseFunction(fn: string, plugins?: Array<Plugin>): FunctionDescription;
export declare function getParamName(paramNode: BaseNode): string;
export declare function getParamOptions(paramNode: BaseNode): ParamOption;
