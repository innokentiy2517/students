import { CreateStudentDto, StudentsDto } from "./students.dto";
import { StudentsService } from "./students.service";
import { RequestWithUser } from "../auth/request.dto";
export declare class StudentsController {
    private students_service;
    constructor(students_service: StudentsService);
    getAll(): Promise<({
        group: {
            speciality: {
                name: string;
                id: number;
            };
        } & {
            id: number;
            group_number: number;
            group_cipher: string;
            start_study_year: number;
            speciality_id: number;
        };
    } & {
        name: string;
        id: number;
        surname: string;
        middle_name: string;
        date_of_birth: Date;
        gender: string;
        group_id: number;
        document_number: string;
    })[]>;
    get(body: {
        id: number;
    }): Promise<{
        group: {
            speciality: {
                name: string;
                id: number;
            };
        } & {
            id: number;
            group_number: number;
            group_cipher: string;
            start_study_year: number;
            speciality_id: number;
        };
    } & {
        name: string;
        id: number;
        surname: string;
        middle_name: string;
        date_of_birth: Date;
        gender: string;
        group_id: number;
        document_number: string;
    }>;
    create(req: RequestWithUser, body: CreateStudentDto): Promise<void>;
    update(body: StudentsDto): Promise<{
        name: string;
        id: number;
        surname: string;
        middle_name: string;
        date_of_birth: Date;
        gender: string;
        group_id: number;
        document_number: string;
    }>;
    deleteStudent(req: RequestWithUser, body: {
        id: number;
    }): import(".prisma/client").Prisma.Prisma__StudentsClient<{
        name: string;
        id: number;
        surname: string;
        middle_name: string;
        date_of_birth: Date;
        gender: string;
        group_id: number;
        document_number: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
