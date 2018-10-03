import * as doctrine from "doctrine";
import { transformers } from "../../type";

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

export function parseComment(blockComment: string): CommentDescription {
  const lines = blockComment.split("\n");
  const ast = doctrine.parse(blockComment, {
    lineNumbers: true,
    unwrap: true
  });
  const params: ParamDescription[] = [];
  let version: string = "";

  ast.tags.forEach(tag => {
    let comment = "";
    if ((tag as any).lineNumber) {
      comment = lines[(tag as any).lineNumber];
    }

    if (tag.name && ["param", "argument", "arg"].indexOf(tag.title) !== -1) {
      params.push(parseParam(tag, comment));
      return;
    }

    if (tag.title === "version") {
      version = tag.description || "";
    }
  });

  return {
    params,
    version,
    description: ast.description
  };
}

function parseParam(tag: doctrine.Tag, comment: string): ParamDescription {
  if (tag.type && tag.type.type !== "NameExpression") {
    throw new TypeError(
      `${comment} - type of "${tag.name}" should be one of [${Object.keys(
        transformers
      )
        .map(s => `"${s}"`)
        .join(", ")}].`
    );
  }

  let type = "string";
  if (tag.type) {
    type = tag.type.name;
  }
  return {
    type,
    description: tag.description,
    name: tag.name as string
  };
}
