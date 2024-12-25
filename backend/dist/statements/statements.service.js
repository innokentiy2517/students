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
exports.StatementsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let StatementsService = class StatementsService {
    constructor(prisma_service) {
        this.prisma_service = prisma_service;
    }
    async create(statement) {
        await this.prisma_service.statements.create({ data: {
                student_id: statement.student_id,
                learning_plan_content_id: statement.discipline_id,
                date_of_issue: statement.date_of_issue,
                mark: null
            } });
    }
    async getActiveStatementsByStudentAndDiscipline(student_id, discipline_id) {
        return this.prisma_service.statements.findMany({
            where: {
                student_id,
                learning_plan_content_id: discipline_id,
                mark: null
            }
        });
    }
    async getStatementById(id) {
        return this.prisma_service.statements.findFirst({ where: { id } });
    }
    async set_mark(body) {
        await this.prisma_service.statements.update({
            where: {
                id: body.id
            },
            data: {
                mark: body.mark
            }
        });
    }
    async delete(id) {
        await this.prisma_service.statements.delete({ where: { id } });
    }
    async get() {
        return this.prisma_service.statements.findMany({
            include: {
                student: {
                    include: {
                        group: true
                    }
                },
                learning_plan_content: {
                    include: {
                        discipline: true
                    }
                }
            }
        });
    }
    get_students_personal_card(student_document_number) {
        return this.prisma_service.statements.findMany({
            where: {
                student: {
                    document_number: student_document_number
                }
            },
            include: {
                student: {
                    include: {
                        group: {
                            include: {
                                speciality: true
                            }
                        }
                    }
                },
                learning_plan_content: {
                    include: {
                        discipline: true
                    }
                }
            }
        });
    }
};
exports.StatementsService = StatementsService;
exports.StatementsService = StatementsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StatementsService);
//# sourceMappingURL=statements.service.js.map