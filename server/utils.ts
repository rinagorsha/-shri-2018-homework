const TYPES = ['info', 'critical'];
import {eventItemType, eventsJsonType, paginationResultType} from './types';

export function pad(num: string, length: number = 2, symb: string = '0'): string {
  const n = num.toString();
  return n.length >= length ? n : pad(symb + n, length, symb);
}

export function dateDiff(date1: Date, date2: Date):string {
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
export function preparePaginationParams(
  queryLimit: string = '0',
  queryPage: string = '1'
): paginationResultType {
  const limit: number = +queryLimit;
  const page: number = +queryPage;
  const result: paginationResultType = {
    errors: false,
    page: 1,
    limit: 0,
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

export function filterEvents(query: string, eventsJson: eventsJsonType): eventsJsonType {
  if (!query) return eventsJson;
  const types: string[] = query.split(':');

  const dataEvents = [...eventsJson.events]

  const filtredEvents = dataEvents.filter(item => types.includes(item.type) );

  return {
    ...eventsJson,
    events: filtredEvents,
  }
}

export function pagitateEvents(data: eventsJsonType, limit: number, page: number): eventsJsonType {
  const startIndex: number = (page - 1) * limit;
  const endIndex: number = limit ? startIndex + limit : data.events.length;
  const events: eventItemType[] = data.events.slice(startIndex, endIndex);
  return {
    ...data,
    events,
  }
}

export function checkFilter(filters: string): boolean {
  const filtersArr: string[] = filters.split(':');
  return !filtersArr.some(item => !TYPES.includes(item));
}
