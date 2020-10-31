import { Module } from '@nestjs/common';
import { BinController } from './bin.controller';
import { BinService } from './bin.service';

@Module({
  controllers: [BinController],
  providers: [BinService]
})
export class BinModule {}
