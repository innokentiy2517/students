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
exports.SpecialitiesController = void 0;
const common_1 = require("@nestjs/common");
const specialities_service_1 = require("./specialities.service");
const request_dto_1 = require("../auth/request.dto");
const auth_guard_1 = require("../auth/auth.guard");
const specialities_dto_1 = require("./specialities.dto");
const swagger_1 = require("@nestjs/swagger");
const users_dto_1 = require("../users/users.dto");
let SpecialitiesController = class SpecialitiesController {
    constructor(specialities_service) {
        this.specialities_service = specialities_service;
    }
    async create(body, req) {
        const { user } = req;
        if (![users_dto_1.Roles.ADMIN, users_dto_1.Roles.EDUCATION_EMPLOYEE].includes(user.role)) {
            throw new common_1.ForbiddenException({
                message: 'Недостаточно прав',
                cause: 'role'
            });
        }
        if (await this.specialities_service.getSpecialityByName(body.name)) {
            throw new common_1.BadRequestException({
                cause: 'name',
                message: 'Специальность с таким названием уже существует'
            });
        }
        return this.specialities_service.create(body);
    }
    async getSpecialities(req) {
        return this.specialities_service.getSpecialities();
    }
    async updateById(body, req) {
        const { user } = req;
        if (![users_dto_1.Roles.ADMIN, users_dto_1.Roles.EDUCATION_EMPLOYEE].includes(user.role)) {
            throw new common_1.ForbiddenException({
                message: 'Недостаточно прав',
                cause: 'role'
            });
        }
        return this.specialities_service.updateById(body);
    }
    async delete(body, req) {
        const { user } = req;
        if (![users_dto_1.Roles.ADMIN, users_dto_1.Roles.EDUCATION_EMPLOYEE].includes(user.role)) {
            throw new common_1.ForbiddenException({
                cause: 'role',
                message: 'Недостаточно прав'
            });
        }
        return this.specialities_service.delete(body.id);
    }
};
exports.SpecialitiesController = SpecialitiesController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('create'),
    (0, swagger_1.ApiOperation)({
        summary: 'Создание специальности',
        description: 'Создание специальности'
    }),
    (0, swagger_1.ApiHeaders)([{
            name: 'Authorization',
            description: 'Токен авторизации',
        }]),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [specialities_dto_1.CreateSpecialityDto,
        request_dto_1.RequestWithUser]),
    __metadata("design:returntype", Promise)
], SpecialitiesController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('get_specialities'),
    (0, swagger_1.ApiOperation)({
        summary: 'Получение списка специальностей',
        description: 'Получение списка специальностей'
    }),
    (0, swagger_1.ApiHeaders)([{
            name: 'Authorization',
            description: 'Токен авторизации',
        }]),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.RequestWithUser]),
    __metadata("design:returntype", Promise)
], SpecialitiesController.prototype, "getSpecialities", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('update'),
    (0, swagger_1.ApiOperation)({
        summary: 'Обновление специальности',
        description: 'Обновление специальности'
    }),
    (0, swagger_1.ApiHeaders)([{
            name: 'Authorization',
            description: 'Токен авторизации',
        }]),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [specialities_dto_1.UpdateSpecialityDto,
        request_dto_1.RequestWithUser]),
    __metadata("design:returntype", Promise)
], SpecialitiesController.prototype, "updateById", null);
__decorate([
    (0, common_1.Post)('delete'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Удаление специальности',
        description: 'Удаление специальности'
    }),
    (0, swagger_1.ApiHeaders)([{
            name: 'Authorization',
            description: 'Токен авторизации',
        }]),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, request_dto_1.RequestWithUser]),
    __metadata("design:returntype", Promise)
], SpecialitiesController.prototype, "delete", null);
exports.SpecialitiesController = SpecialitiesController = __decorate([
    (0, common_1.Controller)('specialities'),
    __metadata("design:paramtypes", [specialities_service_1.SpecialitiesService])
], SpecialitiesController);
//# sourceMappingURL=specialities.controller.js.map