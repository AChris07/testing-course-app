const express = require('express');

const routes = require('./routes');

const app = express();
const PORT = 3000;

app.use('/', routes, function (req, res) {
  res.sendStatus(404);
});

app.listen(PORT, () => 
  console.log(`Listening on port ${PORT}`)
);