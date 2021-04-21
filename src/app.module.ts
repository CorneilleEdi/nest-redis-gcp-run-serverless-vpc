import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './shared/configuration';
import { RedisModule } from './shared/libs/redis';

@Module({
    imports: [ConfigurationModule, RedisModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
