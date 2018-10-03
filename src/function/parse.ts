import * as parser from "@babel/parser";
import {
  AssignmentPattern,
  BaseNode,
  BooleanLiteral,
  FunctionExpression,
  Identifier,
  NumericLiteral,
  StringLiteral
} from "@babel/types";

type SupportedLiteral = NumericLiteral | StringLiteral | BooleanLiteral;

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

export type Plugin = (
  arg: FunctionDescription,
  ast: FunctionExpression
) => FunctionDescription;

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

class KeyError extends Error {
  public constructor(message: string) {
    super(message);
  }
}

export type ParamOptions = ParamOption[];

export function parseFunction(
  fn: string,
  plugins?: Plugin[]
): FunctionDescription {
  const ast: FunctionExpression = parser.parseExpression(
    fn
  ) as FunctionExpression;
  const paramNodes = ast.params;
  let description: FunctionDescription = {
    description: "",
    options: []
  };
  const usedName = new Set<string>();

  paramNodes.forEach((paramNode, index) => {
    const option = getParamOptions(paramNode);
    option.index = index;
    if (usedName.has(option.name)) {
      throw new KeyError(
        `The option name "${option.name}" has appeared more than once.`
      );
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
    plugins.forEach(plugin => {
      description = plugin(description, ast);
    });
  }

  return description;
}

export function getParamName(paramNode: BaseNode): string {
  if (paramNode.type === "Identifier") {
    return (paramNode as Identifier).name;
  }
  if (paramNode.type === "AssignmentPattern") {
    return getParamName((paramNode as AssignmentPattern).left);
  }
  if (paramNode.type === "ObjectPattern") {
    throw new TypeError("Destructuring assignment is not supported yet.");
  }
  if (paramNode.type === "RestElement") {
    throw new TypeError("Rest params is not supported yet.");
  }
  throw new TypeError(`"${paramNode.type}" is not available to get a name.`);
}

export function getParamOptions(paramNode: BaseNode): ParamOption {
  const name = getParamName(paramNode);
  let defaultValue;

  if (paramNode.type === "AssignmentPattern") {
    const right: BaseNode = (paramNode as AssignmentPattern).right;
    if (
      ["NumericLiteral", "StringLiteral", "BooleanLiteral"].indexOf(
        right.type
      ) !== -1
    ) {
      defaultValue = (right as SupportedLiteral).value;
    }
  }

  return {
    name,
    default: defaultValue,
    description: null,
    index: 0,
    longName: null,
    shortName: null,
    type: "any"
  };
}
