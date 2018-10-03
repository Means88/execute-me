import { AssignmentPattern, BaseNode, FunctionExpression, Identifier, NumberLiteral, StringLiteral, BooleanLiteral } from "@babel/types";
import * as parser from "@babel/parser";

type SupportedLiteral = NumberLiteral | StringLiteral | BooleanLiteral;

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

export type Plugin = (arg: FunctionDescription, ast: FunctionExpression) => FunctionDescription;

export interface TagNode {
  title: string;
  description: Nullable<string>;
  type: {
    type: string;
    name: string;
  }
  name: string;
}

export interface DocNode {
  description: string;
  tags: TagNode[];
}

class KeyError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export type ParamOptions = ParamOption[];

export function parseFunction(
  fn: string,
  plugins?: Array<Plugin>,
): FunctionDescription {
  const ast: FunctionExpression = parser.parseExpression(fn) as FunctionExpression;
  const paramNodes = ast.params;
  let description: FunctionDescription = {
    description: '',
    options: [],
  };
  const usedName = new Set<string>();

  paramNodes.forEach((paramNode, index) => {
    const option = getParamOptions(paramNode);
    option.index = index;
    if (usedName.has(option.name)) {
      throw new KeyError(`The option name "${option.name}" has appeared more than once.`);
    }
    usedName.add(option.name);
    if (option.name.length === 1) {
      option.shortName = option.name;
    } else {
      option.longName = option.name;
    }
    description.options[index] = option;
  });

  if (plugins) {
    plugins.forEach((plugin) => {
      description = plugin(description, ast);
    });
  }

  return description;
}

export function getParamName(paramNode: BaseNode): string {
  if (paramNode.type === 'Identifier') {
    return (<Identifier>paramNode).name;
  }
  if (paramNode.type === 'AssignmentPattern') {
    return getParamName((<AssignmentPattern>paramNode).left);
  }
  if (paramNode.type === 'ObjectPattern') {
    throw new TypeError('Destructuring assignment is not supported yet.')
  }
  if (paramNode.type === 'RestElement') {
    throw new TypeError('Rest params is not supported yet.');
  }
  throw new TypeError(`"${paramNode.type}" is not available to get a name.`);
}

export function getParamOptions(paramNode: BaseNode): ParamOption {
  const name = getParamName(paramNode);
  let defaultValue = undefined;

  if (paramNode.type === 'AssignmentPattern') {
    const right: BaseNode = (<AssignmentPattern>paramNode).right;
    if (['NumericLiteral', 'StringLiteral', 'BooleanLiteral'].indexOf(right.type) !== -1) {
      defaultValue = (<SupportedLiteral>right).value;
    }
  }

  return {
    name,
    index: 0,
    default: defaultValue,
    description: null,
    shortName: null,
    longName: null,
    type: 'any',
  }
}
