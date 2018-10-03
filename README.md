# Execute Me

Automatically generate command line interfaces from JavaScript functions.

## Installation

```bash
npm install execute-me --save

```

## Usage

```javascript
const { executeMe } = require('execute-me');

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

```

```bash
> ./example/eatFood.js --food "rice balls" -w 2.2 --check
< 5 rice balls weigh 2.2 kilograms. √

```

```bash
> ./example/eatFood.js --version
< 0.1.0-beta3

```

```bash
> ./example/eatFood.js -h
< Usage: eatFood [options]
<
< A function named eatFood.
<
< Options:
<
<  -V, --version          output the version number
<  -c, --count <count>    number of food (default: 5)
<  -f, --food <food>      what for dinner
<  -w, --weight <weight>  how much would you like to eat
<  --check                yes?
<  -h, --help             output usage information

```

## Supported Types
Only number, string and boolean is suppoirted. Union types are not supported yet.
### integer
alias:
- int
- integer
- Int
- Integer

### float
alias:
- float
- Float
- number
- Number

### string
alias:
- str
- string
- String

### boolean
alias:
- bool
- boolean
- Boolean

### any(boolean or string)
alias:
- any

## How does it work?
- Get the source code of the function by `fn.toString()`
- Parse the argument list with [@babel/parser](https://github.com/babel/babel) and JSDoc with [Doctrine](https://github.com/eslint/doctrine)
- Create CLI with [Commander.js](https://github.com/tj/commander.js)

You should not uglify the entrance function because it depends on `toString` method of functions.

## License
MIT