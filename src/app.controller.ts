import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    async getAllValues() {
        return await this.appService.getValues();
    }

    @Post()
    async insert() {
        return await this.appService.insert();
    }
}
