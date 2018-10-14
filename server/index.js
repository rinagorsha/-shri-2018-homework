const express = require('express');
const bodyParser = require('body-parser');
const {pad, dateDiff, filterEvents, checkFilter} = require('./utils');
const eventsJson = require('../events.json');

const app = express();
const startWorkDate = new Date();


function eventsView(type, res) {
  // Если невалидный запрос
  if (type && !checkFilter(type)) {
    res.send('incorrect type', 400);
    return;
  }

  const result = filterEvents(type, eventsJson);

  res.setHeader('Content-Type', 'application/json');
  res.send(result);
}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/status', function (req, res) {
  res.send(`
    Время с запуска сервера: ${dateDiff(startWorkDate, new Date())}
  `);
});

app.get('/api/events', function (req, res) {
  const {type} = req.query;
  eventsView(type, res);
});

app.post('/api/events', function (req, res) {
  const {type} = req.body;
  eventsView(type, res);
});

app.get('*', function(req, res){
  res.send(' <h1>Page not found</h1>', 404);
});

app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});