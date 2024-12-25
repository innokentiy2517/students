import { Test, TestingModule } from '@nestjs/testing';
import { LearningPlanService } from './learning_plan.service';

describe('LearningPlanService', () => {
  let service: LearningPlanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LearningPlanService],
    }).compile();

    service = module.get<LearningPlanService>(LearningPlanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
