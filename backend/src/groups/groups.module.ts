import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import {PrismaModule} from "../prisma/prisma.module";

@Module({
  providers: [GroupsService],
  controllers: [GroupsController],
  imports: [PrismaModule]
})
export class GroupsModule {}
