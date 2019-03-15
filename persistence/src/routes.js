const express = require('express');

const { controller: resultsController } = require('./results');

const router = express.Router();

router.get('/hello', (req, res) =>
  res.send('Hello World!')
);

router.use('/results', resultsController);

module.exports = router;
