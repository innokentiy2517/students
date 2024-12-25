import { Test, TestingModule } from '@nestjs/testing';
import { DisciplinesController } from './disciplines.controller';

describe('DisciplineController', () => {
  let controller: DisciplinesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DisciplinesController],
    }).compile();

    controller = module.get<DisciplinesController>(DisciplinesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
