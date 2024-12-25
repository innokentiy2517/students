import { Learning_plan } from "@prisma/client";
declare class LearningPlanDto implements Learning_plan {
    id: number;
    speciality_id: number;
    start_study_year: number;
}
declare class CreateLearningPlanDto {
    speciality_id: number;
    start_study_year: number;
}
declare class UpdateStartYearDto {
    id: number;
    start_study_year: number;
    speciality_id: number;
}
export { LearningPlanDto, CreateLearningPlanDto, UpdateStartYearDto };
