import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/Users/user.routes';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Next label');
});
app.use(userRoutes);
export default app;
