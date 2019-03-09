const math = require('mathjs');

const service = require('./service');

// Stubs
const stubExpression = '2+4*8-(3*5)';

describe('Expression evaluation', () => {
  it('should call mathjs to evaluate the expression', () => {
    const mathSpy = jest.spyOn(math, 'eval');

    service.evalExpression(stubExpression);
    expect(mathSpy).toHaveBeenCalled();
    mathSpy.mockRestore();
  });

  it('should evaluate the expression correctly', () => {
    const response = service.evalExpression(stubExpression);
    expect(response).toBe(19);
  });
});
