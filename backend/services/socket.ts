import http from 'http';
import {Server} from 'socket.io';
import {Express} from 'express';
import session from '../app.session';
import logger from './logger';

const initSockets = (app: Express) => {
    const server = http.createServer(app);
    const io = new Server(server);

    io.engine.use(session);

    io.on('connection', (_socket) => {
        logger.info('socket connected');
    });

    app.set('io', io);

    return server;
};

export default initSockets;