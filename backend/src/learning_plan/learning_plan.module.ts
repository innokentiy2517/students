import { Module } from '@nestjs/common';
import { LearningPlanController } from './learning_plan.controller';
import { LearningPlanService } from './learning_plan.service';
import {PrismaModule} from "../prisma/prisma.module";

@Module({
  controllers: [LearningPlanController],
  providers: [LearningPlanService],
  imports: [PrismaModule]
})
export class LearningPlanModule {}
