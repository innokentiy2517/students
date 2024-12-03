import { Students } from "@prisma/client";
declare enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE"
}
declare class StudentsDto implements Students {
    id: number;
    name: string;
    middle_name: string;
    surname: string;
    date_of_birth: Date;
    group_id: number;
    gender: string;
}
declare class CreateStudentDto {
    name: string;
    middle_name: string;
    surname: string;
    date_of_birth: Date;
    group_id: number;
    gender: Gender;
}
export { StudentsDto, CreateStudentDto };
