import { Module } from '@nestjs/common';
import { BinModule } from './bin/bin.module';

@Module({
  imports: [BinModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
