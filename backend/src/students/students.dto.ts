import {Students} from "@prisma/client";
import {ApiProperty} from "@nestjs/swagger";

enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}

class StudentsDto implements Students {
    @ApiProperty()
    id: number

    @ApiProperty()
    name: string

    @ApiProperty()
    middle_name: string

    @ApiProperty()
    surname: string

    @ApiProperty()
    date_of_birth: Date

    @ApiProperty()
    group_id: number

    @ApiProperty({enum: Gender})
    gender: string

    @ApiProperty()
    document_number: string
}

class CreateStudentDto {
    @ApiProperty()
    name: string

    @ApiProperty()
    middle_name: string

    @ApiProperty()
    surname: string

    @ApiProperty()
    date_of_birth: Date

    @ApiProperty()
    group_id: number

    @ApiProperty()
    gender: string

    @ApiProperty()
    document_number: string
}

export {StudentsDto, CreateStudentDto}