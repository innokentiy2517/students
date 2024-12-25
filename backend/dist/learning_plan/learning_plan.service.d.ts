import { PrismaService } from "../prisma/prisma.service";
import { Learning_plan } from "@prisma/client";
import { CreateLearningPlanDto, UpdateStartYearDto } from "./learning_plan.dto";
export declare class LearningPlanService {
    private prisma_service;
    constructor(prisma_service: PrismaService);
    getLearningPlans(): Promise<Learning_plan[]>;
    getLearningPlan(body: CreateLearningPlanDto): Promise<{
        id: number;
        start_study_year: number;
        speciality_id: number;
    }>;
    getLearningPlanByYearAndSpecialityId(body: UpdateStartYearDto): Promise<{
        id: number;
        start_study_year: number;
        speciality_id: number;
    }>;
    create(body: CreateLearningPlanDto): Promise<void>;
    updateStartYear(body: UpdateStartYearDto): import(".prisma/client").Prisma.Prisma__Learning_planClient<{
        id: number;
        start_study_year: number;
        speciality_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    getLearningPlanWithContent(body: {
        id: number;
    }): import(".prisma/client").Prisma.Prisma__Learning_planClient<{
        speciality: {
            name: string;
            id: number;
        };
        learning_plan_contents: ({
            discipline: {
                name: string;
                id: number;
            };
        } & {
            id: number;
            discipline_id: number;
            learning_plan_id: number;
            number_of_hours: number;
            attestation_type: string;
            semester: number;
        })[];
    } & {
        id: number;
        start_study_year: number;
        speciality_id: number;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    addContent(body: {
        learning_plan_id: number;
        discipline_id: number;
        number_of_hours: number;
        attestation_type: string;
        semester: number;
    }): import(".prisma/client").Prisma.Prisma__Learning_plan_contentClient<{
        id: number;
        discipline_id: number;
        learning_plan_id: number;
        number_of_hours: number;
        attestation_type: string;
        semester: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    deleteContent(body: {
        id: number;
    }): import(".prisma/client").Prisma.Prisma__Learning_plan_contentClient<{
        id: number;
        discipline_id: number;
        learning_plan_id: number;
        number_of_hours: number;
        attestation_type: string;
        semester: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    deleteLearningPlan(body: {
        id: number;
    }): import(".prisma/client").Prisma.Prisma__Learning_planClient<{
        id: number;
        start_study_year: number;
        speciality_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
