"use strict";
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
        result[index] = Object.assign({}, option, {
            shortName: option.longName[0],
        });
        usedName.add(option.longName[0]);
    });
    return {
        description: description.description,
        options: result,
    };
}
exports.abbr = abbr;
