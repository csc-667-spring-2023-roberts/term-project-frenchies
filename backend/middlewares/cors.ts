import cors from 'cors';
import {StatusCodes} from 'http-status-codes';
import {ServerConfiguration} from '../app.config';
import {ApiError} from '../app.errors';

const corsMiddleware = cors({
    credentials: true,
    origin: (requestOrigin, callback) => {
        if (requestOrigin === undefined) {
            callback(null, true);
        } else if (ServerConfiguration.whitelist.indexOf(requestOrigin) !== -1) {
            callback(null, true);
        } else {
            callback(new ApiError(StatusCodes.BAD_REQUEST, `Request origin (${requestOrigin}) is not allowed by CORS policy.`));
        }
    }
});

export default corsMiddleware;