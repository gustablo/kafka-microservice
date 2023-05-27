import express from 'express';
import { routes } from './routes/customer.routes';

const app = express();

app.use(express.json());
app.use(routes);

export { app };
