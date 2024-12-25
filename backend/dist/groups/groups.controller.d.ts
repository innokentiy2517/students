import { GroupsService } from "./groups.service";
import { CreateGroupDto } from "./groups.dto";
import { Groups } from "@prisma/client";
import { RequestWithUser } from "../auth/request.dto";
export declare class GroupsController {
    private groups_service;
    constructor(groups_service: GroupsService);
    create(body: CreateGroupDto, req: RequestWithUser): Promise<void>;
    getGroups(req: RequestWithUser): Promise<Groups[]>;
    update(req: RequestWithUser, body: Groups): Promise<void>;
    delete(req: RequestWithUser, body: {
        id: number;
    }): Promise<void>;
}
