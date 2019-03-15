const resultsCollectionFactory = db =>
  db.addCollection('results', {
    indices: ['resultId'],
    unique: ['resultId']
  });

const getResultModel = (
  resultId, expression,
  result, dateCreated
) => ({
  resultId, expression,
  result, dateCreated
});

module.exports = {
  resultsCollectionFactory,
  getResultModel
};
