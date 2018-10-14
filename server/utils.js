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

function filterEvents(query, eventsJson) {
  if (!query) return JSON.stringify(eventsJson, null, 2);
  const types = query.split(':');

  const dataEvents = [...eventsJson.events]

  const filtredEvents = dataEvents.filter(item => types.includes(item.type) );

  const result = {
    events: filtredEvents,
  }

  return JSON.stringify(result, null, 2);
}

function checkFilter(filters) {
  const filtersArr = filters.split(':');
  return !filtersArr.some(item => TYPES.includes(item) === false );
}

module.exports.pad = pad;
module.exports.dateDiff = dateDiff;
module.exports.filterEvents = filterEvents;
module.exports.checkFilter = checkFilter;