import {StatusCodes} from 'http-status-codes';
import {RequestHandler} from 'express';
import {ApiError} from '../app.errors';

const authMiddleware: RequestHandler = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        next(new ApiError(StatusCodes.UNAUTHORIZED, 'You must be logged in to perform this action'));
    }
};

export default authMiddleware;