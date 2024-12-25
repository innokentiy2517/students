import {Learning_plan} from "@prisma/client";
import {ApiProperty} from "@nestjs/swagger";

class LearningPlanDto implements Learning_plan {
    @ApiProperty()
    id: number;

    @ApiProperty()
    speciality_id: number;

    @ApiProperty()
    start_study_year: number;
}

class CreateLearningPlanDto {
    @ApiProperty()
    speciality_id: number;

    @ApiProperty()
    start_study_year: number;
}

class UpdateStartYearDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    start_study_year: number;

    @ApiProperty()
    speciality_id: number;
}

export {LearningPlanDto, CreateLearningPlanDto, UpdateStartYearDto}