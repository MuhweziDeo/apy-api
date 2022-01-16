import app from './src/app';
import { PORT } from './src/config';

const port: number = PORT;

app.listen(port, function () {
    console.log(`App is listening on port ${port} !`);
});
