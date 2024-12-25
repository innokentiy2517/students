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
    get(): Promise<({
        student: {
            group: {
                id: number;
                group_number: number;
                group_cipher: string;
                start_study_year: number;
                speciality_id: number;
            };
        } & {
            id: number;
            name: string;
            surname: string;
            middle_name: string;
            date_of_birth: Date;
            gender: string;
            group_id: number;
            document_number: string;
        };
        learning_plan_content: {
            discipline: {
                id: number;
                name: string;
            };
        } & {
            id: number;
            discipline_id: number;
            learning_plan_id: number;
            number_of_hours: number;
            attestation_type: string;
            semester: number;
        };
    } & {
        id: number;
        date_of_issue: Date;
        mark: number | null;
        student_id: number;
        learning_plan_content_id: number;
    })[]>;
    get_students_personal_card(student_document_number: string): import(".prisma/client").Prisma.PrismaPromise<({
        student: {
            group: {
                speciality: {
                    id: number;
                    name: string;
                };
            } & {
                id: number;
                group_number: number;
                group_cipher: string;
                start_study_year: number;
                speciality_id: number;
            };
        } & {
            id: number;
            name: string;
            surname: string;
            middle_name: string;
            date_of_birth: Date;
            gender: string;
            group_id: number;
            document_number: string;
        };
        learning_plan_content: {
            discipline: {
                id: number;
                name: string;
            };
        } & {
            id: number;
            discipline_id: number;
            learning_plan_id: number;
            number_of_hours: number;
            attestation_type: string;
            semester: number;
        };
    } & {
        id: number;
        date_of_issue: Date;
        mark: number | null;
        student_id: number;
        learning_plan_content_id: number;
    })[]>;
}
