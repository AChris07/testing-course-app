const math = require('mathjs');
const axios = require('axios');

const { BASE_URLS } = require('../constants');

const evalExpression = expr => math.eval(expr);
const storeResult = async (expression, result) => {
  try {
    return await axios.post(`${BASE_URLS.PERSISTENCE}/results`, {
      expression,
      result
    });
  } catch (err) {
    throw new Error('Result storage not successful');
  }
}

module.exports = {
  evalExpression,
  storeResult
};
