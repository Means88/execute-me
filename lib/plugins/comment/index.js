"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var comment_1 = require("./comment");
function getComment(ast) {
    if (ast.body.innerComments && ast.body.innerComments[0]) {
        return ast.body.innerComments[0].value;
    }
    if (ast.comments && ast.comments.length > 0) {
        return ast.comments[0].value;
    }
    return "";
}
exports.getComment = getComment;
function comment(description, ast) {
    var descriptionComment = getComment(ast);
    var commentDescription = comment_1.parseComment(descriptionComment);
    var options = description.options.slice();
    commentDescription.params.forEach(function (param, index) {
        for (var i = 0; i < options.length; i++) {
            if (options[i].name !== param.name) {
                continue;
            }
            options[index] = __assign({}, options[index], { description: param.description, type: param.type });
        }
    });
    return __assign({}, description, { options: options, description: commentDescription.description, version: commentDescription.version });
}
exports.comment = comment;
