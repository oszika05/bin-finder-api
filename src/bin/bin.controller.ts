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
        const typeIDs = types || null;

        if (!latFrom || !latTo || !longFrom || !longTo) {
            throw new BadRequestException();
        }

        return this.service.getBins(latFrom, latTo, longFrom, longTo, typeIDs);
        
    }

    @Post('/')
    async createOne(@Body() bin: CreateBinDto): Promise<void> {
        this.service.addBin(bin.typeId,bin.lat,bin.long);
    }

    @Post('/:id/report')
    async reportBin(@Param('id') id: number): Promise<void> {
        this.service.deleteBin(id);
    }

    @Get('/types')
    async getTypes(): Promise<BinType[]> {
        return this.service.getBinTypes();
    }

}
