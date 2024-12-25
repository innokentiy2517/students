import { LearningPlanService } from "./learning_plan.service";
import { RequestWithUser } from "../auth/request.dto";
import { CreateLearningPlanDto, UpdateStartYearDto } from "./learning_plan.dto";
export declare class LearningPlanController {
    private learning_plan_service;
    constructor(learning_plan_service: LearningPlanService);
    getLearningPlans(req: RequestWithUser): Promise<{
        id: number;
        start_study_year: number;
        speciality_id: number;
    }[]>;
    getLearningPlan(req: RequestWithUser, body: {
        id: number;
    }): Promise<{
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
    }>;
    getLearningPlanContentsForGroup(body: {
        speciality_id: number;
        start_study_year: number;
    }): Promise<({
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
    })[]>;
    create(req: RequestWithUser, body: CreateLearningPlanDto): Promise<void>;
    addContent(req: RequestWithUser, body: {
        learning_plan_id: number;
        discipline_id: number;
        number_of_hours: number;
        attestation_type: string;
        semester: number;
    }): Promise<{
        id: number;
        discipline_id: number;
        learning_plan_id: number;
        number_of_hours: number;
        attestation_type: string;
        semester: number;
    }>;
    update_start_year(body: UpdateStartYearDto, req: RequestWithUser): Promise<{
        id: number;
        start_study_year: number;
        speciality_id: number;
    }>;
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
