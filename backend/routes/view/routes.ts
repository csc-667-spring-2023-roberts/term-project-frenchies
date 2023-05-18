import {Router} from 'express';
import crypto from 'crypto';

const router = Router();

router.get(
    '/',
    (req, res) => {
        res.render('root', { title: 'Root page' });
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

const rooms = [
    { id: 1, name: 'Room 1', players: 10, status: 'Waiting for players' },
    { id: 2,  name: 'Room 2', players: 7, status: 'Game in progress' },
];
router.get(
    '/waiting-room',
    (req, res) => {
        res.render('waiting-room', { title: 'Waiting-Room page', rooms: rooms });
    },
);

const room_players = [
    {
        id: '1',
        name: 'Room 1',
        players: [
            { id: '1', name: 'Player 1', isPlaying: false },
            { id: '2', name: 'Player 2', isPlaying: true },
            { id: '3', name: 'Player 3', isPlaying: false },
        ]
    },
    {
        id: '2',
        name: 'Room 2',
        players: [
            { id: '4', name: 'Player 4', isPlaying: true },
            { id: '5', name: 'Player 5', isPlaying: false },
        ]
    },
];

const playerCards = [
    { id: 1, color: 'red', value: '5' },
    { id: 2, color: 'blue', value: 'Skip' },
    { id: 3, color: 'yellow', value: '9' },
    { id: 4, color: 'green', value: 'Reverse' },
    { id: 5, color: 'black', value: '+4' },
];

const currentlyCard = { id: 1, color: 'red', value: '9' };

router.get(
    '/game/:id',
    (req, res) => {
        const roomId = req.params.id;  // Get the room id from the route parameters
        const room = room_players.find(r => r.id === roomId);  // Find the room with this id

        if (room) {
            // If the room was found, render the game page with the room's data
            res.render('game', { room: room, playerCards: playerCards, currentlyCard: currentlyCard });
        } else {
            // If the room was not found, respond with a 404 status
            res.status(404).send('Room not found');
        }
    },
);

export default router;