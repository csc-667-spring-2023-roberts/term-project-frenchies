import {Router} from 'express';
import {UserCreationDTO} from './types';
import validationMiddleware from '../../middlewares/validation';
import {passwordMatcher, userDoesNotExists, userExists} from './middlewares';
import {StatusCodes} from 'http-status-codes';
import * as controllers from './controllers';
import authMiddleware from '../../middlewares/auth';
import {ApiError} from '../../app.errors';

const router = Router();

router.get(
    '/users/me',
    async (req, res, next) => {
        try {
            const { user } = req.session;

            if (!user) {
                throw new ApiError(StatusCodes.NOT_FOUND, 'User session not found in request');
            }

            const userEntity = await controllers.Get(user.id);

            res.status(StatusCodes.OK).send(userEntity);
        } catch (e) {
            next(e);
        }
    },
);

router.post(
    '/users/register',
    validationMiddleware(UserCreationDTO, ['body']),
    passwordMatcher,
    userDoesNotExists,
    async (req, res, next) => {
        try {
            const { username, password } = req.body;
            const createdUser = await controllers.Create(username, password);

            res.status(StatusCodes.CREATED).send(createdUser);
        } catch (e) {
            next(e);
        }
    },
);

router.post(
    '/users/login',
    userExists,
    async (req, res, next) => {
        try {
            const { username, password } = req.body;
            const loggedInUser = await controllers.Login(username, password);

            req.session.user = {
                id: loggedInUser.id,
            };

            res.send(loggedInUser);
        } catch (e) {
            next(e);
        }
    },
);

router.delete(
    '/users/logout',
    authMiddleware,
    async (req, res) => {
        await new Promise<void>((resolve, reject) => {
            req.session.destroy((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        res.sendStatus(StatusCodes.NO_CONTENT);
    },
);

export default router;
