import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {Specialities} from "@prisma/client";
import {CreateSpecialityDto, UpdateSpecialityDto} from "./specialities.dto";

@Injectable()
export class SpecialitiesService {
    constructor(private prisma_service: PrismaService) {
    }

    getSpecialities(): Promise<Specialities[]> {
        return this.prisma_service.specialities.findMany({
            orderBy: {
                id: 'asc'
            }
        });
    }

    async create(body: CreateSpecialityDto): Promise<void> {
        await this.prisma_service.specialities.create({
            data: {
                name: body.name
            }
        });
    }

    async getSpecialityByName(name: string): Promise<Specialities> {
        return this.prisma_service.specialities.findFirst({
            where: {
                name
            }
        })
    }

    updateById(body: UpdateSpecialityDto): Promise<Specialities> {
        return this.prisma_service.specialities.update({
            where: {
                id: body.id
            },
            data: {
                name: body.name
            }
        })
    }

    delete(id: number) {
        return this.prisma_service.specialities.delete({
            where: {
                id
            }
        })
    }
}
