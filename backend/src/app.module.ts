import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';
import { PrismaModule } from './prisma/prisma.module';
import { StudentsModule } from './students/students.module';
import { DisciplineModule } from './discipline/discipline.module';
import { StatementsModule } from './statements/statements.module';

@Module({
  imports: [UsersModule, GroupsModule, PrismaModule, StudentsModule, DisciplineModule, StatementsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
