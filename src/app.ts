import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api', router);

// server route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the app');
});

export default app;
