import { Groups } from "@prisma/client";
declare class GroupsDto implements Groups {
    group_cipher: string;
    group_number: number;
    start_study_year: number;
    id: number;
}
declare class CreateGroupDto {
    group_number: number;
    group_cipher: string;
    start_study_year: number;
}
export { CreateGroupDto, GroupsDto };
