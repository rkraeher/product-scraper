import { getHalvedRanges } from './index';

describe('getHalvedRanges', () => {
  it('should return the halved ranges correctly', () => {
    const range = [1, 10];
    const expected = {
      newLowerRange: [1, 4],
      newUpperRange: [5, 10],
    };
    expect(getHalvedRanges(range)).toEqual(expected);
  });

  it('should handle zero correctly', () => {
    const range = [0, 10];
    const expected = {
      newLowerRange: [0, 4],
      newUpperRange: [5, 10],
    };
    expect(getHalvedRanges(range)).toEqual(expected);
  });

  // this one would be important for price data
  it.skip('should handle floating-point numbers correctly', () => {
    const range = [1.5, 9.5];
    const expected = {
      newLowerRange: [1.5, 4.75],
      newUpperRange: [4.75, 9.5],
    };
    expect(getHalvedRanges(range)).toEqual(expected);
  });

  it.skip('should handle negative numbers correctly', () => {
    const range = [-5, 5];
    const expected = {
      newLowerRange: [-5, 2.5],
      newUpperRange: [2.5, 5],
    };
    expect(getHalvedRanges(range)).toEqual(expected);
  });
});
