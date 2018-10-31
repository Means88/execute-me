import { FunctionExpression } from "@babel/types";
import { FunctionDescription } from "../../function/parse";
import { parseComment } from "./comment";

export function getComment(ast: FunctionExpression): string {
  if (ast.body.innerComments && ast.body.innerComments[0]) {
    return ast.body.innerComments[0].value;
  }
  if ((ast as any).comments && (ast as any).comments.length > 0) {
    return (ast as any).comments[0].value;
  }
  return "";
}

export function comment(
  description: FunctionDescription,
  ast: FunctionExpression
): FunctionDescription {
  const descriptionComment = getComment(ast);
  const commentDescription = parseComment(descriptionComment);
  const options = description.options.slice();
  commentDescription.params.forEach((param, index) => {
    for (let i = 0; i < options.length; i++) {
      if (options[i].name !== param.name) {
        continue;
      }
      options[index] = {
        ...options[index],
        description: param.description,
        type: param.type
      };
    }
  });
  return {
    ...description,
    options,
    description: commentDescription.description,
    version: commentDescription.version
  };
}
