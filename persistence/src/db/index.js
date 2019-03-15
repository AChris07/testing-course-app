const loki = require('lokijs');

const {
  resultsCollectionFactory,
  getResultModel
} = require('./results');

const db = new loki('persist.json');
const resultsCollection = resultsCollectionFactory(db);

module.exports = {
  results: {
    collection: resultsCollection,
    getModel: getResultModel
  }
};
