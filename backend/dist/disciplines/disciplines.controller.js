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
exports.DisciplinesController = void 0;
const common_1 = require("@nestjs/common");
const disciplines_service_1 = require("./disciplines.service");
const auth_guard_1 = require("../auth/auth.guard");
const disciplines_dto_1 = require("./disciplines.dto");
const users_dto_1 = require("../users/users.dto");
const swagger_1 = require("@nestjs/swagger");
const request_dto_1 = require("../auth/request.dto");
let DisciplinesController = class DisciplinesController {
    constructor(discipline_service) {
        this.discipline_service = discipline_service;
    }
    async create(req, body) {
        const { user } = req;
        if (![users_dto_1.Roles.ADMIN, users_dto_1.Roles.EDUCATION_EMPLOYEE].includes(user.role)) {
            throw new common_1.ForbiddenException({
                cause: 'role',
                message: 'Недостаточно прав'
            });
        }
        return this.discipline_service.create(body);
    }
    async getDisciplines() {
        return this.discipline_service.getDisciplines();
    }
    async update(req, body) {
        const { user } = req;
        if (![users_dto_1.Roles.ADMIN, users_dto_1.Roles.EDUCATION_EMPLOYEE].includes(user.role)) {
            throw new common_1.ForbiddenException({
                message: 'Недостаточно прав',
                cause: 'role'
            });
        }
        const discipline = await this.discipline_service.getDisciplineById(body.id);
        if (!discipline) {
            throw new common_1.BadRequestException({
                message: 'Дисциплина не найдена',
                cause: 'id'
            });
        }
        return this.discipline_service.update(body);
    }
    async delete(req, body) {
        if (req.user.role !== users_dto_1.Roles.EDUCATION_EMPLOYEE) {
            throw new common_1.ForbiddenException({
                message: 'Недостаточно прав',
                cause: 'role'
            });
        }
        const discipline = await this.discipline_service.getDisciplineById(body.id);
        if (!discipline) {
            throw new common_1.BadRequestException({
                message: 'Дисциплина не найдена',
                cause: 'id'
            });
        }
        return this.discipline_service.delete(body.id);
    }
};
exports.DisciplinesController = DisciplinesController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('create'),
    (0, swagger_1.ApiHeader)({ name: 'Authorization', description: 'Токен доступа' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Дисциплина создана' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Недостаточно прав' }),
    (0, swagger_1.ApiOperation)({ summary: 'Создание дисциплины' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.RequestWithUser,
        disciplines_dto_1.CreateDisciplineDto]),
    __metadata("design:returntype", Promise)
], DisciplinesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('get_disciplines'),
    (0, swagger_1.ApiOperation)({ summary: 'Получение списка дисциплин' }),
    (0, swagger_1.ApiOkResponse)({ type: [disciplines_dto_1.DisciplinesDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DisciplinesController.prototype, "getDisciplines", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('update'),
    (0, swagger_1.ApiOkResponse)(),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Дисциплина не найдена' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Недостаточно прав' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.RequestWithUser,
        disciplines_dto_1.DisciplinesDto]),
    __metadata("design:returntype", Promise)
], DisciplinesController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('delete'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Удаление дисциплины',
        description: 'Удаление дисциплины по идентификатору. Также удаляет все связанные ведомости.'
    }),
    (0, swagger_1.ApiHeaders)([{
            name: 'Authorization',
            description: 'Токен доступа',
        }]),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.RequestWithUser, Object]),
    __metadata("design:returntype", Promise)
], DisciplinesController.prototype, "delete", null);
exports.DisciplinesController = DisciplinesController = __decorate([
    (0, common_1.Controller)('disciplines'),
    __metadata("design:paramtypes", [disciplines_service_1.DisciplinesService])
], DisciplinesController);
//# sourceMappingURL=disciplines.controller.js.map