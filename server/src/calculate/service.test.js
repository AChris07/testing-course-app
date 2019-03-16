const math = require('mathjs');
const moxios = require('moxios');

const service = require('./service');

// Stubs
const stubExpression = '2+4*8-(3*5)';

beforeEach(() => {
  moxios.install();
});

afterEach(() => {
  moxios.uninstall();
});

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

describe('Result storage', () => {
  it('should call the persistence server', async () => {
    moxios.stubRequest(/\/results/, {
      status: 201,
    });

    const response = await service.storeResult();
    expect(response.status).toBe(201);
  });

  it('should return an appropiate error if the server call is not successful', async () => {
    moxios.stubRequest(/\/results/, {
      status: 500,
    });

    try {
      await service.storeResult();
    } catch (err) {
      expect(err).toEqual(new Error('Result storage not successful'));
    }
  });
});
