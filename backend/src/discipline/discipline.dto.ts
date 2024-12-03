import {Disciplines} from "@prisma/client";
import {ApiProperty, PartialType} from "@nestjs/swagger";

enum AttestationType {
    EXAM = 'Экзамен',
    PASS = 'Зачёт'
}

class DisciplinesDto implements Disciplines {
    @ApiProperty({
        example: 1,
        description: 'Уникальный идентификатор дисциплины в базе данных',
    })
    id: number

    @ApiProperty({
        example: 'Математика',
        description: 'Название дисциплины',
        minLength: 1
    })
    name: string

    @ApiProperty({
        enum: AttestationType,
        example: 'Экзамен',
        description: 'Тип аттестации',
    })
    attestation_type: string;

    @ApiProperty({
        example: 3,
        description: 'Количество учебных часов в дисциплине',
        minimum: 1
    })
    number_of_hours: number;
}

class CreateDisciplineDto {
    @ApiProperty()
    name: string

    @ApiProperty({enum: AttestationType})
    attestation_type: string

    @ApiProperty()
    number_of_hours: number
}

export {DisciplinesDto, Disciplines, CreateDisciplineDto, AttestationType}