import Express from './providers/express';
import logger from './providers/logger';
import Server from './providers/server';

const express = Express();

Promise.all([express.initializeApp(), express.configureViews()]).then(
    async () => {
        const app = express.app;

        const httpServer = Server(app);
        await httpServer.start();
        await httpServer.startSocketServer();
    }
);

process.on('uncaughtException', (err) => {
    logger.error(err);
    process.exit(1);
});

process.on('SIGTERM', async () => {
    logger.debug('SIGTERM signal received: closing HTTP server');
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    logger.error(err);
    process.exit(1);
});
