const express = require('express');
const bodyParser = require('body-parser');
const { eventsView } = require('./views');
const { dateDiff } = require('./utils');

const app = express();
const startWorkDate = new Date();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

app.get('/status', (req, res) => {
  res.send(`
    Время с запуска сервера: ${dateDiff(startWorkDate, new Date())}
  `);
});

app.get('/api/events', (req, res) => {
  const {type, page, limit} = req.query;
  eventsView(res, type, limit, page);
});

app.post('/api/events', (req, res) => {
  const {type, page, limit} = req.body;
  eventsView(res, type, limit, page);
});

app.use((req, res) => {
  res.status(404).send('<h1>Page not found</h1>');
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!');
});
