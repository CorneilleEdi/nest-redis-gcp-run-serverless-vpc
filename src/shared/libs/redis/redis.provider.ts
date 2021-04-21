import { Logger, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createNodeRedisClient, WrappedNodeRedisClient } from 'handy-redis';
import { CONFIGURATIONS } from '../../configuration';
import { REDIS } from '../../utils/constants/providers.constant';

export const redisProvider: Provider[] = [
    {
        provide: REDIS,
        useFactory: async (configService: ConfigService): Promise<WrappedNodeRedisClient> => {
            const logger: Logger = new Logger(REDIS);
            try {
                const client = createNodeRedisClient({
                    host: configService.get(CONFIGURATIONS.REDIS_HOST),
                    port: configService.get(CONFIGURATIONS.REDIS_PORT),
                    password: configService.get(CONFIGURATIONS.REDIS_PASSWORD),
                    db: configService.get(CONFIGURATIONS.REDIS_DATABASE),
                });

                logger.verbose(`Connected to redis`);

                return client;
            } catch (error) {
                logger.error('Redis connection error', error);
                throw error;
            }
        },
        inject: [ConfigService],
    },
];
