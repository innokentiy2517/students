"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const users_dto_1 = require("./users.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_1 = require("@nestjs/jwt");
const node_crypto_1 = require("node:crypto");
let UsersController = class UsersController {
    constructor(users_service, jwt_service) {
        this.users_service = users_service;
        this.jwt_service = jwt_service;
    }
    async register(body) {
        const is_username_unique = await this.users_service.checkUsername(body.login);
        if (is_username_unique) {
            throw new common_1.BadRequestException({
                cause: 'login',
                message: 'Имя пользователя должно быть уникальным'
            });
        }
        const user = await this.users_service.register(body);
        const token = await this.jwt_service.signAsync({
            login: user.login,
            role: user.role
        });
        return { token, role: user.role };
    }
    async login(body) {
        const user = await this.users_service.getUserByLogin(body.login);
        if (!user) {
            throw new common_1.BadRequestException({
                cause: 'login',
                message: 'Пользователь не найден'
            });
        }
        if (user.password !== (0, node_crypto_1.createHash)('sha256').update(body.password).digest('hex')) {
            throw new common_1.BadRequestException({
                message: 'Неверный пароль',
                cause: 'password'
            });
        }
        const token = await this.jwt_service.signAsync({
            login: user.login,
            role: user.role
        });
        return { token, role: user.role };
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({
        summary: 'Регистрация пользователя',
        description: 'Регистрация пользователя'
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Имя пользователя должно быть уникальным',
        schema: {
            example: {
                message: 'Имя пользователя должно быть уникальным',
                cause: 'login'
            }
        }
    }),
    (0, swagger_1.ApiOkResponse)({
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
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.CreateUserDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({
        summary: 'Аутентификация пользователя',
        description: 'Аутентификация пользователя'
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Пользователь не найден',
        schema: {
            example: {
                message: 'Пользователь не найден',
                cause: 'login'
            }
        }
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Данные авторизации неверны',
        schema: {
            example: {
                message: 'Неверный пароль',
                cause: 'password'
            }
        }
    }),
    (0, swagger_1.ApiOkResponse)({
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
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.LoginDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService, jwt_1.JwtService])
], UsersController);
//# sourceMappingURL=users.controller.js.map