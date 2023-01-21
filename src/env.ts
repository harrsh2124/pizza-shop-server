import dotenv from 'dotenv';
import { getOsEnv, getOsEnvOptional } from './libs/env';

dotenv.config();

/**
 * Environment variables
 */
const env = {
    node: getOsEnvOptional('APP_ENV') || 'local',

    app: {
        port: getOsEnv('APP_PORT'),
        host: getOsEnv('APP_URL') || 'http://localhost:8000',
        root_dir: getOsEnv('APP_ENV') !== 'local' ? 'dist' : 'src',
        user_uploaded_content_path: getOsEnv('USER_UPLOADED_CONTENT_PATH'),
        api_prefix: getOsEnv('API_PREFIX'),
    },

    cors: {
        urls: getOsEnv('CORS_AVAILABLE_LINKS').split(','),
    },
};

export default env;
