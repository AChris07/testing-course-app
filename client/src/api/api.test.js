import React from 'react';
import moxios from 'moxios';

import api from './index';

beforeEach(() => {
  moxios.install();
});

afterEach(() => {
  moxios.uninstall();
});

describe('Get Expression', () => {
  it('should call the server', async () => {
    moxios.stubRequest(/\/calculate\/.+/, {
      status: 200,
      response: {
        response: 19
      }
    });

    const stubExpression = '2+2';
    const response = await api.getExpression(stubExpression);
    expect(response).toBe(19);
  });
});
