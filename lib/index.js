"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var parse_1 = require("./function/parse");
var abbr_1 = require("./plugins/abbr");
var comment_1 = require("./plugins/comment");
var type_1 = require("./type");
var abbr_2 = require("./plugins/abbr");
exports.abbr = abbr_2.abbr;
var comment_2 = require("./plugins/comment");
exports.comment = comment_2.comment;
function getOptionName(a) {
    if (a.length === 1) {
        return a.toUpperCase();
    }
    return a;
}
function executeMe(fn, plugins) {
    if (plugins === void 0) { plugins = [abbr_1.abbr, comment_1.comment]; }
    return fn.apply(null, getArguments(fn, plugins));
}
exports.executeMe = executeMe;
function getArguments(fn, plugins) {
    var fnDescription = parse_1.parseFunction(fn.toString(), plugins);
    var program = new commander_1.Command();
    if (fnDescription.version) {
        program.version(fnDescription.version);
    }
    program.description(fnDescription.description || "");
    program.usage('[options] <args ...>');
    fnDescription.options.forEach(function (_a) {
        var shortName = _a.shortName, longName = _a.longName, type = _a.type, name = _a.name, description = _a.description, d = _a.default;
        var option = "";
        if (shortName && longName) {
            option = "-" + shortName + ", --" + longName;
        }
        else if (shortName) {
            option = "-" + shortName;
        }
        else if (longName) {
            option = "--" + longName;
        }
        if (!type_1.isBooleanType(type) && !type_1.isAnyType(type)) {
            option += " <" + name + ">";
        }
        if (type_1.isAnyType(type)) {
            option += " [" + name + "]";
        }
        program.option(option, description || "", type_1.transformers[type], d);
    });
    program.parse(process.argv);
    var args = fnDescription.options.map(function (i) { return program[getOptionName(i.name)]; });
    return __spread(args, [program.args]);
}
exports.getArguments = getArguments;
