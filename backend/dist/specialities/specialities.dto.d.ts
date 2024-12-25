import { Specialities } from "@prisma/client";
declare class SpecialitiesDto implements Specialities {
    id: number;
    name: string;
}
declare class CreateSpecialityDto {
    name: string;
}
declare class UpdateSpecialityDto {
    name: string;
    id: number;
}
export { SpecialitiesDto, CreateSpecialityDto, UpdateSpecialityDto };
