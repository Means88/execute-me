const INTEGER_TYPES = ["int", "integer", "Int", "Integer"];

const FLOAT_TYPES = ["float", "Float", "number", "Number"];

const STRING_TYPES = ["str", "string", "String"];

const BOOLAEN_TYPES = ["bool", "boolean", "Boolean"];

const ANY_TYPES = ["any"];

const _transformers: any = {};

function parseBoolean(a: any): boolean {
  return (
    ["false", "null", "undefined", "0"].indexOf(String(a).toLowerCase()) === -1
  );
}

function _parseInt(a: any): number {
  return parseInt(String(a), 10);
}

INTEGER_TYPES.forEach(i => (_transformers[i] = _parseInt));
FLOAT_TYPES.forEach(i => (_transformers[i] = parseFloat));
STRING_TYPES.forEach(i => (_transformers[i] = String));
// BOOLAEN_TYPES.forEach(i => _parser[i] = parseBoolean);
export const transformers = _transformers;

export function isIntegerType(a: string): boolean {
  return INTEGER_TYPES.indexOf(a) !== -1;
}

export function isFloatType(a: string): boolean {
  return FLOAT_TYPES.indexOf(a) !== -1;
}

export function isStringType(a: string): boolean {
  return STRING_TYPES.indexOf(a) !== -1;
}

export function isBooleanType(a: string): boolean {
  return BOOLAEN_TYPES.indexOf(a) !== -1;
}

export function isAnyType(a: string): boolean {
  return ANY_TYPES.indexOf(a) !== -1;
}
