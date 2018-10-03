#!/usr/bin/env node

const { executeMe } = require('../lib');

function eatFood(count=5, food, weight, check) {
  /**
   * A function named eatFood.
   *
   * @version 0.1.0-beta3
   * @param {integer} count - number of food
   * @param {string} food - what for dinner
   * @param {float} weight - how much would you like to eat
   * @param {boolean} check - yes?
   */
  console.log(`${count} ${food} weigh ${weight} kilograms. ${check ? '√' : 'x'}`)
}

executeMe(eatFood);
