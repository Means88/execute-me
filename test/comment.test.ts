import { parseExpression } from "@babel/parser";
import { FunctionExpression } from "@babel/types";
import { expect } from "chai";
import { FunctionDescription } from "../src/function/parse";
import { comment, getComment } from "../src/plugins/comment";

describe("comment", () => {
  it("should return empty comment", () => {
    function f() {}
    const ast = parseExpression(f.toString()) as FunctionExpression;
    const c = getComment(ast);
    expect(c).to.equal("");
  });

  it("should find comment in empty function", () => {
    function f(a: any, bob = 0, c: any, check: any) {
      /**
       * A function named f.
       * @param {number} a - The options a.
       * @arg {integer} bob - Bob.
       * @argument {boolean} c - c.
       * @param {string} check - check.
       */
    }
    const ast = parseExpression(f.toString()) as FunctionExpression;
    const com = getComment(ast);
    expect(com).not.to.equal("");
    expect(com.split("\n")).has.length(7);
  });

  it("should find comment in normal function", () => {
    function f(a: any, bob = 0, c: any, check: any) {
      /**
       * A function named f.
       * @param {number} a - The options a.
       * @arg {integer} bob - Bob.
       * @argument {boolean} c - c.
       * @param {string} check - check.
       */
      return 0;
    }
    const ast = parseExpression(f.toString()) as FunctionExpression;
    const com = getComment(ast);
    expect(com).not.to.equal("");
    expect(com.split("\n")).has.length(7);
  });

  it("should get type and description", () => {
    function f(a: any) {
      /**
       * A function named f.
       * @param {number} a - The options a.
       */
    }
    const ast = parseExpression(f.toString()) as FunctionExpression;
    const description: FunctionDescription = {
      description: "",
      options: [
        {
          name: "a",
          type: "string",
          index: 0,
          default: undefined,
          description: "",
          shortName: "a",
          longName: null
        }
      ]
    };
    const result = comment(description, ast);
    expect(String(result.description).trim()).to.equal("A function named f.");
    expect(result.options[0].type).to.equal("number");
    expect(String(result.options[0].description).trim()).to.equal(
      "The options a."
    );
  });

  it("should ignore undefined titles", () => {
    function f(a: any) {
      /**
       * A function named f.
       * @what {number} a - The options a.
       */
    }
    const ast = parseExpression(f.toString()) as FunctionExpression;
    const description: FunctionDescription = {
      description: "",
      options: [
        {
          name: "a",
          type: "string",
          index: 0,
          default: undefined,
          description: "",
          shortName: "a",
          longName: null
        }
      ]
    };
    const result = comment(description, ast);
    expect(String(result.description).trim()).to.equal("A function named f.");
    expect(result.options[0].type).to.equal("string");
    expect(String(result.options[0].description).trim()).not.to.equal(
      "The options a."
    );
  });

  it("should ignore tags without name", () => {
    function f(a: any) {
      /**
       * A function named f.
       * @param {number} - The options a.
       */
    }
    const ast = parseExpression(f.toString()) as FunctionExpression;
    const description: FunctionDescription = {
      description: "",
      options: [
        {
          name: "a",
          type: "string",
          index: 0,
          default: undefined,
          description: "",
          shortName: "a",
          longName: null
        }
      ]
    };
    const result = comment(description, ast);
    expect(String(result.description).trim()).to.equal("A function named f.");
    expect(result.options[0].type).to.equal("string");
    expect(String(result.options[0].description).trim()).not.to.equal(
      "The options a."
    );
  });

  it("should assert param type", () => {
    function f(a: any) {
      /**
       * A function named f.
       * @param {number|string} a - The options a.
       */
    }
    const ast = parseExpression(f.toString()) as FunctionExpression;
    const description: FunctionDescription = {
      description: "",
      options: [
        {
          name: "a",
          type: "string",
          index: 0,
          default: undefined,
          description: "",
          shortName: "a",
          longName: null
        }
      ]
    };
    expect(() => comment(description, ast)).to.throw(TypeError);
  });
});
