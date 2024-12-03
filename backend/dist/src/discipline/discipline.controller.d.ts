import { DisciplineService } from "./discipline.service";
import { CreateDisciplineDto, DisciplinesDto } from "./discipline.dto";
import { RequestWithUser } from "../auth/request.dto";
export declare class DisciplineController {
    private discipline_service;
    constructor(discipline_service: DisciplineService);
    create(req: Request & {
        user: {
            login: string;
            role: string;
        };
    }, body: CreateDisciplineDto): Promise<void>;
    getDisciplines(): Promise<DisciplinesDto[]>;
    update(req: RequestWithUser, body: DisciplinesDto): Promise<void>;
    delete(req: RequestWithUser, body: {
        id: number;
    }): Promise<void>;
}
