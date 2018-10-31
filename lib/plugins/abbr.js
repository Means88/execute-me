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
function abbr(description) {
    var usedName = new Set();
    description.options.forEach(function (option) {
        if (option.shortName) {
            usedName.add(option.shortName);
        }
        if (option.longName) {
            usedName.add(option.longName);
        }
    });
    var result = description.options.slice();
    description.options.forEach(function (option, index) {
        if (option.shortName) {
            return;
        }
        if (!option.longName) {
            return;
        }
        if (usedName.has(option.longName[0])) {
            return;
        }
        result[index] = __assign({}, option, { shortName: option.longName[0] });
        usedName.add(option.longName[0]);
    });
    return {
        description: description.description,
        options: result
    };
}
exports.abbr = abbr;
