import fs from 'fs';
import path from 'path';
import { Response } from 'express';

import {
  checkFilter,
  filterEvents,
  pagitateEvents,
  preparePaginationParams,
} from './utils';

import {paginationResultType, eventsJsonType} from './types';

export function eventsView(
  res: Response,
  type?: string,
  queryLimit?: string,
  queryPage?: string
): void {
  // Если невалидный запрос
  if (type && !checkFilter(type)) {
    res.status(400).send('incorrect type');
    return;
  }

  const {errors, limit, page}: paginationResultType = preparePaginationParams(queryLimit, queryPage);
  if (errors) {
    res.status(400).send('incorrect pagination');
    return;
  }

  const filePath: string = path.join(__dirname, '../events.json');
  fs.readFile(filePath, {encoding: 'utf-8'}, function(err: Error, data: string) {
    if (err) {
      console.log(err);
    }

    const eventsJson: eventsJsonType = JSON.parse(data);

    let result = filterEvents(eventsJson, type);
    result = pagitateEvents(result, limit, page);
  
    if (!result.events.length) {
      res.status(404).send('<h1>Page not found</h1>');
      return;
    }
  
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result, null, 2));
  });

}
