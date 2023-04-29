import morgan from 'morgan';
import logger from '../services/logger';

const requestLoggerMiddleware = morgan('tiny', {
    stream: {
        write(message: string) {
            logger.http(message.trimEnd());
        }
    }
});

export default requestLoggerMiddleware;
