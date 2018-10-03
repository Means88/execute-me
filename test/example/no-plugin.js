#!/usr/bin/env node

const { executeMe } = require('../../lib');

function f(foo = 0, bar, baz, check) {
  /**
   * test function.
   *
   * @version 0.0.1
   * @param {number} foo - foo
   * @param {string} bar - bar
   * @param {integer} baz - baz
   * @param {boolean} check - check
   */
  console.log(`${foo},${bar},${baz},${check}`);
}

executeMe(f, []);
