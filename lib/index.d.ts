import { Plugin } from './function/parse';
export { abbr } from './plugins/abbr';
export { comment } from './plugins/comment';
declare type Function = (...args: any[]) => any;
export declare function executeMe(fn: Function, plugins?: Array<Plugin>): any;
export declare function getArguments(fn: Function, plugins: Array<Plugin>): any[];
