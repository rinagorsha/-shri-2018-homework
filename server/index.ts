import express, {Request, Response } from 'express';
import bodyParser from 'body-parser';
import { eventsView } from './views';
import { dateDiff } from './utils';
import {paginationResultType} from './types';

const app = express();
const startWorkDate: Date = new Date();

type queryType = {
  type?: string,
  page?: string,
  limit?: string,
}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

app.get('/status', (req: Request, res: Response) => {
  res.send(`
    Время с запуска сервера: ${dateDiff(startWorkDate, new Date())}
  `);
});

app.get('/api/events', (req: Request, res: Response) => {
  const {type, page, limit}: queryType = req.query;
  eventsView(res, type, limit, page);
});

app.post('/api/events', (req: Request, res: Response) => {
  const {type, page, limit}: queryType = req.body;
  eventsView(res, type, limit, page);
});

app.use((req: Request, res: Response) => {
  res.status(404).send('<h1>Page not found</h1>');
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!');
});
