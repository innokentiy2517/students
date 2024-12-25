import { UsersService } from './users.service';
import { CreateUserDTO, LoginDTO } from "./users.dto";
import { JwtService } from "@nestjs/jwt";
export declare class UsersController {
    private users_service;
    private jwt_service;
    constructor(users_service: UsersService, jwt_service: JwtService);
    register(body: CreateUserDTO): Promise<{
        token: string;
        role: string;
    }>;
    login(body: LoginDTO): Promise<{
        token: string;
        role: string;
    }>;
}
