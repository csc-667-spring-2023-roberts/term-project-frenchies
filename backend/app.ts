import express from 'express';
import session from './app.session';
import corsMiddleware from './middlewares/cors';
import requestLoggerMiddleware from './middlewares/requestLogger';
import router from './app.routes';
import notFoundMiddleware from './middlewares/notFound';
import errorMiddleware from './middlewares/error';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, 'js')));
app.use(express.static(path.join(__dirname, 'static')));
app.use(session);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(corsMiddleware);
app.use(requestLoggerMiddleware);

app.use(router);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

export default app;