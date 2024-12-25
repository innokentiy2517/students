import { SpecialitiesService } from "./specialities.service";
import { RequestWithUser } from "../auth/request.dto";
import { Specialities } from "@prisma/client";
import { CreateSpecialityDto, UpdateSpecialityDto } from "./specialities.dto";
export declare class SpecialitiesController {
    private specialities_service;
    constructor(specialities_service: SpecialitiesService);
    create(body: CreateSpecialityDto, req: RequestWithUser): Promise<void>;
    getSpecialities(req: RequestWithUser): Promise<Specialities[]>;
    updateById(body: UpdateSpecialityDto, req: RequestWithUser): Promise<Specialities>;
    delete(body: {
        id: number;
    }, req: RequestWithUser): Promise<{
        name: string;
        id: number;
    }>;
}
