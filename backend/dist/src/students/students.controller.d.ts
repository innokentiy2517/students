import { CreateStudentDto, StudentsDto } from "./students.dto";
import { StudentsService } from "./students.service";
import { RequestWithUser } from "../auth/request.dto";
export declare class StudentsController {
    private students_service;
    constructor(students_service: StudentsService);
    create(req: RequestWithUser, body: CreateStudentDto): Promise<void>;
    getByGroup(body: {
        group_id: number;
    }): Promise<StudentsDto[]>;
    changeGroup(req: RequestWithUser, body: {
        student_id: number;
        new_group_id: number;
    }): Promise<{
        name: string;
        id: number;
        surname: string;
        middle_name: string;
        date_of_birth: Date;
        gender: string;
        group_id: number;
    }>;
    deleteStudent(req: RequestWithUser, body: {
        student_id: number;
    }): void;
}
