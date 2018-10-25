const TYPES = ['info', 'critical'];

function pad(num, length = 2, symb = '0') {
  const n = num.toString();
  return n.length >= length ? n : pad(symb + n, length, symb);
}

function dateDiff(date1, date2) {
  let diff = date2 - date1;

  let hours = Math.floor(diff / 60 / 60 / 1000);
  let minutes = Math.floor(diff / 60 / 1000) % 60;
  let seconds = Math.floor(diff / 1000) % 60;

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

/**
 * Подготавливает и валидирует параметры для пагинации
 * page задает номер страницы, по умолчанию 1
 * limit задает, количество элементов на странице, по умолчанию 0
 * если limit === 0, выведутся все элементы
 */
function preparePaginationParams(queryLimit = 0, queryPage = 1) {
  const limit = +queryLimit;
  const page = +queryPage;
  const result = {
    errors: false,
  };

  if (isNaN(limit) || isNaN(page) || limit < 0 || page <= 0) {
    result.errors = true;
    return result;
  }

  if (+limit) result.limit = +limit;
  else result.limit = 0;

  if (+page) result.page = +page;
  else result.page = 1;

  if (limit === 0 && page > 1) {
    result.errors = true;
    return result;
  }

  return result;
}

function filterEvents(query, eventsJson) {
  if (!query) return eventsJson;
  const types = query.split(':');

  const dataEvents = [...eventsJson.events]

  const filtredEvents = dataEvents.filter(item => types.includes(item.type) );

  return {
    ...eventsJson,
    events: filtredEvents,
  }
}

function pagitateEvents(data, limit, page) {
  const startIndex = (page - 1) * limit;
  const endIndex = limit ? startIndex + limit : data.events.length;
  const events = data.events.slice(startIndex, endIndex);
  return {
    ...data,
    events,
  }
}

function checkFilter(filters) {
  const filtersArr = filters.split(':');
  return !filtersArr.some(item => !TYPES.includes(item));
}

module.exports = {
  pad,
  dateDiff,
  filterEvents,
  pagitateEvents,
  preparePaginationParams,
  checkFilter,
};
