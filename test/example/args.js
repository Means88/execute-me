#!/usr/bin/env node

const { executeMe } = require('../../lib');

function f(args) {
  /**
   * test function.
   */
  console.log(JSON.stringify(args));
}

executeMe(f);
