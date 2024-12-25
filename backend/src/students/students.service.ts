import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {CreateStudentDto, StudentsDto} from "./students.dto";

@Injectable()
export class StudentsService {
    constructor(private prisma_service: PrismaService) {
    }
    async create(body: CreateStudentDto) {
        await this.prisma_service.students.create({
            data: {
                name: body.name,
                middle_name: body.middle_name,
                surname: body.surname,
                date_of_birth: new Date(body.date_of_birth).toISOString(),
                group: {
                    connect: {
                        id: body.group_id
                    }
                },
                gender: body.gender,
                document_number: body.document_number
            }
        })
    }

    getStudentsByGroup(group_id: number) {
        return this.prisma_service.students.findMany({where: {group_id}})
    }

    changeGroup(student_id: number, group_id: number) {
        return this.prisma_service.students.update({where: {id: student_id}, data: {group_id}})
    }

    deleteStudent(student_id: number) {
        return this.prisma_service.students.delete({where: {id: student_id}})
    }

    async findByDocumentNumber(document_number: string) {
        return this.prisma_service.students.findFirst({where: {document_number}})
    }

    getAll() {
        return this.prisma_service.students.findMany({
            include: {
                group: {
                    include: {
                        speciality: true
                    }
                }
            },
            orderBy: {
                group_id: 'asc'
            }
        })
    }

    get(body: { id: number }) {
        return this.prisma_service.students.findUnique({
            where: {id: body.id},
            include: {
                group: {
                    include: {
                        speciality: true
                    }
                }
            }
        })
    }

    update(body: StudentsDto) {
        return this.prisma_service.students.update({where: {id: body.id}, data: body})
    }
}
