import { getQuaryParams } from './addQuaryParams';

describe('addQuaryParams.test description', () => {
  test('test with one param', () => {
    const params = getQuaryParams({
      test: 'value',
    });
    expect(params).toBe('?test=value');
  });
  test('test with multiple params', () => {
    const params = getQuaryParams({
      test: 'value',
      oneMore:'more'
    });
    expect(params).toBe('?test=value&oneMore=more');
  });
  test('test with undefined', () => {
       const params = getQuaryParams({
      test: 'value',
      oneMore:undefined
    });
    expect(params).toBe('?test=value');
  });
});
