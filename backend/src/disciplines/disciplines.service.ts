import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {CreateDisciplineDto, DisciplinesDto} from "./disciplines.dto";

@Injectable()
export class DisciplinesService {
    constructor(private prisma_service: PrismaService) {
    }
    async create(body: CreateDisciplineDto): Promise<void> {
        await this.prisma_service.disciplines.create({data: body})
    }

    getDisciplines(): Promise<DisciplinesDto[]> {
        return this.prisma_service.disciplines.findMany();
    }

    async update(body: DisciplinesDto) {
        await this.prisma_service.disciplines.update({where: {id: body.id}, data: body})
    }

    async getDisciplineById(id: number) {
        return this.prisma_service.disciplines.findUnique({where: {id}})
    }

    async delete(id: number) {
        await this.prisma_service.disciplines.delete({where: {id}})
    }
}
