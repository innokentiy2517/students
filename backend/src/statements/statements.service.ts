import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {CreateStatementDto, StatementChangeMarkDto} from "./statements.dto";
import {Statements} from "@prisma/client";

@Injectable()
export class StatementsService {
    constructor(private prisma_service: PrismaService) {
    }

    async create(statement: CreateStatementDto) {
        await this.prisma_service.statements.create({data: {
            student_id: statement.student_id,
            learning_plan_content_id: statement.discipline_id,
            date_of_issue: statement.date_of_issue,
            mark: null
        }});
    }

    async getActiveStatementsByStudentAndDiscipline(student_id: number, discipline_id: number): Promise<Statements[]> {
        return this.prisma_service.statements.findMany({
            where: {
                student_id,
                learning_plan_content_id: discipline_id,
                mark: null
            }
        });
    }

    async getStatementById(id: number): Promise<Statements> {
        return this.prisma_service.statements.findFirst({where: {id}});
    }

    async set_mark(body: StatementChangeMarkDto) {
        await this.prisma_service.statements.update({
            where: {
                id: body.id
            },
            data: {
                mark: body.mark
            }
        })
    }

    async delete(id: number): Promise<void> {
        await this.prisma_service.statements.delete({where: {id}})
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
}
