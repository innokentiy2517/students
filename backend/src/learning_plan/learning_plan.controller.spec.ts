import { Test, TestingModule } from '@nestjs/testing';
import { LearningPlanController } from './learning_plan.controller';

describe('LearningPlanController', () => {
  let controller: LearningPlanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LearningPlanController],
    }).compile();

    controller = module.get<LearningPlanController>(LearningPlanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
