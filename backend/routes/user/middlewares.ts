import {NextFunction, RequestHandler} from 'express';
import {body, matchedData} from 'express-validator';
import {ApiError} from '../../app.errors';
import {StatusCodes} from 'http-status-codes';
import pgPromise from 'pg-promise';
import {torm} from '../../database/torm';
import QueryResultError = pgPromise.errors.QueryResultError;

export const passwordMatcher: RequestHandler = async (req, res, next) => {
    const { password } = matchedData(req);

    if (password) {
        const errors = await body('passwordConfirmation')
            .equals(password)
            .withMessage('passwords do not match')
            .run(req);

        if (!errors.isEmpty()) {
            next(new ApiError(StatusCodes.BAD_REQUEST, errors.array().join('').trimEnd()));
        }

        next();
    } else {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'could not extract password from request body'));
    }
};

export const userExists: RequestHandler = async (req, res, next: NextFunction) => {
    try {
        const { username } = req.body;
        const user = await torm.users.FindFirst({
            where: {
                username: username,
            },
        });

        if (!user) {
            next(new ApiError(StatusCodes.NOT_FOUND, `User ${username} not found`));
        } else {
            next();
        }
    } catch (e) {
        if (e instanceof QueryResultError) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, e.message));
        } else {
            next(e);
        }
    }
};

export const userDoesNotExists: RequestHandler = async (req, res, next: NextFunction) => {
    try {
        const { username } = req.body;
        const user = await torm.users.FindFirst({
            where: {
                username: username,
            },
        });

        if (user) {
            next(new ApiError(StatusCodes.CONFLICT, 'A user with this username already exists'));
        } else {
            next();
        }
    } catch (e) {
        if (e instanceof QueryResultError) {
            next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, e.message));
        } else {
            next(e);
        }
    }
};
