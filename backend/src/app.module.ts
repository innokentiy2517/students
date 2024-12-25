import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';
import { PrismaModule } from './prisma/prisma.module';
import { StudentsModule } from './students/students.module';
import { DisciplinesModule } from './disciplines/disciplines.module';
import { StatementsModule } from './statements/statements.module';
import { SpecialitiesModule } from './specialities/specialities.module';
import { LearningPlanModule } from './learning_plan/learning_plan.module';

@Module({
  imports: [UsersModule, GroupsModule, PrismaModule, StudentsModule, DisciplinesModule, StatementsModule, SpecialitiesModule, LearningPlanModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
