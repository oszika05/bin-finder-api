import {BadRequestException, Body, Controller, Get, Param, Post, Query, Req} from '@nestjs/common';
import {BinService} from './bin.service';
import {Bin} from './bin.entity';
import {CreateBinDto} from './dto/create-bin.dto';
import {BinType} from './bin-type.entity';
import { Request } from 'express';
import {BinDto} from "./dto/bin.dto";

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
    ): Promise<BinDto[]> {
        if (types && !Array.isArray(types)) {
            types = [types];
        }

        const typeIDs = types || null;

        if (!latFrom || !latTo || !longFrom || !longTo) {
            throw new BadRequestException();
        }

        return this.service.getBins(latFrom, latTo, longFrom, longTo, typeIDs);
        
    }

    @Post('/')
    async createOne(@Body() bin: CreateBinDto): Promise<void> {
        await this.service.addBin(bin.typeId, bin.lat, bin.long);
    }

    @Post('/:id/report')
    async reportBin(@Param('id') id: number, @Req() req:Request): Promise<void> {
        this.service.deleteBin(id, req.body.reportedBy);
    }

    @Get('/types')
    async getTypes(): Promise<BinType[]> {
        return await this.service.getBinTypes();
    }

}
