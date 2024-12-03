import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import {PrismaModule} from "../prisma/prisma.module";

@Module({
  providers: [StudentsService],
  controllers: [StudentsController],
  imports: [PrismaModule]
})
export class StudentsModule {}
