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
}
