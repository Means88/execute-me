"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var parser = __importStar(require("@babel/parser"));
var KeyError = /** @class */ (function (_super) {
    __extends(KeyError, _super);
    function KeyError(message) {
        return _super.call(this, message) || this;
    }
    return KeyError;
}(Error));
function parseFunction(fn, plugins) {
    var ast = parser.parseExpression(fn);
    var paramNodes = ast.params;
    var description = {
        description: '',
        options: [],
    };
    var usedName = new Set();
    paramNodes.forEach(function (paramNode, index) {
        var option = getParamOptions(paramNode);
        option.index = index;
        if (usedName.has(option.name)) {
            throw new KeyError("The option name \"" + option.name + "\" has appeared more than once.");
        }
        usedName.add(option.name);
        if (option.name.length === 1) {
            option.shortName = option.name;
        }
        else {
            option.longName = option.name;
        }
        description.options[index] = option;
    });
    if (plugins) {
        plugins.forEach(function (plugin) {
            description = plugin(description, ast);
        });
    }
    return description;
}
exports.parseFunction = parseFunction;
function getParamName(paramNode) {
    if (paramNode.type === 'Identifier') {
        return paramNode.name;
    }
    if (paramNode.type === 'AssignmentPattern') {
        return getParamName(paramNode.left);
    }
    if (paramNode.type === 'ObjectPattern') {
        throw new TypeError('Destructuring assignment is not supported yet.');
    }
    if (paramNode.type === 'RestElement') {
        throw new TypeError('Rest params is not supported yet.');
    }
    throw new TypeError("\"" + paramNode.type + "\" is not available to get a name.");
}
exports.getParamName = getParamName;
function getParamOptions(paramNode) {
    var name = getParamName(paramNode);
    var defaultValue = undefined;
    if (paramNode.type === 'AssignmentPattern') {
        var right = paramNode.right;
        if (['NumericLiteral', 'StringLiteral', 'BooleanLiteral'].indexOf(right.type) !== -1) {
            defaultValue = right.value;
        }
    }
    return {
        name: name,
        index: 0,
        default: defaultValue,
        description: null,
        shortName: null,
        longName: null,
        type: 'any',
    };
}
exports.getParamOptions = getParamOptions;
