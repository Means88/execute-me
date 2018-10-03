"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var INTEGER_TYPES = [
    'int',
    'integer',
    'Int',
    'Integer',
];
var FLOAT_TYPES = [
    'float',
    'Float',
    'number',
    'Number',
];
var STRING_TYPES = [
    'str',
    'string',
    'String',
];
var BOOLAEN_TYPES = [
    'bool',
    'boolean',
    'Boolean',
];
var ANY_TYPES = [
    'any',
];
var _parser = {};
function parseBoolean(a) {
    console.log(a);
    return [
        'false',
        'null',
        'undefined',
        '0',
    ].indexOf(String(a).toLowerCase()) === -1;
}
function _parseInt(a) {
    return parseInt(a, 10);
}
INTEGER_TYPES.forEach(function (i) { return _parser[i] = _parseInt; });
FLOAT_TYPES.forEach(function (i) { return _parser[i] = parseFloat; });
STRING_TYPES.forEach(function (i) { return _parser[i] = String; });
// BOOLAEN_TYPES.forEach(i => _parser[i] = parseBoolean);
exports.Parser = _parser;
function isIntegerType(a) {
    return INTEGER_TYPES.indexOf(a) !== -1;
}
exports.isIntegerType = isIntegerType;
function isFloatType(a) {
    return FLOAT_TYPES.indexOf(a) !== -1;
}
exports.isFloatType = isFloatType;
function isStringType(a) {
    return STRING_TYPES.indexOf(a) !== -1;
}
exports.isStringType = isStringType;
function isBooleanType(a) {
    return BOOLAEN_TYPES.indexOf(a) !== -1;
}
exports.isBooleanType = isBooleanType;
function isAnyType(a) {
    return ANY_TYPES.indexOf(a) !== -1;
}
exports.isAnyType = isAnyType;
