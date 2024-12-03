import { PrismaService } from "../prisma/prisma.service";
import { CreateStudentDto } from "./students.dto";
export declare class StudentsService {
    private prisma_service;
    constructor(prisma_service: PrismaService);
    create(body: CreateStudentDto): Promise<void>;
    getStudentsByGroup(group_id: number): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        id: number;
        surname: string;
        middle_name: string;
        date_of_birth: Date;
        gender: string;
        group_id: number;
    }[]>;
    changeGroup(student_id: number, group_id: number): import(".prisma/client").Prisma.Prisma__StudentsClient<{
        name: string;
        id: number;
        surname: string;
        middle_name: string;
        date_of_birth: Date;
        gender: string;
        group_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    deleteStudent(student_id: number): void;
}
