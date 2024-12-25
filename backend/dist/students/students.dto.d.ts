import { Students } from "@prisma/client";
declare class StudentsDto implements Students {
    id: number;
    name: string;
    middle_name: string;
    surname: string;
    date_of_birth: Date;
    group_id: number;
    gender: string;
    document_number: string;
}
declare class CreateStudentDto {
    name: string;
    middle_name: string;
    surname: string;
    date_of_birth: Date;
    group_id: number;
    gender: string;
    document_number: string;
}
export { StudentsDto, CreateStudentDto };
