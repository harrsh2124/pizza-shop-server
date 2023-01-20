import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import env from '../../env';

export class Express {
    app: Application;

    constructor() {
        this.app = express();
    }

    initializeApp = () => {
        this.app.use(
            cors({
                origin: '*',
            })
        );
        this.app.use(express.json());
        this.app.use(
            bodyParser.urlencoded({
                extended: true,
            })
        );
        this.app.use(express.static(env.app.root_dir + '/public'));
        this.app.use(
            env.app.user_uploaded_content_path,
            express.static(env.app.root_dir + '/storage/uploads/')
        );
        this.app.use(helmet());
        this.app.use(compression());
        this.app.disable('x-powered-by');

        const PORT = env.app.port;
        this.app.set('port', PORT);
    };

    configureViews = () => {
        this.app.set('view engine', 'hbs');
        this.app.set('views', env.app.root_dir + '/views');
    };
}
