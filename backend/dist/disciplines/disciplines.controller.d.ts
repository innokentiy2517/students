import { DisciplinesService } from "./disciplines.service";
import { CreateDisciplineDto, DisciplinesDto } from "./disciplines.dto";
import { RequestWithUser } from "../auth/request.dto";
export declare class DisciplinesController {
    private discipline_service;
    constructor(discipline_service: DisciplinesService);
    create(req: RequestWithUser, body: CreateDisciplineDto): Promise<void>;
    getDisciplines(): Promise<DisciplinesDto[]>;
    update(req: RequestWithUser, body: DisciplinesDto): Promise<void>;
    delete(req: RequestWithUser, body: {
        id: number;
    }): Promise<void>;
}
