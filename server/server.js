const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use((err, req, res, next) => {
  if (err) {
    console.log('Invalid Request data');
    res.status(400).send('Invalid Request data');
  } else {
    next();
  }
})

app.use('/', routes, (req, res) =>
  res.sendStatus(404)
);

app.listen(PORT, () =>
  console.log(`Listening on port ${PORT}`)
);
