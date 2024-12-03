import { PrismaService } from "../prisma/prisma.service";
import { CreateDisciplineDto, DisciplinesDto } from "./discipline.dto";
export declare class DisciplineService {
    private prisma_service;
    constructor(prisma_service: PrismaService);
    create(body: CreateDisciplineDto): Promise<void>;
    getDisciplines(): Promise<DisciplinesDto[]>;
    update(body: DisciplinesDto): Promise<void>;
    getDisciplineById(id: number): Promise<{
        name: string;
        id: number;
        number_of_hours: number;
        attestation_type: string;
    }>;
    delete(id: number): Promise<void>;
}
