const express = require('express');
const request = require('supertest');

const controller = require('./controller');
const mockedService = require('./service');
const { base64 } = require('../utils');

// Init app for controller
const app = express();
app.use('/', controller);

// Stubs
const stubExpression = '2+4*8-(3*5)';
const stubEncodedExpr = base64.encode(stubExpression);
const stubFalseEncoding = '==falseEncoding';

// Mocks
jest.mock('./service', () => ({
  evalExpression: jest.fn(() => 19)
}));

describe('GET /:encodedExpr', () => {
  it('should call the calculation service', async () => {
    await request(app)
      .get(`/${stubEncodedExpr}`);

    expect(mockedService.evalExpression).toHaveBeenCalled();
    mockedService.evalExpression.mockClear();
  });

  it('should accept a valid encoded expression and return a 200', async () => {
    await request(app)
      .get(`/${stubEncodedExpr}`)
      .expect(200);
  });

  it('should evaluate the encoded expression', async () => {
    const res = await request(app)
      .get(`/${stubEncodedExpr}`);

    expect(res.body.response).toBe(19);
  });

  it('should not accept a non-valid base64 encoded string', async () => {
    await request(app)
      .get(`/${stubFalseEncoding}`)
      .expect(400);
  });
});
