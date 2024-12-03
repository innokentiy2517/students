import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {CreateStudentDto} from "./students.dto";

@Injectable()
export class StudentsService {
    constructor(private prisma_service: PrismaService) {
    }
    async create(body: CreateStudentDto) {
        await this.prisma_service.students.create({data: body})
    }

    getStudentsByGroup(group_id: number) {
        return this.prisma_service.students.findMany({where: {group_id}})
    }

    changeGroup(student_id: number, group_id: number) {
        return this.prisma_service.students.update({where: {id: student_id}, data: {group_id}})
    }

    deleteStudent(student_id: number) {
        this.prisma_service.$transaction([
            this.prisma_service.statements.deleteMany({where: {student_id}}),
            this.prisma_service.students.delete({where: {id: student_id}})
        ])
    }
}
