import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CONFIGURATIONS } from './shared/configuration';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors();

    // Get services
    const configService = app.get(ConfigService);

    const PORT = configService.get(CONFIGURATIONS.PORT);

    await app.listen(PORT, async () => {
        new Logger('Application').verbose(`Server started ,running and listening on port ${PORT}`);
    });
}
bootstrap();
