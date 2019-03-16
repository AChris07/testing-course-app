const axios = require('axios');

const { testExpressionData } = require('../data/expressions');
const { BASE_URLS } = require('../../src/constants');

module.exports = async () => {
  const res = await axios.get(`${BASE_URLS.PERSISTENCE}/results`);

  const resultsToClean = res.data.filter(({ expression, result }) =>
    expression === testExpressionData.expression
    && result === testExpressionData.result
  );

  Promise.all(resultsToClean.map(async result =>
    await axios.delete(`${BASE_URLS.PERSISTENCE}/results/${result.resultId}`)
  ));
};
