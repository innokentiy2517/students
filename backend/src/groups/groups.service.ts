import { Injectable } from '@nestjs/common';
import {CreateGroupDto} from "./groups.dto";
import {PrismaService} from "../prisma/prisma.service";
import {Groups} from "@prisma/client";

@Injectable()
export class GroupsService {
    constructor(private prismaService: PrismaService) {}

    async create(body: CreateGroupDto): Promise<void> {
        await this.prismaService.groups.create({
            data: {
                group_number: body.group_number,
                group_cipher: body.group_cipher,
                start_study_year: body.start_study_year
            }
        });
    }

    getGroups(): Promise<Groups[]> {
        return this.prismaService.groups.findMany()
    }

    async update(body: Groups) {
        await this.prismaService.groups.update({
            where: {
                id: body.id
            },
            data: {
                group_number: body.group_number,
                group_cipher: body.group_cipher,
                start_study_year: body.start_study_year
            }
        })
    }

    async getGroup(id: number) {
        return this.prismaService.groups.findUnique({where: {id}})
    }

    //TODO
    async getGroupPerformance(group_id: number) {
        //select all students column, include
    }

    async delete(id: number): Promise<void> {
        await this.prismaService.$transaction(async (tx) => {
            await tx.statements.deleteMany({
                where: {
                    student: {
                        group_id: id
                    }
                }
            });

            await tx.students.deleteMany({
                where: {
                    group_id: id
                }
            });

            await tx.groups.delete({
                where: {
                    id
                }
            })
        })
    }
}
