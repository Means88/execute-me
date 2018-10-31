import { FunctionExpression } from "@babel/types";
import { FunctionDescription } from "../../function/parse";
export declare function getComment(ast: FunctionExpression): string;
export declare function comment(description: FunctionDescription, ast: FunctionExpression): FunctionDescription;
