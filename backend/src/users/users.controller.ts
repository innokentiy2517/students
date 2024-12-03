import {BadRequestException, Body, Controller, Post} from '@nestjs/common';
import { UsersService } from './users.service';
import {CreateUserDTO, LoginDTO, Roles} from "./users.dto";
import {ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiResponse} from "@nestjs/swagger";
import {JwtService} from "@nestjs/jwt";
import {createHash} from "node:crypto";

@Controller('users')
export class UsersController {
    constructor(private users_service: UsersService, private jwt_service: JwtService) {}

    @Post('register')
    @ApiOperation({
        summary: 'Регистрация пользователя',
        description: 'Регистрация пользователя'
    })
    @ApiBadRequestResponse({
        description: 'Имя пользователя должно быть уникальным',
        schema: {
            example: {
                message: 'Имя пользователя должно быть уникальным',
                cause: 'login'
            }
        }
    })
    @ApiOkResponse({
        description: 'Аутентификация прошла успешно',
        schema: {
            example: {
                token: 'token',
                role: 'Преподаватель'
            },
            type: 'object',
            properties: {
                token: {
                    type: 'string'
                },
                role: {
                    type: 'string',
                }
            }
        }
    })
    async register(
        @Body() body: CreateUserDTO
    ): Promise<{token: string, role: string}> {
        const is_username_unique = await this.users_service.checkUsername(body.login);

        if(is_username_unique) {
            throw new BadRequestException({
                cause: 'login',
                message: 'Имя пользователя должно быть уникальным'
            })
        }

        const user = await this.users_service.register(body)

        const token = await this.jwt_service.signAsync({
            login: user.login,
            role: user.role
        });

        return {token, role: user.role}
    }

    @Post('login')
    @ApiOperation({
        summary: 'Аутентификация пользователя',
        description: 'Аутентификация пользователя'
    })
    @ApiBadRequestResponse({
        description: 'Пользователь не найден',
        schema: {
            example: {
                message: 'Пользователь не найден',
                cause: 'login'
            }
        }
    })
    @ApiBadRequestResponse({
        description: 'Данные авторизации неверны',
        schema: {
            example: {
                message: 'Неверный пароль',
                cause: 'password'
            }
        }
    })
    @ApiOkResponse({
        description: 'Аутентификация прошла успешно',
        schema: {
            example: {
                token: 'token',
                role: 'Преподаватель'
            },
            type: 'object',
            properties: {
                token: {
                    type: 'string'
                },
                role: {
                    type: 'string',
                }
            }
        }
    })
    async login(@Body() body: LoginDTO): Promise<{token: string, role: string}> {
        const user = await this.users_service.getUserByLogin(body.login);

        if(!user) {
            throw new BadRequestException({
                cause: 'login',
                message: 'Пользователь не найден'
            })
        }

        if(user.password !== createHash('sha256').update(body.password).digest('hex')) {
            throw new BadRequestException({
                message: 'Неверный пароль',
                cause: 'password'
            })
        }

        const token = await this.jwt_service.signAsync({
            login: user.login,
            role: user.role
        });

        return {token, role: user.role}
    }
}
