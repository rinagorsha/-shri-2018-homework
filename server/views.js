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
    res.send('incorrect type', 400);
    return;
  }

  const {errors, limit, page} = preparePaginationParams(queryLimit, queryPage);
  if (errors) {
    res.send('incorrect pagination', 400);
    return;
  }

  let result = filterEvents(type, eventsJson);
  result = pagitateEvents(result, limit, page);

  if (!result.events.length) {
    res.send(' <h1>Page not found</h1>', 404);
    return;
  }

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(result, null, 2));
}

module.exports.eventsView = eventsView;
