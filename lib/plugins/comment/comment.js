"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var doctrine = __importStar(require("doctrine"));
var type_1 = require("../../type");
function parseComment(blockComment) {
    var lines = blockComment.split("\n");
    var ast = doctrine.parse(blockComment, {
        lineNumbers: true,
        unwrap: true
    });
    var params = [];
    var version = "";
    ast.tags.forEach(function (tag) {
        var comment = "";
        if (tag.lineNumber) {
            comment = lines[tag.lineNumber];
        }
        if (tag.name && ["param", "argument", "arg"].indexOf(tag.title) !== -1) {
            params.push(parseParam(tag, comment));
            return;
        }
        if (tag.title === "version") {
            version = tag.description || "";
        }
    });
    return {
        params: params,
        version: version,
        description: ast.description
    };
}
exports.parseComment = parseComment;
function parseParam(tag, comment) {
    if (tag.type && tag.type.type !== "NameExpression") {
        throw new TypeError(comment + " - type of \"" + tag.name + "\" should be one of [" + Object.keys(type_1.transformers)
            .map(function (s) { return "\"" + s + "\""; })
            .join(", ") + "].");
    }
    var type = "string";
    if (tag.type) {
        type = tag.type.name;
    }
    return {
        type: type,
        description: tag.description,
        name: tag.name
    };
}
