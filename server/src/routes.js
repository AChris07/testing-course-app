const express = require('express');

const { controller: calculateController } = require('./calculate');

const router = express.Router();

router.get('/hello', (req, res) =>
  res.send('Hello World!')
);

router.use('/calculate', calculateController);

module.exports = router;
