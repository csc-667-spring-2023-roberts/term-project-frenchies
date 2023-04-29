import db from './services/database';
import logger from './services/logger';

export async function gracefullyCloseConnections() {
    logger.info('disconnecting from database..');
    await db.$pool.end();
    logger.info('successfully disconnected from database!');
}
