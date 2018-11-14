#!/usr/bin/env node

const { executeMe } = require('../../lib');

function f(name) {
  /**
   * test function.
   *
   * @version 0.0.1
   * @param {string} foo - foo
   */
  console.log(name);
}

executeMe(f);
