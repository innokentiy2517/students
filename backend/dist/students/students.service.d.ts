import { PrismaService } from "../prisma/prisma.service";
import { CreateStudentDto, StudentsDto } from "./students.dto";
export declare class StudentsService {
    private prisma_service;
    constructor(prisma_service: PrismaService);
    create(body: CreateStudentDto): Promise<void>;
    getStudentsByGroup(group_id: number): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        surname: string;
        name: string;
        middle_name: string;
        date_of_birth: Date;
        gender: string;
        group_id: number;
        document_number: string;
    }[]>;
    changeGroup(student_id: number, group_id: number): import(".prisma/client").Prisma.Prisma__StudentsClient<{
        id: number;
        surname: string;
        name: string;
        middle_name: string;
        date_of_birth: Date;
        gender: string;
        group_id: number;
        document_number: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    deleteStudent(student_id: number): import(".prisma/client").Prisma.Prisma__StudentsClient<{
        id: number;
        surname: string;
        name: string;
        middle_name: string;
        date_of_birth: Date;
        gender: string;
        group_id: number;
        document_number: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findByDocumentNumber(document_number: string): Promise<{
        id: number;
        surname: string;
        name: string;
        middle_name: string;
        date_of_birth: Date;
        gender: string;
        group_id: number;
        document_number: string;
    }>;
    getAll(): import(".prisma/client").Prisma.PrismaPromise<({
        group: {
            speciality: {
                id: number;
                name: string;
            };
        } & {
            id: number;
            group_number: number;
            group_cipher: string;
            start_study_year: number;
            speciality_id: number;
        };
    } & {
        id: number;
        surname: string;
        name: string;
        middle_name: string;
        date_of_birth: Date;
        gender: string;
        group_id: number;
        document_number: string;
    })[]>;
    get(body: {
        id: number;
    }): import(".prisma/client").Prisma.Prisma__StudentsClient<{
        group: {
            speciality: {
                id: number;
                name: string;
            };
        } & {
            id: number;
            group_number: number;
            group_cipher: string;
            start_study_year: number;
            speciality_id: number;
        };
    } & {
        id: number;
        surname: string;
        name: string;
        middle_name: string;
        date_of_birth: Date;
        gender: string;
        group_id: number;
        document_number: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(body: StudentsDto): import(".prisma/client").Prisma.Prisma__StudentsClient<{
        id: number;
        surname: string;
        name: string;
        middle_name: string;
        date_of_birth: Date;
        gender: string;
        group_id: number;
        document_number: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
