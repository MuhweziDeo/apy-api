import express, { Application, Request, Response } from 'express';
import { errors } from 'celebrate';
import { API_PREFIX, NODE_ENV } from './config';
import customersRouter from './customers';
import { createCalculationsTable } from './db';

const app: Application = express();

createCalculationsTable().then(console.log).catch(console.error);

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send({ message: 'API v1', NODE_ENV });
});

app.use(`${API_PREFIX}/customers`, customersRouter);
app.use(errors());

export default app;
