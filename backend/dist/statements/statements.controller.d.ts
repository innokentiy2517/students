import { StatementsService } from "./statements.service";
import { CreateStatementDto, StatementChangeMarkDto } from "./statements.dto";
import { RequestWithUser } from "../auth/request.dto";
export declare class StatementsController {
    private statements_service;
    constructor(statements_service: StatementsService);
    create(req: RequestWithUser, body: CreateStatementDto): Promise<void>;
    set_mark(req: RequestWithUser, body: StatementChangeMarkDto): Promise<void>;
    delete(req: RequestWithUser, body: {
        id: number;
    }): Promise<void>;
    get(): Promise<({
        learning_plan_content: {
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
        };
        student: {
            group: {
                id: number;
                speciality_id: number;
                start_study_year: number;
                group_number: number;
                group_cipher: string;
            };
        } & {
            name: string;
            id: number;
            surname: string;
            middle_name: string;
            date_of_birth: Date;
            gender: string;
            group_id: number;
            document_number: string;
        };
    } & {
        id: number;
        date_of_issue: Date;
        mark: number | null;
        student_id: number;
        learning_plan_content_id: number;
    })[]>;
    get_students_personal_card(req: RequestWithUser, body: {
        document_number: string;
    }): Promise<({
        learning_plan_content: {
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
        };
        student: {
            group: {
                speciality: {
                    name: string;
                    id: number;
                };
            } & {
                id: number;
                speciality_id: number;
                start_study_year: number;
                group_number: number;
                group_cipher: string;
            };
        } & {
            name: string;
            id: number;
            surname: string;
            middle_name: string;
            date_of_birth: Date;
            gender: string;
            group_id: number;
            document_number: string;
        };
    } & {
        id: number;
        date_of_issue: Date;
        mark: number | null;
        student_id: number;
        learning_plan_content_id: number;
    })[]>;
}
