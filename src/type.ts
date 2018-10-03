const INTEGER_TYPES = [
  'int',
  'integer',
  'Int',
  'Integer',
];

const FLOAT_TYPES = [
  'float',
  'Float',
  'number',
  'Number',
];

const STRING_TYPES = [
  'str',
  'string',
  'String',
];

const BOOLAEN_TYPES = [
  'bool',
  'boolean',
  'Boolean',
];

const ANY_TYPES = [
  'any',
];

const _parser: any = {};

function parseBoolean(a: any): Boolean {
  console.log(a);
  return [
    'false',
    'null',
    'undefined',
    '0',
  ].indexOf(String(a).toLowerCase()) === -1;
}

function _parseInt(a: any) {
  return parseInt(a, 10);
}

INTEGER_TYPES.forEach(i => _parser[i] = _parseInt);
FLOAT_TYPES.forEach(i => _parser[i] = parseFloat);
STRING_TYPES.forEach(i => _parser[i] = String);
// BOOLAEN_TYPES.forEach(i => _parser[i] = parseBoolean);
export const Parser = _parser;

export function isIntegerType(a: string) {
  return INTEGER_TYPES.indexOf(a) !== -1;
}

export function isFloatType(a: string) {
  return FLOAT_TYPES.indexOf(a) !== -1;
}

export function isStringType(a: string) {
  return STRING_TYPES.indexOf(a) !== -1;
}

export function isBooleanType(a: string) {
  return BOOLAEN_TYPES.indexOf(a) !== -1;
}

export function isAnyType(a: string) {
  return ANY_TYPES.indexOf(a) !== -1;
}
