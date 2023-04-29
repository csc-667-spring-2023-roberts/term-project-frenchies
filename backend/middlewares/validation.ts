import {RequestHandler} from 'express';
import {checkSchema, Location, Schema, ValidationError} from 'express-validator';
import {StatusCodes} from 'http-status-codes';
import {ApiError} from '../app.errors';

const validationMiddleware = (target: Schema, locations: Location[]): RequestHandler => {
    return async (req, res, next) => {
        const results = await checkSchema(target, locations).run(req);
        const errors : ValidationError[] = [];

        results.forEach(result => errors.push(...result.array()));

        if (errors.length > 0) {
            next(new ApiError(StatusCodes.BAD_REQUEST, errors.join('').trimEnd()));
        }

        next();
    };
};

export default validationMiddleware;