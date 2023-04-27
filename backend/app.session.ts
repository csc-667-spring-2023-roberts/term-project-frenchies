import session from 'express-session';
import {ServerConfiguration} from './app.config';
import PostgresSession from './services/session';
import db from './services/database';

export interface UserSession {
    id: number;
}

declare module 'express-session' {
    interface SessionData {
        user: UserSession;
    }
}

export default session({
    secret: ServerConfiguration.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
    store: new PostgresSession({
        pgPromise: db,
    }),
});
