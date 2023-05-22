import {Router} from 'express';
import {torm} from '../../database/torm';

const router = Router();

router.get(
    '/',
    (req, res) => {
        res.render('waiting-room', { title: 'Hub page' });
    },
);

router.get(
    '/register',
    (req, res) => {
        res.render('register', { title: 'Register page' });
    },
);

router.get(
    '/login',
    (req, res) => {
        res.render('login', { title: 'Login page' });
    },
);

router.get(
    '/game/:id',
    async (req, res) => {
        const roomId = req.params.id;  // Get the room id from the route parameters
        const room = await torm.room.FindFirst({
            where: {
                room_id: parseInt(roomId)
            }
        });  // Find the room with this id

        const playersInRoom = await torm.userToRoom.FindAll({
            where: {
                room_id: parseInt(roomId),
            }
        });

        if (room && playersInRoom) {
            // If the room was found, render the game page with the room's data
            res.render('game');
        } else {
            // If the room was not found, respond with a 404 status
            res.status(404).send('Room not found');
        }
    },
);

export default router;