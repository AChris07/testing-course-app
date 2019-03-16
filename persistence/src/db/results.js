const resultsCollectionFactory = db =>
  db.addCollection('results', {
    indices: ['resultId'],
    unique: ['resultId']
  });

const getResultModel = (
  resultId, expression,
  result
) => ({
  resultId, expression,
  result
});

module.exports = {
  resultsCollectionFactory,
  getResultModel
};
