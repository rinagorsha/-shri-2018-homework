const eventsJson = require('../events.json');
const {
  checkFilter,
  filterEvents,
  pagitateEvents,
  preparePaginationParams,
} = require('./utils');

function eventsView(res, type, queryLimit, queryPage) {
  // Если невалидный запрос
  if (type && !checkFilter(type)) {
    res.status(400).send('incorrect type');
    return;
  }

  const {errors, limit, page} = preparePaginationParams(queryLimit, queryPage);
  if (errors) {
    res.status(400).send('incorrect pagination');
    return;
  }

  let result = filterEvents(type, eventsJson);
  result = pagitateEvents(result, limit, page);

  if (!result.events.length) {
    res.status(404).send('<h1>Page not found</h1>');
    return;
  }

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(result, null, 2));
}

module.exports.eventsView = eventsView;
