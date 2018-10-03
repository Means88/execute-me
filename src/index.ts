import {
  FunctionExpression,
} from '@babel/types';
import { parseFunction, Plugin } from './function/parse';
import { Command } from 'commander';
import { isBooleanType, Parser, isAnyType } from './type';
import { abbr } from './plugins/abbr';
import { comment } from './plugins/comment';

export { abbr } from './plugins/abbr';
export { comment } from './plugins/comment';

type Function = (...args: any[]) => any;

function getOptionName(a: string): string {
  if (a.length === 1) {
    return a.toUpperCase();
  }
  return a;
}

export function executeMe(
  fn: Function,
  plugins: Array<Plugin> = [abbr, comment],
) {
  return fn.apply(null, getArguments(fn, plugins));
}

export function getArguments(fn: Function, plugins: Array<Plugin>) {
  if (typeof fn !== 'function') {
    throw new TypeError('`fn` should be a function.');
  }
  const fnDescription = parseFunction(fn.toString(), plugins);
  const program = new Command();
  if (fnDescription.version) {
    program.version(fnDescription.version);
  }
  program.description(fnDescription.description || '');
  fnDescription.options.forEach(({ shortName, longName, type, name, description, default: d }) => {
    let option = '';
    if (shortName && longName) {
      option = `-${shortName}, --${longName}`;
    } else if (shortName) {
      option = `-${shortName}`;
    } else if (longName) {
      option = `--${longName}`;
    }
    if (!isBooleanType(type) && !isAnyType(type)) {
      option += ` <${name}>`;
    }
    if (isAnyType(type)) {
      option += ` [${name}]`;
    }
    program.option(option, description || '', Parser[type], d);
  });
  program.parse(process.argv);
  const args = fnDescription.options.map(i => program[getOptionName(i.name)]);
  return args;
}
