#!/usr/bin/env node

const { executeMe } = require('../../lib');

function f(args) {
  /**
   * test function.
   */
  console.log(JSON.stringify(arguments[1]));
}

executeMe(f);
