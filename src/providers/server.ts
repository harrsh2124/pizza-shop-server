import { Application } from 'express';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import env from '../env';
import sendPong from '../socket/sendPong';
import logger from './logger';

export let socket: SocketServer | null = null;

const Server = (app: Application) => {
    const server = http.createServer(app);
    const io = new SocketServer(server);

    /**
     *  Runs the HTTP server
     */
    const start = async () => {
        server.listen(env.app.port);
        logger.info('Server Listening on port:' + env.app.port);
        server.on('error', onError);
    };

    /**
     *  Runs the Socket server
     */
    const startSocketServer = async () => {
        socket = io.on('connection', (socket) => {
            logger.info(`Socket ID ${socket.id} is connected...`);

            sendPong();

            socket.on('disconnect', (reason) => {
                logger.info('Socket disconnected...');
                logger.info(`Reason is -----> ${reason}...`);
            });

            return socket;
        });
    };

    /**
     * Event listener for HTTP server "error" event.
     */
    const onError = async (error: any) => {
        if (error.syscall !== 'listen') {
            throw error;
        }

        var bind =
            typeof env.app.port === 'string'
                ? 'Pipe ' + env.app.port
                : 'Port ' + env.app.port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                logger.fatal(bind + ' requires elevated privileges');
                process.exit(1);

            case 'EADDRINUSE':
                logger.fatal(bind + ' is already in use');
                process.exit(1);

            default:
                throw error;
        }
    };

    return {
        start,
        startSocketServer,
    };
};

export default Server;
