import { CreateGroupDto } from "./groups.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Groups } from "@prisma/client";
export declare class GroupsService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(body: CreateGroupDto): Promise<void>;
    getGroups(): Promise<Groups[]>;
    update(body: Groups): Promise<void>;
    getGroup(id: number): Promise<{
        id: number;
        group_number: number;
        group_cipher: string;
        start_study_year: number;
    }>;
    getGroupPerformance(group_id: number): Promise<void>;
    delete(id: number): Promise<void>;
}
