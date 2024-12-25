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
                group_number: number;
                group_cipher: string;
                start_study_year: number;
                speciality_id: number;
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
        student_id: number;
        date_of_issue: Date;
        mark: number | null;
        learning_plan_content_id: number;
    })[]>;
}
