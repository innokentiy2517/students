import {Disciplines} from "@prisma/client";
import {ApiProperty} from "@nestjs/swagger";

enum AttestationType {
    EXAM = 'Экзамен',
    PASS = 'Зачёт',
    COURSE_WORK = 'Курсовая работа',
    DIFF_PASS = 'Дифференцированный зачет'
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
}

class CreateDisciplineDto {
    @ApiProperty()
    name: string
}

export {DisciplinesDto, Disciplines, CreateDisciplineDto, AttestationType}