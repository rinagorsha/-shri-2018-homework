const TYPES = ['info', 'critical'];

type eventItemType = {
  type: string,
  title: string,
  source: string,
  time: string,
  description: string | null,
  icon: string,
  size: 's' | 'm' | 'l',
  data?: {
    type?: string,
  }
}

type eventsJsonType = {
  events: eventItemType[],
};

type paginationResultType = {
  errors: boolean,
  limit?: number,
  page?: number,
};


function pad(num: string, length: number = 2, symb: string = '0'): string {
  const n = num.toString();
  return n.length >= length ? n : pad(symb + n, length, symb);
}

function dateDiff(date1: Date, date2: Date):string {
  let diff = +date2 - +date1;

  let hours: number = Math.floor(diff / 60 / 60 / 1000);
  let minutes: number = Math.floor(diff / 60 / 1000) % 60;
  let seconds: number = Math.floor(diff / 1000) % 60;

  return `${pad(hours.toString())}:${pad(minutes.toString())}:${pad(seconds.toString())}`;
}

/**
 * Подготавливает и валидирует параметры для пагинации
 * page задает номер страницы, по умолчанию 1
 * limit задает, количество элементов на странице, по умолчанию 0
 * если limit === 0, выведутся все элементы
 */
function preparePaginationParams(
  queryLimit: string = '0',
  queryPage: string = '1'
): paginationResultType {
  const limit: number = +queryLimit;
  const page: number = +queryPage;
  const result: paginationResultType = {
    errors: false,
  };

  if (isNaN(limit) || isNaN(page) || limit < 0 || page <= 0) {
    result.errors = true;
    return result;
  }

  if (limit) result.limit = limit;
  else result.limit = 0;

  if (page) result.page = page;
  else result.page = 1;

  if (limit === 0 && page > 1) {
    result.errors = true;
    return result;
  }

  return result;
}

function filterEvents(query: string, eventsJson: eventsJsonType): eventsJsonType {
  if (!query) return eventsJson;
  const types: string[] = query.split(':');

  const dataEvents = [...eventsJson.events]

  const filtredEvents = dataEvents.filter(item => types.includes(item.type) );

  return {
    ...eventsJson,
    events: filtredEvents,
  }
}

function pagitateEvents(data: eventsJsonType, limit: number, page: number): eventsJsonType {
  const startIndex: number = (page - 1) * limit;
  const endIndex: number = limit ? startIndex + limit : data.events.length;
  const events: eventItemType[] = data.events.slice(startIndex, endIndex);
  return {
    ...data,
    events,
  }
}

function checkFilter(filters: string): boolean {
  const filtersArr: string[] = filters.split(':');
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
