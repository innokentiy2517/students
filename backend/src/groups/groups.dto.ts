import {ApiProperty} from "@nestjs/swagger";
import {Groups} from "@prisma/client";

class GroupsDto implements Groups{
    @ApiProperty()
    group_cipher: string;

    @ApiProperty()
    group_number: number;

    @ApiProperty()
    start_study_year: number;

    @ApiProperty()
    id: number;

    @ApiProperty()
    speciality_id: number;

    @ApiProperty()
    speciality: {
        id: number;
        name: string;
    }
}

class CreateGroupDto {
    @ApiProperty()
    group_number: number;

    @ApiProperty()
    group_cipher: string;

    @ApiProperty()
    start_study_year: number;

    @ApiProperty()
    speciality_id: number;
}

export {CreateGroupDto, GroupsDto}