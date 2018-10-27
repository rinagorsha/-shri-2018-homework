import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import { dateDiff } from './utils';
import { eventsView } from './views';

const app = express();
const startWorkDate: Date = new Date();

interface IqueryType {
  type?: string;
  page?: string;
  limit?: string;
}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/status', (req: Request, res: Response) => {
  res.send(`
    Время с запуска сервера: ${dateDiff(startWorkDate, new Date())}
  `);
});

app.get('/api/events', (req: Request, res: Response) => {
  const { type, page, limit }: IqueryType = req.query;
  eventsView(res, type, limit, page);
});

app.post('/api/events', (req: Request, res: Response) => {
  const { type, page, limit }: IqueryType = req.body;
  eventsView(res, type, limit, page);
});

app.use((req: Request, res: Response) => {
  res.status(404).send('<h1>Page not found</h1>');
});

app.listen(8000, () => {
  // tslint:disable-next-line
  console.log("Example app listening on port 8000!");
});
