const express = require('express');

const service = require('./service');
const { base64 } = require('../utils');

const router = express.Router();

router.get('/:encodedExpr', (req, res) => {
  const {encodedExpr} = req.params;
  const expression = base64.decode(encodedExpr);

  if (!Boolean(expression)) {
    console.log('No valid expression sent, skipping...');
    res.status(400)
      .send('A valid expression needs to be sent as part of the body')
      .end();
  }

  try {
    console.log(`Evaluating expression ${expression}...`);
    const solution = service.evalExpression(expression);
    res.status(200).json({ response: solution });
  }
  catch (err) {
    // TODO: Implement a logger
    console.error(err);
    res.sendStatus(400);
  }
});

module.exports = router;
