import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as faker from 'faker';
import { WrappedNodeRedisClient } from 'handy-redis';
import { REDIS } from './shared/utils/constants/providers.constant';
@Injectable()
export class AppService {
    constructor(@Inject(REDIS) private redisClient: WrappedNodeRedisClient) {}
    async getValues() {
        const keys = await this.redisClient.keys('*');

        const ops = [];
        keys.map((key) => {
            ops.push(this.redisClient.get(key));
        });

        const values = await Promise.all(ops);

        const result = keys.map((key, index) => {
            return { key, value: values[index] };
        });

        return result;
    }

    async insert() {
        const uuid = faker.datatype.uuid();
        const name = faker.name.findName();

        try {
            await this.redisClient.set(uuid, name);
        } catch (error) {
            throw new InternalServerErrorException();
        }

        return { uuid, name };
    }
}
