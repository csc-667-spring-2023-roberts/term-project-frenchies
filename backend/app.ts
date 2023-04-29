import express from 'express';
import session from './app.session';
import corsMiddleware from './middlewares/cors';
import helmet from 'helmet';
import requestLoggerMiddleware from './middlewares/requestLogger';
import router from './app.routes';
import notFoundMiddleware from './middlewares/notFound';
import errorMiddleware from './middlewares/error';

const app = express();

app.use(session);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(corsMiddleware);
app.use(helmet());
app.use(requestLoggerMiddleware);

app.use(router);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;