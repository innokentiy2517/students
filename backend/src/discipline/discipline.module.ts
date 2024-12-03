import { Module } from '@nestjs/common';
import { DisciplineService } from './discipline.service';
import { DisciplineController } from './discipline.controller';
import {PrismaModule} from "../prisma/prisma.module";

@Module({
  providers: [DisciplineService],
  controllers: [DisciplineController],
  imports: [PrismaModule]
})
export class DisciplineModule {}
