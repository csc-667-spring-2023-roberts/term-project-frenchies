import env from 'env-var';

export const ServerConfiguration = {
    port: env.get('BACKEND_SERVER_PORT').required(true).asPortNumber(),
    mode: env.get('NODE_ENV').asString(),
    sessionSecret: env.get('BACKEND_SERVER_SESSION_SECRET').required(true).asString(),
    whitelist: env.get('BACKEND_SERVER_AUTHORIZED_CORS_DOMAINS').required(true).asArray(',')
};

export const DatabaseConfiguration = {
    url: env.get('BACKEND_DATABASE_URL').required(true).asUrlString(),
};
