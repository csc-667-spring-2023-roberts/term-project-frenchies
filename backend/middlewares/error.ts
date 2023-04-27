import {ErrorRequestHandler} from 'express';
import {ErrorRO} from '../app.types';
import {getReasonPhrase, StatusCodes} from 'http-status-codes';
import logger from '../services/logger';

const errorMiddleware: ErrorRequestHandler = (err, req, res, _) => {
    let error: ErrorRO;
    let sc: StatusCodes;

    if (err.statusCode) {
        sc = err.statusCode;
        error = {
            statusCode: sc,
            message: err.message,
        };

        logger.error(err.message);
    } else {
        sc = StatusCodes.INTERNAL_SERVER_ERROR;
        error = {
            statusCode: sc,
            message: getReasonPhrase(sc),
        };

        if (err.isAxiosError) {
            logger.error(err.message);
        } else {
            logger.error(err);
        }
    }

    res
        .status(sc)
        .send(error);
};

export default errorMiddleware;