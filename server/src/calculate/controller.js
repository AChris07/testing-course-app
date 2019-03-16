const express = require('express');

const service = require('./service');
const { base64 } = require('../utils');

const router = express.Router();

router.get('/:encodedExpr', async (req, res) => {
  const {encodedExpr} = req.params;
  const expression = base64.decode(encodedExpr);

  if (!Boolean(expression)) {
    console.log('No valid expression sent, skipping...');
    return res.status(400)
      .send('A valid expression needs to be sent as part of the body')
      .end();
  }

  try {
    console.log(`Evaluating expression ${expression}...`);
    const result = service.evalExpression(expression);

    console.log(`Storing result: ${result}...`);
    await service.storeResult(expression, result);
    return res.status(200).json({ response: result });
  } catch (err) {
    // TODO: Implement a logger
    console.error(err);
    return res.sendStatus(400);
  }
});

module.exports = router;
