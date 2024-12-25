import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {Learning_plan} from "@prisma/client";
import {CreateLearningPlanDto, UpdateStartYearDto} from "./learning_plan.dto";

@Injectable()
export class LearningPlanService {
    constructor(private prisma_service: PrismaService) {
    }

    getLearningPlans(): Promise<Learning_plan[]> {
        return this.prisma_service.learning_plan.findMany({
            include: {
                speciality: true
            }
        });
    }

    async getLearningPlan(body: CreateLearningPlanDto) {
        return this.prisma_service.learning_plan.findFirst({
            where: {
                speciality_id: body.speciality_id,
                start_study_year: body.start_study_year
            }
        })
    }

    async getLearningPlanByYearAndSpecialityId(body: UpdateStartYearDto) {
        return this.prisma_service.learning_plan.findFirst({
            where: {
                speciality_id: body.speciality_id,
                start_study_year: body.start_study_year
            }
        })
    }

    async create(body: CreateLearningPlanDto) {
        await this.prisma_service.learning_plan.create({
            data: {
                speciality_id: body.speciality_id,
                start_study_year: body.start_study_year
            }
        })
    }

    updateStartYear(body: UpdateStartYearDto) {
        return this.prisma_service.learning_plan.update({
            where: {
                id: body.id
            },
            data: {
                start_study_year: body.start_study_year
            }
        })
    }

    getLearningPlanWithContent(body: { id: number }) {
        return this.prisma_service.learning_plan.findUnique({
            where: {
                id: body.id
            },
            include: {
                speciality: true,
                learning_plan_contents: {
                    include: {
                        discipline: true
                    }
                }
            }
        })
    }

    addContent(body: {
        learning_plan_id: number;
        discipline_id: number;
        number_of_hours: number;
        attestation_type: string;
        semester: number
    }) {
        return this.prisma_service.learning_plan_content.create({
            data: {
                learning_plan_id: body.learning_plan_id,
                discipline_id: body.discipline_id,
                number_of_hours: body.number_of_hours,
                attestation_type: body.attestation_type,
                semester: body.semester
            }
        });
    }

    deleteContent(body: { id: number }) {
        return this.prisma_service.learning_plan_content.delete({
            where: {
                id: body.id
            }
        })
    }

    deleteLearningPlan(body: { id: number }) {
        return this.prisma_service.learning_plan.delete({
            where: {
                id: body.id
            }
        })
    }
}
