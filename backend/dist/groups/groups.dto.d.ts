import { Groups } from "@prisma/client";
declare class GroupsDto implements Groups {
    group_cipher: string;
    group_number: number;
    start_study_year: number;
    id: number;
    speciality_id: number;
    speciality: {
        id: number;
        name: string;
    };
}
declare class CreateGroupDto {
    group_number: number;
    group_cipher: string;
    start_study_year: number;
    speciality_id: number;
}
export { CreateGroupDto, GroupsDto };
