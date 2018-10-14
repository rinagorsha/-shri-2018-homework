const express = require('express');
const eventsJson = require('../events.json');

const app = express();
const startWorkDate = new Date();
const TYPES = ['info', 'critical'];

function pad(num, length = 2, symb = '0') {
  const n = num.toString();
  const result = n.length >= length ? n : pad(symb + n, length, symb);
  return result;
}

function dateDiff(date1, date2) {
  let diff = date2 - date1;

  let hours = Math.floor(diff / 60 / 60 / 1000);
  let minutes = Math.floor(diff / 60 / 1000) % 60;
  let seconds = Math.floor(diff / 1000) % 60;

  const result = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  return result;
}

function filterEvents(query) {
  if (!query) return JSON.stringify(eventsJson, null, 2);
  const types = query.split(':');

  const dataEvents = [...eventsJson.events]

  const filtredEvents = dataEvents.filter(item => types.includes(item.type) );

  const result = {
    events: filtredEvents,
  }

  return JSON.stringify(result, null, 2);
}

function checkQuery(type, query) {
  const queries = query[type].split(':');
  return !queries.some(item => TYPES.includes(item) === false );
}

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/status', function (req, res) {
  res.send(`
    Время с запуска сервера: ${dateDiff(startWorkDate, new Date())}
  `);
});

app.get('/api/events', function (req, res) {

  // Если невалидный запрос
  if (req.query.type && !checkQuery('type', req.query)) {
    res.send('incorrect type', 400);
    return;
  }

  const result = filterEvents(req.query.type);

  res.setHeader('Content-Type', 'application/json');
  res.send(result);
});

app.get('*', function(req, res){
  res.send(' <h1>Page not found</h1>', 404);
});

app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});