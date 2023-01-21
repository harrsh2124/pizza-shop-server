import { Express } from './app/providers/express';
import logger from './app/providers/logger';
import Server from './app/providers/server';

const express = new Express();

Promise.all([express.initializeApp(), express.configureViews()]).then(
    async () => {
        const app = express.app;

        const httpServer = new Server(app);
        httpServer.start();
        httpServer.startSocketServer();
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
