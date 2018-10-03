import { FunctionDescription } from '../../function/parse';
import { FunctionExpression } from '@babel/types';
import { parseComment } from './comment';

export function getComment(ast: FunctionExpression): string {
    if (ast.body.innerComments && ast.body.innerComments[0]) {
      return ast.body.innerComments[0].value;
    }
    if ((<any>ast).comments && (<any>ast).comments.length > 0) {
      return (<any>ast).comments[0].value;
    }
    return '';
}
export function comment(description: FunctionDescription, ast: FunctionExpression): FunctionDescription {
    const comment = getComment(ast);
    const commentDescription = parseComment(comment);
    const options = description.options.slice();
    commentDescription.params.forEach((param, index) => {
      for (let i = 0; i < options.length; i++) {
        if (options[i].name !== param.name) {
          continue;
        }
        options[index] = {
          ...options[index],
          description: param.description,
          type: param.type,
        };
      }
    });
    return {
      ...description,
      options,
      description: commentDescription.description,
      version: commentDescription.version,
    };
}
