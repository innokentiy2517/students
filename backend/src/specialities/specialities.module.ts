import { Module } from '@nestjs/common';
import { SpecialitiesController } from './specialities.controller';
import { SpecialitiesService } from './specialities.service';
import {PrismaModule} from "../prisma/prisma.module";

@Module({
  controllers: [SpecialitiesController],
  providers: [SpecialitiesService],
  imports: [PrismaModule]
})
export class SpecialitiesModule {}
