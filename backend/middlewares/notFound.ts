import { RequestHandler } from 'express';
import { ApiError } from '../app.errors';
import {StatusCodes} from 'http-status-codes';

const notFoundMiddleware: RequestHandler = (req, res, next) => {
    next(new ApiError(StatusCodes.NOT_FOUND, `${req.method} ${req.url} not found`));
};

export default notFoundMiddleware;