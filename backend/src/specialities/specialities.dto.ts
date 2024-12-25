import {Specialities} from "@prisma/client";
import {ApiProperty} from "@nestjs/swagger";

class SpecialitiesDto implements Specialities {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;
}

class CreateSpecialityDto {
    @ApiProperty({
        example: 'ЭВМ',
    })
    name: string;
}

class UpdateSpecialityDto {
    @ApiProperty({
        example: 'ЭВМ',
    })
    name: string;

    @ApiProperty(
        {
            example: 1,
            description: 'Уникальный идентификатор специальности в базе данных',
        }
    )
    id: number
}

export {SpecialitiesDto, CreateSpecialityDto, UpdateSpecialityDto}