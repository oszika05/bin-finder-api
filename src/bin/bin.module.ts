import { Module } from '@nestjs/common';
import { BinController } from './bin.controller';
import { BinService } from './bin.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {BinType} from './bin-type.entity';
import {User} from '../user/user.entity';
import {Bin} from './bin.entity';

@Module({
  controllers: [BinController],
  providers: [BinService],
  imports: [TypeOrmModule.forFeature([Bin, BinType, User])],
})
export class BinModule {}
