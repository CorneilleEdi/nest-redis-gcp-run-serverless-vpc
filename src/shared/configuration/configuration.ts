// Some Enums to access easily the envs
export enum CONFIGURATIONS {
    // Configurations
    PORT = 'port',
    REDIS_HOST = 'redis.host',
    REDIS_PORT = 'redis.port',
    REDIS_PASSWORD = 'redis.password',
    REDIS_DATABASE = 'redis.database',
}

export const configurations = () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    redis: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: process.env.REDIS_PORT || 6379,
        password: process.env.REDIS_PASSWORD || '',
        database: parseInt(process.env.REDIS_DATABASE, 10) || 0,
    },
});
