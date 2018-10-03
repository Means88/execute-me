import { FunctionExpression } from "@babel/types";
import { Command } from "commander";
import { ParamOption, parseFunction, Plugin } from "./function/parse";
import { abbr } from "./plugins/abbr";
import { comment } from "./plugins/comment";
import { isAnyType, isBooleanType, transformers } from "./type";

export { abbr } from "./plugins/abbr";
export { comment } from "./plugins/comment";

type FunctionType = (...args: any[]) => any;

function getOptionName(a: string): string {
  if (a.length === 1) {
    return a.toUpperCase();
  }
  return a;
}

export function executeMe(
  fn: FunctionType,
  plugins: Plugin[] = [abbr, comment]
): any {
  return fn.apply(null, getArguments(fn, plugins));
}

export function getArguments(fn: FunctionType, plugins: Plugin[]): any[] {
  const fnDescription = parseFunction(fn.toString(), plugins);
  const program = new Command();
  if (fnDescription.version) {
    program.version(fnDescription.version);
  }
  program.description(fnDescription.description || "");
  fnDescription.options.forEach(
    ({ shortName, longName, type, name, description, default: d }) => {
      let option = "";
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
      program.option(option, description || "", transformers[type], d);
    }
  );
  program.parse(process.argv);
  const args = fnDescription.options.map(i => program[getOptionName(i.name)]);
  return args;
}
