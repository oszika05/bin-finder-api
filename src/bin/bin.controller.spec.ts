import { Test, TestingModule } from '@nestjs/testing';
import { BinController } from './bin.controller';

describe('Bin Controller', () => {
  let controller: BinController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BinController],
    }).compile();

    controller = module.get<BinController>(BinController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
