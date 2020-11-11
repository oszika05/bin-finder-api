import { Module } from '@nestjs/common';
import { BinController } from './bin.controller';
import { BinService } from './bin.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {BinType} from './bin-type.entity';
import {Bin} from './bin.entity';
import {GoogleStrategy} from './google.strategy';
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
  controllers: [BinController],
  providers: [BinService, GoogleStrategy],
  imports: [TypeOrmModule.forFeature([Bin, BinType]), ConfigModule.forRoot()],
})
export class BinModule {}
