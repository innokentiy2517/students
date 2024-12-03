import { Injectable } from '@nestjs/common';
import {CreateUserDTO, LoginDTO} from "./users.dto";
import {PrismaService} from "../prisma/prisma.service";
import {Users} from "@prisma/client";
import {createHash} from "node:crypto";

@Injectable()
export class UsersService {
    constructor(private prisma_service: PrismaService) {
    }

    async register(body: CreateUserDTO): Promise<Users> {
        const hashed_password = createHash('sha256').update(body.password).digest('hex');
        return this.prisma_service.users.create({
            data: {
                login: body.login,
                password: hashed_password,
                role: body.role
            }
        });
    }

    async checkUsername(login: string) {
        const user = await this.prisma_service.users.findFirst({
            where: {
                login
            }
        });

        return !!user
    }

    async getUserByLogin(login: string): Promise<Users> {
        return this.prisma_service.users.findFirst({
            where: {
                login
            }
        })
    }
}
