import logger from './services/logger';
import app from './app';
import {ServerConfiguration} from './app.config';
import {gracefullyCloseConnections} from './app.handlers';
import initSockets from './services/socket';

/**
 * The entry point for our backend service.
 * Starts the server based on the configuration values extracted from the environment.
 */
async function main() {
    const server = initSockets(app);

    server.listen(ServerConfiguration.port, () => logger.info(`server is listening on port ${ServerConfiguration.port}`));
}

/**
 * Catches the potential errors and gracefully shutdown the services if so.
 */
main()
    .catch(async (err) => {
        logger.error(err, err.stack);
        logger.error('Exiting..');

        await gracefullyCloseConnections();

        process.exit(1);
    });