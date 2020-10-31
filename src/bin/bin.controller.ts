import {Controller, Get, Post} from '@nestjs/common';
import {BinService} from './bin.service';

@Controller('bin')
export class BinController {
    constructor(private readonly service: BinService) {
    }

    @Get('/')
    getAll(): string {
        return 'test';
    }

    @Post()
    create() {

    }

}
