import {Router} from 'express';
import {StatusCodes} from 'http-status-codes';
import * as controllers from './controllers';
import authMiddleware from '../../middlewares/auth';
import { roomExists } from './middlewares';

const router = Router();

router.post(
    '/room/create',
    async (_, res, next) => {
        try {
            const createdRoom = await controllers.Create();

            res.status(StatusCodes.CREATED).send(createdRoom);
        } catch (e) {
            next(e);
        }
    },
);

router.post(
    '/room/join',
    authMiddleware,
    async (req, res, next) => {
        try {
            const user = req.session.user;
            const { roomId } = req.body;

            if (!user) {
                throw new Error('User not found or not login');
            }

            const addedUserToRoom = await controllers.Join(roomId, user.id);

            res.status(StatusCodes.OK).send(addedUserToRoom);
        } catch (e) {
            next(e);
        }
    },
);

//TODO: check if user is in the room with middlewhere and if room exist
router.post(
    '/room/message',
    authMiddleware,
    roomExists,
    async (req, res, next) => {
        try {
            const user = req.session.user;
            const { content, roomId } = req.body;

            if (!user) {
                throw new Error('User not found or not login');
            }

            const sendedMessage = await controllers.SendMessage(roomId, content, user.id);

            res.status(StatusCodes.CREATED).send(sendedMessage);
        } catch (e) {
            next(e);
        }
    },
);

//TODO: check if user is in the room with middlewhere and if room exist
router.get(
    '/room/messages',
    authMiddleware,
    roomExists,
    async (req, res, next) => {
        try {
            const user = req.session.user;
            const { roomId } = req.body;

            if (!user) {
                throw new Error('User not found or not login');
            }

            const message = await controllers.GetMessages(roomId);

            res.status(StatusCodes.OK).send(message);
        } catch (e) {
            next(e);
        }
    },
);

export default router;
