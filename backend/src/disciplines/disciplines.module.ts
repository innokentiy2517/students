import { Module } from '@nestjs/common';
import { DisciplinesService } from './disciplines.service';
import { DisciplinesController } from './disciplines.controller';
import {PrismaModule} from "../prisma/prisma.module";

@Module({
  providers: [DisciplinesService],
  controllers: [DisciplinesController],
  imports: [PrismaModule]
})
export class DisciplinesModule {}
