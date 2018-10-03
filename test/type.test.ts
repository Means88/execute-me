import { expect } from 'chai';
import * as type from '../src/type';

describe('type', () => {
  it('with type', () => {
    expect(type.isBooleanType('boolean')).to.be.true;
    expect(type.isBooleanType('bool')).to.be.true;
    expect(type.isBooleanType('Boolean')).to.be.true;

    expect(type.isStringType('str')).to.be.true;
    expect(type.isStringType('string')).to.be.true;
    expect(type.isStringType('String')).to.be.true;

    expect(type.isIntegerType('int')).to.be.true;
    expect(type.isIntegerType('Integer')).to.be.true;

    expect(type.isFloatType('number')).to.be.true;
    expect(type.isFloatType('float')).to.be.true;
  });

  // it('should parse correctly', () => {
  //   expect(type.Parser['bool']('false')).to.be.false;
  //   expect(type.Parser['bool']('true')).to.be.true;
  // });
});