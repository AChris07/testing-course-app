const request = require('supertest');
const axios = require('axios');

const app = require('../src/app');
const { testExpressionData } = require('./data/expressions');
const { BASE_URLS } = require('../src/constants');

// Hide console calls inside tests
console.log = jest.fn();
console.error = jest.fn();

describe('Integration with Persistence', () => {
  it('stores an expression\'s result after evaluation', async () => {
    await request(app)
      .get(`/calculate/${testExpressionData.encodedExpr}`)
      .expect(200);

    const res = await axios.get(`${BASE_URLS.PERSISTENCE}/results`);
    const storedResult = res.data.find(
      result => result.expression === testExpressionData.expression
    );
    expect(storedResult).toBeDefined();
    expect(storedResult.result).toBe(testExpressionData.result);
  });

  // TODO: Implement endpoint to get last 5 expressions,
  // with unit tests and integration tests.
});
