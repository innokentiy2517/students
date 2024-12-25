import { PrismaService } from "../prisma/prisma.service";
import { Specialities } from "@prisma/client";
import { CreateSpecialityDto, UpdateSpecialityDto } from "./specialities.dto";
export declare class SpecialitiesService {
    private prisma_service;
    constructor(prisma_service: PrismaService);
    getSpecialities(): Promise<Specialities[]>;
    create(body: CreateSpecialityDto): Promise<void>;
    getSpecialityByName(name: string): Promise<Specialities>;
    updateById(body: UpdateSpecialityDto): Promise<Specialities>;
    delete(id: number): import(".prisma/client").Prisma.Prisma__SpecialitiesClient<{
        name: string;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
