const express = require('express');
const request = require('supertest');

const controller = require('./controller');
const { results: mockedResults } = require('../db');

// Init app for controller
const app = express();
app.use(express.json());
app.use('/', controller);

// Stubs
const stubExistingResultId = '03b45260-46cd-11e9-9ac0-b141f7c91a95';
const stubNotFoundResultId = 'stubbed-result-id';

const stubCreateResultRequest = {
  expression: '46/8*(89-45)',
  result: 253
};

// Mocks
jest.mock('../db', () => ({
  results: {
    collection: {
      find: jest.fn(query => {
        const allResults = [
          {
            resultId: '03b45260-46cd-11e9-9ac0-b141f7c91a95',
            expression: '(2+5)*36',
            result: 252,
            meta: {
              revision: 0,
              created: 1552620507603,
              version: 0
            },
          },
          {
            resultId: '10119ae0-46cd-11e9-9ac0-b141f7c91a95',
            expression: '46/8*(89-45)',
            result: 253,
            meta: {
              revision: 0,
              created: 1552620508603,
              version: 0
            },
          }
        ];

        return query
          ? allResults.filter(result => result.resultId === query.resultId)
          : allResults;
      }),
      insert: jest.fn(() => {})
    },
    getModel: jest.fn(() => ({
      resultId: '03b45260-46cd-11e9-9ac0-b141f7c91a95',
      expression: '(2+5)*36',
      result: 252,
      meta: {
        revision: 0,
        created: 1552620507603,
        version: 0
      },
    }))
  }
}));

describe('GET /', () => {
  it('should call the database collection to find results', async () => {
    await request(app).get('/');

    expect(mockedResults.collection.find).toHaveBeenCalled();
    mockedResults.collection.find.mockClear();
  });

  it('should return a 200', async() => {
    await request(app).get('/')
      .expect(200);
  });

  it('should return the results list', async () => {
    const response = await request(app).get('/');

    expect(response.body.length).toBe(2);
    expect(response.body[0].resultId).toBeTruthy();
    expect(response.body[0].expression).toBeTruthy();
    expect(response.body[0].result).toBeTruthy();
  });

  it('should return a 404 if no results are found', async () => {
    mockedResults.collection.find.mockImplementationOnce(() => []);

    await request(app).get('/')
      .expect(404);
  });
});

describe('GET /:resultId', () => {
  it('should call the database collection to find results', async () => {
    await request(app).get(`/${stubExistingResultId}`);

    expect(mockedResults.collection.find).toHaveBeenCalled();
    mockedResults.collection.find.mockClear();
  });

  it('should return a 200', async() => {
    await request(app).get(`/${stubExistingResultId}`)
      .expect(200);
  });

  it('should return the stored result with a matching resultId', async () => {
    const response = await request(app).get(`/${stubExistingResultId}`);

    expect(response.body).toBeDefined();

    expect(response.body.resultId).toBeTruthy();
    expect(response.body.expression).toBeTruthy();
    expect(response.body.result).toBeTruthy();

    expect(response.body.resultId).toBe(stubExistingResultId);
  });

  it('should return a 404 if no results are found', async () => {
    await request(app).get(`/${stubNotFoundResultId}`)
      .expect(404);
  });
});

describe('POST /', () => {
  it('should return a 400 if no expression is set', async () => {
    const stubIncorrectRequest = {
      result: stubCreateResultRequest.result
    };

    await request(app)
      .post('/')
      .send(stubIncorrectRequest)
      .expect(400);
  });
  it('should return a 400 if no result is set', async () => {
    const stubIncorrectRequest = {
      expression: stubCreateResultRequest.expression
    };

    await request(app)
      .post('/')
      .send(stubIncorrectRequest)
      .expect(400);
  });
  it('should call the database collection to insert the new result', async () => {
    await request(app)
      .post('/')
      .send(stubCreateResultRequest);

    expect(mockedResults.collection.insert).toHaveBeenCalled();
    mockedResults.collection.insert.mockClear();
  });
  it('should return a 400 if an error occurs during data insertion', async () => {
    mockedResults.collection.insert.mockImplementationOnce(() => {
      throw new Error('Stub Error');
    });

    await request(app)
      .post(`/`)
      .send(stubCreateResultRequest)
      .expect(400);
  });
  it('should return 201 if the item is inserted correctly', async () => {
    await request(app)
      .post(`/`)
      .send(stubCreateResultRequest)
      .expect(201);
  });
});
