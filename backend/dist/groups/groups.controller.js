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
exports.GroupsController = void 0;
const common_1 = require("@nestjs/common");
const groups_service_1 = require("./groups.service");
const auth_guard_1 = require("../auth/auth.guard");
const groups_dto_1 = require("./groups.dto");
const users_dto_1 = require("../users/users.dto");
const swagger_1 = require("@nestjs/swagger");
const request_dto_1 = require("../auth/request.dto");
let GroupsController = class GroupsController {
    constructor(groups_service) {
        this.groups_service = groups_service;
    }
    async create(body, req) {
        const { user } = req;
        if (![users_dto_1.Roles.ADMIN, users_dto_1.Roles.DIRECTORATE_EMPLOYEE].includes(user.role)) {
            throw new common_1.ForbiddenException({
                cause: 'role',
                message: 'Недостаточно прав'
            });
        }
        if (await this.groups_service.getGroupByParams(body)) {
            throw new common_1.BadRequestException({
                cause: 'group_number',
                message: 'Группа с таким номером уже существует'
            });
        }
        return this.groups_service.create(body);
    }
    async getGroups(req) {
        return this.groups_service.getGroups();
    }
    async update(req, body) {
        const { user } = req;
        if (![users_dto_1.Roles.ADMIN, users_dto_1.Roles.DIRECTORATE_EMPLOYEE].includes(user.role)) {
            throw new common_1.ForbiddenException({
                cause: 'role',
                message: 'Недостаточно прав'
            });
        }
        const group = await this.groups_service.getGroup(body.id);
        if (!group) {
            throw new common_1.BadRequestException({
                cause: 'id',
                message: 'Группа не найдена'
            });
        }
        return this.groups_service.update(body);
    }
    async delete(req, body) {
        const { user } = req;
        if (![users_dto_1.Roles.ADMIN, users_dto_1.Roles.DIRECTORATE_EMPLOYEE].includes(user.role)) {
            throw new common_1.ForbiddenException({
                cause: 'role',
                message: 'Недостаточно прав'
            });
        }
        const group = await this.groups_service.getGroup(body.id);
        if (!group) {
            throw new common_1.BadRequestException({
                cause: 'id',
                message: 'Группа не найдена'
            });
        }
        return this.groups_service.delete(body.id);
    }
    async getGroupPerformance(req, body) {
        const { user } = req;
        if (user.role !== users_dto_1.Roles.EDUCATION_EMPLOYEE) {
            throw new common_1.ForbiddenException('Недостаточно прав');
        }
        const group = await this.groups_service.getGroupPerformance(body.group_id);
    }
};
exports.GroupsController = GroupsController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('create'),
    (0, swagger_1.ApiOperation)({
        description: 'Создание группы',
        summary: 'Создание группы'
    }),
    (0, swagger_1.ApiHeaders)([{
            name: 'Authorization',
            description: 'Токен пользователя',
        }]),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Требуется авторизация' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Группа успешно создана' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Недостаточно прав' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [groups_dto_1.CreateGroupDto,
        request_dto_1.RequestWithUser]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('get_groups'),
    (0, swagger_1.ApiOperation)({
        description: 'Получение списка групп',
        summary: 'Получение списка групп'
    }),
    (0, swagger_1.ApiHeaders)([{
            name: 'Authorization',
            description: 'Токен пользователя',
        }]),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Требуется авторизация' }),
    (0, swagger_1.ApiOkResponse)({ type: [groups_dto_1.GroupsDto] }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.RequestWithUser]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "getGroups", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({
        description: 'Обновление информации о группе',
        summary: 'Обновление информации о группе'
    }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Недостаточно прав' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Группа не найдена' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Информация о группе обновлена' }),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.RequestWithUser, Object]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Удаление группы',
        description: 'Удаление группы. При удалении группы будут удалены все связанные студенты, а также все связанные со студентами ведомости.',
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                id: { type: 'number' }
            },
            required: ['id']
        }
    }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Недостаточно прав' }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.RequestWithUser, Object]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "delete", null);
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.RequestWithUser, Object]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "getGroupPerformance", null);
exports.GroupsController = GroupsController = __decorate([
    (0, common_1.Controller)('groups'),
    __metadata("design:paramtypes", [groups_service_1.GroupsService])
], GroupsController);
//# sourceMappingURL=groups.controller.js.map