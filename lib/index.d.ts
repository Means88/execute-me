import { Plugin } from "./function/parse";
export { abbr } from "./plugins/abbr";
export { comment } from "./plugins/comment";
declare type FunctionType = (...args: any[]) => any;
export declare function executeMe(fn: FunctionType, plugins?: Plugin[]): any;
export declare function getArguments(fn: FunctionType, plugins: Plugin[]): any[];
