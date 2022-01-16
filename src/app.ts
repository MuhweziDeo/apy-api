import express, { Application, Request, Response } from 'express';
import { NODE_ENV, PORT } from './config';

const app: Application = express();

const port: number = PORT;

app.get('/', (req: Request, res: Response) => {
    res.send({ message: 'API v1', NODE_ENV });
});

app.listen(port, function () {
    console.log(`App is listening on port ${port} !`);
});
