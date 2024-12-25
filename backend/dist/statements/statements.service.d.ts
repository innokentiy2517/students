import { PrismaService } from "../prisma/prisma.service";
import { CreateStatementDto, StatementChangeMarkDto } from "./statements.dto";
import { Statements } from "@prisma/client";
export declare class StatementsService {
    private prisma_service;
    constructor(prisma_service: PrismaService);
    create(statement: CreateStatementDto): Promise<void>;
    getActiveStatementsByStudentAndDiscipline(student_id: number, discipline_id: number): Promise<Statements[]>;
    getStatementById(id: number): Promise<Statements>;
    set_mark(body: StatementChangeMarkDto): Promise<void>;
    delete(id: number): Promise<void>;
}
