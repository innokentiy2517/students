import { CreateUserDTO } from "./users.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Users } from "@prisma/client";
export declare class UsersService {
    private prisma_service;
    constructor(prisma_service: PrismaService);
    register(body: CreateUserDTO): Promise<Users>;
    checkUsername(login: string): Promise<boolean>;
    getUserByLogin(login: string): Promise<Users>;
}
