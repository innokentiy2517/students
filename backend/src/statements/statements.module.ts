import { Module } from '@nestjs/common';
import { StatementsService } from './statements.service';
import { StatementsController } from './statements.controller';
import {PrismaModule} from "../prisma/prisma.module";

@Module({
  providers: [StatementsService],
  controllers: [StatementsController],
  imports: [PrismaModule]
})
export class StatementsModule {}
