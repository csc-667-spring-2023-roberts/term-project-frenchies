import {Router} from 'express';
import {StatusCodes} from 'http-status-codes';
import * as controllers from './controllers';
import authMiddleware from '../../middlewares/auth';
import { roomExists } from './middlewares';
import { ApiError } from '../../app.errors';

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

router.get(
    '/room/list',
    async (_, res, next) => {
        try {
            const foundedRooms = await controllers.FindAll();

            res.status(StatusCodes.OK).send(foundedRooms);
        } catch (e) {
            next(e);
        }
    },
);

router.post(
    '/room/start',
    authMiddleware,
    roomExists,
    async (req, res, next) => {
        try {

            const user = req.session.user;
            const { roomId } = req.body;

            if (!user) {
                throw new ApiError(StatusCodes.NOT_FOUND, `User not found`)
            }
            const cards = await controllers.start(roomId);

            res.status(StatusCodes.OK).send(cards);
        } catch (e) {
            next(e);
        }
    },
);

router.post(
    '/room/play',
    authMiddleware,
    roomExists,
    async (req, res, next) => {
        try {

            const user = req.session.user;
            const { roomId, cardId } = req.body;

            if (!user) {
                throw new ApiError(StatusCodes.NOT_FOUND, `User not found`)
            }
            const cards = await controllers.play(roomId, cardId, user.id);

            res.status(StatusCodes.OK).send(cards);
        } catch (e) {
            next(e);
        }
    },
);

router.get(
    '/room/:roomId/cards',
    authMiddleware,
    roomExists,
    async (req, res, next) => {
        try {
            const user = req.session.user;
            const roomId  = parseInt(req.params['roomId'])

            if (!user) {
                throw new ApiError(StatusCodes.NOT_FOUND, `User not found`)
            }

            const isUserInRoom = await controllers.isUserInRoom(user.id, roomId);

            if (!isUserInRoom) {
                throw new ApiError(StatusCodes.BAD_REQUEST, 'User is not in this room');
            }

            const cards = await controllers.myCards(roomId, user.id);

            res.status(StatusCodes.OK).send(cards);
        } catch (e) {
            next(e);
        }
    },
);

router.get(
    '/room/:roomId/infos',
    authMiddleware,
    roomExists,
    async (req, res, next) => {
        try {
            const user = req.session.user;
            const roomId  = parseInt(req.params['roomId'])

            if (!user) {
                throw new ApiError(StatusCodes.NOT_FOUND, `User not found`)
            }

            const isUserInRoom = await controllers.isUserInRoom(user.id, roomId);

            if (!isUserInRoom) {
                throw new ApiError(StatusCodes.BAD_REQUEST, 'User is not in this room');
            }

            const room = await controllers.infosRoom(roomId);

            res.status(StatusCodes.OK).send(room);
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
                throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
            }

            const isUserInRoom = await controllers.isUserInRoom(user.id, roomId);

            if (isUserInRoom) {
                res.status(StatusCodes.OK).send({
                    currentroom_id: roomId,
                    id: 0,
                    user_id: user.id,
                });
                // throw new ApiError(StatusCodes.BAD_REQUEST, 'User is already in this room');
            } else {
                const addedUserToRoom = await controllers.Join(roomId, user.id);
                res.status(StatusCodes.OK).send(addedUserToRoom);
            }
        } catch (e) {
            next(e);
        }
    },
);

router.post(
    '/room/message',
    authMiddleware,
    roomExists,
    async (req, res, next) => {
        try {
            const user = req.session.user;
            const { content, roomId } = req.body;

            if (!user) {
                throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
            }

            const isUserInRoom = await controllers.isUserInRoom(user.id, roomId);

            if (!isUserInRoom) {
                throw new ApiError(StatusCodes.BAD_REQUEST, 'User is not in this room');
            }

            const sentMessage = await controllers.SendMessage(roomId, content, user.id);

            if (!sentMessage) {
                throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to save new message');
            }

            const io = req.app.get('io');

            console.log(`chat-room-${roomId}`);
            io.emit(`chat-room-${roomId}`, {
                newMessage: content,
                senderUsername: `Player ${user.id}`,
            });

            res.status(StatusCodes.CREATED).send(sentMessage);
        } catch (e) {
            next(e);
        }
    },
);

router.get(
    '/room/:roomId/messages',
    authMiddleware,
    roomExists,
    async (req, res, next) => {
        try {
            const user = req.session.user;
            const roomId  = parseInt(req.params['roomId']);

            if (!user) {
                throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
            }

            const isUserInRoom = await controllers.isUserInRoom(user.id, roomId);

            if (!isUserInRoom) {
                throw new ApiError(StatusCodes.BAD_REQUEST, 'User is not in this room');
            }

            const message = await controllers.GetMessages(roomId, user);

            res.status(StatusCodes.OK).send(message);
        } catch (e) {
            next(e);
        }
    },
);

router.get(
    '/room/:roomId/users',
    authMiddleware,
    roomExists,
    async (req, res, next) => {
        try {
            const user = req.session.user;
            const roomId  = parseInt(req.params['roomId']);

            if (!user) {
                throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
            }

            const message = await controllers.GetUsers(roomId);

            res.status(StatusCodes.OK).send(message);
        } catch (e) {
            next(e);
        }
    },
);

export default router;
