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
                speciality_id: body.speciality_id,
                group_number: body.group_number,
                group_cipher: body.group_cipher,
                start_study_year: body.start_study_year
            }
        });
    }

    getGroups(): Promise<Groups[]> {
        return this.prismaService.groups.findMany({
            include: {
                speciality: true,
            }
        })
    }

    async update(body: Groups) {
        await this.prismaService.groups.update({
            where: {
                id: body.id
            },
            data: {
                group_number: body.group_number,
                group_cipher: body.group_cipher,
                start_study_year: body.start_study_year,
                speciality_id: body.speciality_id
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
        await this.prismaService.groups.delete({where: {id}})
    }

    async getGroupBySpecialityAndNumber(speciality_id: number, group_number: number) {
        return this.prismaService.groups.findFirst({
            where: {
                speciality_id,
                group_number
            }
        })
    }

    async getGroupByParams(body: CreateGroupDto) {
        return this.prismaService.groups.findFirst({
            where: {
                speciality_id: body.speciality_id,
                group_number: body.group_number,
                start_study_year: body.start_study_year,
                group_cipher: body.group_cipher
            }
        })
    }
}
