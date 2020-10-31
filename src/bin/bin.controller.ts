import {BadRequestException, Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {BinService} from './bin.service';
import {Bin} from './bin.entity';
import {CreateBinDto} from './dto/create-bin.dto';
import {BinType} from './bin-type.entity';

@Controller('bin')
export class BinController {
    constructor(private readonly service: BinService) {
    }

    @Get('/')
    async getBins(
        @Query('from-latitude') latFrom: number,
        @Query('to-latitude') latTo: number,
        @Query('from-longitude') longFrom: number,
        @Query('to-longitude') longTo: number,
        @Query('type') types: number[],
    ): Promise<Bin[]> {
        const typeIds = types || [];

        if (!latFrom || !latTo || !longFrom || !longTo) {
            throw new BadRequestException();
        }

        // TODO typeIds filter

        return this.service.getBins(latFrom, latTo, longFrom, longTo);
    }

    @Post('/')
    async createOne(@Body() bin: CreateBinDto): Promise<void> {

    }

    @Post('/:id/report')
    async reportBin(@Param('id') id: number): Promise<void> {

    }

    @Get('/types')
    async getTypes(): Promise<BinType[]> {
        return [];
    }

}
