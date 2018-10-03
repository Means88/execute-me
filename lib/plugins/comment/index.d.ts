import { FunctionDescription } from '../../function/parse';
import { FunctionExpression } from '@babel/types';
export declare function getComment(ast: FunctionExpression): string;
export declare function comment(description: FunctionDescription, ast: FunctionExpression): FunctionDescription;
