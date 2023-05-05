import {NextFunction, RequestHandler} from 'express';
import {ApiError} from '../../app.errors';
import {StatusCodes} from 'http-status-codes';
import pgPromise from 'pg-promise';
import {torm} from '../../database/torm';
import QueryResultError = pgPromise.errors.QueryResultError;


export const roomExists: RequestHandler = async (req, res, next: NextFunction) => {
    try {
        const { roomId } = req.body;
        const room = await torm.users.FindFirst({
            where: {
                id: roomId,
            },
        });

        if (!room) {
            next(new ApiError(StatusCodes.NOT_FOUND, `Room ${roomId} not found`));
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
