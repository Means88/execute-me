import { expect } from 'chai';
import { ParamOptions } from '../src/function/parse';
import { abbr } from '../src/plugins/abbr';

describe('abbr', () => {
  it('should create short name', () => {
    const options: ParamOptions = [{
      name: 'apple',
      index: 0,
      default: undefined,
      description: '',
      shortName: null,
      longName: 'apple',
      type: 'string',
    }];
    const result = abbr({
      options,
      description: '',
    });
    expect(result.options[0].shortName).to.equal('a');
  });

  it('should not create short name when conflict', () => {
    const options: ParamOptions = [{
      name: 'apple',
      index: 0,
      default: undefined,
      description: '',
      shortName: null,
      longName: 'apple',
      type: 'string',
    }, {
      name: 'a',
      index: 0,
      default: undefined,
      description: '',
      shortName: 'a',
      longName: null,
      type: 'string',
    }];
    const result = abbr({
      options,
      description: '',
    });
    expect(result.options[0].shortName).to.equal(null);
  });
});
