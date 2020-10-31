import {Injectable, Query} from '@nestjs/common';
import * as fs from 'fs';
import {InjectRepository} from '@nestjs/typeorm';
import {Bin} from './bin.entity';
import {Between, In, Repository} from 'typeorm';

@Injectable()
export class BinService {
    constructor(
        @InjectRepository(Bin) private readonly binRepository: Repository<Bin>,
    ) {
    }

    async getBins(
        latFrom: number,
        latTo: number,
        longFrom: number,
        longTo: number,
    ): Promise<Bin[]> {
        return await this.binRepository.find({
            relations: ['type'],
            where: {
                lat: Between(latFrom, latTo),
                long: Between(longFrom, longTo),
            },
        });
    }

    async test() {

        const bin = await this.binRepository.findOne({
            relations: ['type'],
            where: {
                id: 1,
            },
        });

        const bins = await this.binRepository.find({
            relations: ['type'],
            where: {
                type: In([{id: 1}, {id: 2}]),
            },
        });

        const test = () => new Promise((resolve, reject) => {
            fs.readFile('/alma', 'utf8', (err, data) => {
                if (err) {
                    return reject(err);
                }

                resolve(data);
            });
        });

        try {
            const data = await test();
        } catch (error) {
            console.error(error);
        }
    }

}

