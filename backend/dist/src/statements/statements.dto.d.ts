import { Statements } from "@prisma/client";
declare class StatementsDto implements Statements {
    id: number;
    date_of_issue: Date;
    mark: number | null;
    student_id: number;
    discipline_id: number;
}
declare class CreateStatementDto {
    student_id: number;
    discipline_id: number;
    date_of_issue: Date;
}
declare class StatementChangeMarkDto {
    mark: number;
    id: number;
}
export { StatementsDto, CreateStatementDto, StatementChangeMarkDto };
