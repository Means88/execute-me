import { expect } from "chai";
import { exec } from "child_process";
import path from "path";

describe("index", () => {
  it("should get correct arguments", done => {
    exec(
      `${path.join(
        __dirname,
        "./example/index.js --foo 1.1 -b test --baz 5 --check"
      )}`,
      (error, stdout, stderr) => {
        expect(stdout.trim()).equal(`1.1,test,5,true`);
        done();
      }
    );
  });

  it("should display version", done => {
    exec(
      `${path.join(__dirname, "./example/index.js --version")}`,
      (error, stdout, stderr) => {
        expect(stdout.trim()).equal(`0.0.1`);
        done();
      }
    );
  });

  it("should have string arguments without plugins", done => {
    exec(
      `${path.join(
        __dirname,
        "./example/no-plugin.js --foo 1.1 --bar test --baz 5"
      )}`,
      (error, stdout, stderr) => {
        expect(stdout.trim()).equal(`1.1,test,5,undefined`);
        done();
      }
    );
  });
});
