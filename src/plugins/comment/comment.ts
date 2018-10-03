import * as doctrine from 'doctrine';
import { Parser } from '../../type';

export interface ParamDescription {
    name: string;
    type: string;
    description: Nullable<string>;
}

export function parseComment(comment: string) {
  const lines = comment.split('\n');
  const ast = doctrine.parse(comment, {
      unwrap: true,
      lineNumbers: true,
  });
  const params: ParamDescription[] = [];
  let version: string = '';

  ast.tags.forEach((tag) => {
    let comment = '';
    if ((<any>tag).lineNumber) {
      comment = lines[(<any>tag).lineNumber];
    }

    if (tag.name && ['param', 'argument', 'arg'].indexOf(tag.title) !== -1) {
      params.push(parseParam(tag, comment));
      return;
    }

    if (tag.title === 'version') {
      version = tag.description || '';
    }
  });

  return {
    params,
    version,
    description: ast.description,
  };
}

function parseParam(tag: doctrine.Tag, comment: string): ParamDescription {
  if (tag.type && tag.type.type !== 'NameExpression') {
    throw new TypeError(`${comment} - type of "${tag.name}" should be one of [${
        Object.keys(Parser).map(s => `"${s}"`).join(', ')
    }].`);
  }

  let type = 'string';
  if (tag.type) {
    type = tag.type.name;
  }
  return {
    type,
    name: tag.name as string,
    description: tag.description,
  };
}
