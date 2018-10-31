"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var INTEGER_TYPES = ["int", "integer", "Int", "Integer"];
var FLOAT_TYPES = ["float", "Float", "number", "Number"];
var STRING_TYPES = ["str", "string", "String"];
var BOOLAEN_TYPES = ["bool", "boolean", "Boolean"];
var ANY_TYPES = ["any"];
var _transformers = {};
function parseBoolean(a) {
    return (["false", "null", "undefined", "0"].indexOf(String(a).toLowerCase()) === -1);
}
function _parseInt(a) {
    return parseInt(String(a), 10);
}
INTEGER_TYPES.forEach(function (i) { return (_transformers[i] = _parseInt); });
FLOAT_TYPES.forEach(function (i) { return (_transformers[i] = parseFloat); });
STRING_TYPES.forEach(function (i) { return (_transformers[i] = String); });
// BOOLAEN_TYPES.forEach(i => _parser[i] = parseBoolean);
exports.transformers = _transformers;
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
