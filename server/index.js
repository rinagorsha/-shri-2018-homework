const express = require('express');
const bodyParser = require('body-parser');
const { eventsView } = require('./views');
const { dateDiff } = require('./utils');

const app = express();
const startWorkDate = new Date();

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
  const {type, page, limit} = req.query;
  eventsView(res, type, limit, page);
});

app.post('/api/events', function (req, res) {
  const {type, page, limit} = req.body;
  eventsView(res, type, limit, page);
});

app.get('*', function(req, res){
  res.send(' <h1>Page not found</h1>', 404);
});

app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});
