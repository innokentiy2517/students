"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearningPlanService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let LearningPlanService = class LearningPlanService {
    constructor(prisma_service) {
        this.prisma_service = prisma_service;
    }
    getLearningPlans() {
        return this.prisma_service.learning_plan.findMany({
            include: {
                speciality: true,
                learning_plan_contents: {
                    include: {
                        discipline: true
                    }
                }
            }
        });
    }
    async getLearningPlan(body) {
        return this.prisma_service.learning_plan.findFirst({
            where: {
                speciality_id: body.speciality_id,
                start_study_year: body.start_study_year
            }
        });
    }
    async getLearningPlanByYearAndSpecialityId(body) {
        return this.prisma_service.learning_plan.findFirst({
            where: {
                speciality_id: body.speciality_id,
                start_study_year: body.start_study_year
            }
        });
    }
    async create(body) {
        await this.prisma_service.learning_plan.create({
            data: {
                speciality_id: body.speciality_id,
                start_study_year: body.start_study_year
            }
        });
    }
    updateStartYear(body) {
        return this.prisma_service.learning_plan.update({
            where: {
                id: body.id
            },
            data: {
                start_study_year: body.start_study_year
            }
        });
    }
    getLearningPlanWithContent(body) {
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
        });
    }
    addContent(body) {
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
    deleteContent(body) {
        return this.prisma_service.learning_plan_content.delete({
            where: {
                id: body.id
            }
        });
    }
    deleteLearningPlan(body) {
        return this.prisma_service.learning_plan.delete({
            where: {
                id: body.id
            }
        });
    }
    getLearningPlanForGroup(body) {
        return this.prisma_service.learning_plan.findMany({
            where: {
                speciality_id: body.speciality_id,
                start_study_year: body.start_study_year
            },
            include: {
                learning_plan_contents: {
                    include: {
                        discipline: true
                    }
                }
            }
        });
    }
};
exports.LearningPlanService = LearningPlanService;
exports.LearningPlanService = LearningPlanService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LearningPlanService);
//# sourceMappingURL=learning_plan.service.js.map