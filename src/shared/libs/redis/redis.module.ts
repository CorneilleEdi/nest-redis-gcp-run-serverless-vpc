import { Module } from '@nestjs/common';
import { ConfigurationModule } from 'src/shared/configuration';
import { redisProvider } from './redis.provider';
import { RedisService } from './redis.service';

@Module({
    providers: [...redisProvider, RedisService],
    exports: [...redisProvider, RedisService],
    imports: [ConfigurationModule],
})
export class RedisModule {}
