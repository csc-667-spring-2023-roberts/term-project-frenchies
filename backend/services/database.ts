import pgp from 'pg-promise';
import {DatabaseConfiguration} from '../app.config';
import logger from './logger';

const db = pgp({
    connect() {
        logger.info('successfully connected to database!');
    },
})(DatabaseConfiguration.url);

export default db;
