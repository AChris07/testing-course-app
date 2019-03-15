const express = require('express');

const routes = require('./routes');

const app = express();

app.use(express.json());

// Handle invalid request data
app.use((err, req, res, next) => {
  if (err) {
    console.log('Invalid Request data');
    res.status(400).send('Invalid Request data');
  } else {
    next();
  }
});

// CORS Headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', routes, (req, res) =>
  res.sendStatus(404)
);

module.exports = app;
