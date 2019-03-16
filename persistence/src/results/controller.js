const express = require('express');
const uuidv1 = require('uuid/v1');

const { results } = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  const allResults = results.collection.find();
  allResults.length > 0
    ? res.json(allResults)
    : res.sendStatus(404);
});

router.get('/:resultId', (req, res) => {
  const { resultId } = req.params;
  const allResults = results.collection.find({ resultId });
  allResults.length > 0
    ? res.json(allResults[0])
    : res.sendStatus(404);
});

router.post('/', (req, res) => {
  const { expression, result } = req.body;
  if (!expression || !result) {
    res.status(400)
      .send('A valid expression and result need to be sent');
    return;
  }

  try {
    const resultId = uuidv1();
    const newResult = results.getModel(
      resultId,
      expression,
      result
    );
    results.collection.insert(newResult);
  }
  catch (err) {
    // TODO: Implement a logger
    console.error(err);
    res.sendStatus(400);
  }

  res.sendStatus(201);
});

router.delete('/:resultId', (req, res) => {
  const { resultId } = req.params;
  const allResults = results.collection.find({ resultId });
  if (allResults.length > 0) {
    results.collection.remove(allResults);
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
