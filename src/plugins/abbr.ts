import { FunctionDescription } from '../function/parse';

export function abbr(description: FunctionDescription): FunctionDescription {
  const usedName = new Set<string>();
  description.options.forEach((option) => {
    if (option.shortName) {
      usedName.add(option.shortName);
    }
    if (option.longName) {
      usedName.add(option.longName);
    }
  });

  const result = description.options.slice();
  description.options.forEach((option, index) => {
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
