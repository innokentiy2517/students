import { PrismaService } from "../prisma/prisma.service";
import { CreateDisciplineDto, DisciplinesDto } from "./disciplines.dto";
export declare class DisciplinesService {
    private prisma_service;
    constructor(prisma_service: PrismaService);
    create(body: CreateDisciplineDto): Promise<void>;
    getDisciplines(): Promise<DisciplinesDto[]>;
    update(body: DisciplinesDto): Promise<void>;
    getDisciplineById(id: number): Promise<{
        name: string;
        id: number;
    }>;
    delete(id: number): Promise<void>;
}
