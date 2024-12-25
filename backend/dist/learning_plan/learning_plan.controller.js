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
exports.LearningPlanController = void 0;
const common_1 = require("@nestjs/common");
const learning_plan_service_1 = require("./learning_plan.service");
const request_dto_1 = require("../auth/request.dto");
const auth_guard_1 = require("../auth/auth.guard");
const swagger_1 = require("@nestjs/swagger");
const learning_plan_dto_1 = require("./learning_plan.dto");
const users_dto_1 = require("../users/users.dto");
let LearningPlanController = class LearningPlanController {
    constructor(learning_plan_service) {
        this.learning_plan_service = learning_plan_service;
    }
    async getLearningPlans(req) {
        return this.learning_plan_service.getLearningPlans();
    }
    async getLearningPlan(req, body) {
        return this.learning_plan_service.getLearningPlanWithContent(body);
    }
    async getLearningPlanContentsForGroup(body) {
        return this.learning_plan_service.getLearningPlanForGroup(body);
    }
    async create(req, body) {
        const { user } = req;
        if (![users_dto_1.Roles.ADMIN, users_dto_1.Roles.EDUCATION_EMPLOYEE].includes(user.role)) {
            throw new common_1.ForbiddenException('Недостаточно прав');
        }
        if (await this.learning_plan_service.getLearningPlan(body)) {
            throw new common_1.BadRequestException({
                cause: 'start_study_year',
                message: 'Учебный план для данной специальности и года уже существует'
            });
        }
        return this.learning_plan_service.create(body);
    }
    async addContent(req, body) {
        const { user } = req;
        if (![users_dto_1.Roles.ADMIN, users_dto_1.Roles.EDUCATION_EMPLOYEE].includes(user.role)) {
            throw new common_1.ForbiddenException({
                cause: 'role',
                message: 'Недостаточно прав'
            });
        }
        return this.learning_plan_service.addContent(body);
    }
    async update_start_year(body, req) {
        const { user } = req;
        if (![users_dto_1.Roles.ADMIN, users_dto_1.Roles.EDUCATION_EMPLOYEE].includes(user.role)) {
            throw new common_1.ForbiddenException('Недостаточно прав');
        }
        if (await this.learning_plan_service.getLearningPlanByYearAndSpecialityId(body)) {
            throw new common_1.BadRequestException({
                cause: 'start_study_year',
                message: 'Учебный план для данной специальности и года уже существует'
            });
        }
        return this.learning_plan_service.updateStartYear(body);
    }
    deleteContent(body) {
        return this.learning_plan_service.deleteContent(body);
    }
    deleteLearningPlan(body) {
        return this.learning_plan_service.deleteLearningPlan(body);
    }
};
exports.LearningPlanController = LearningPlanController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('get_learning_plans'),
    (0, swagger_1.ApiOperation)({
        summary: 'Получение списка учебных планов',
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
], LearningPlanController.prototype, "getLearningPlans", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('get_learning_plan'),
    (0, swagger_1.ApiOperation)({
        summary: 'Получение учебного плана',
    }),
    (0, swagger_1.ApiHeaders)([{
            name: 'Authorization',
            description: 'Токен авторизации',
        }]),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.RequestWithUser, Object]),
    __metadata("design:returntype", Promise)
], LearningPlanController.prototype, "getLearningPlan", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('get_learning_plan_for_group'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LearningPlanController.prototype, "getLearningPlanContentsForGroup", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('create'),
    (0, swagger_1.ApiOperation)({
        summary: 'Создание учебного плана',
    }),
    (0, swagger_1.ApiHeaders)([{
            name: 'Authorization',
            description: 'Токен авторизации',
        }]),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.RequestWithUser,
        learning_plan_dto_1.CreateLearningPlanDto]),
    __metadata("design:returntype", Promise)
], LearningPlanController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('add_content'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Добавление контента учебного плана',
    }),
    (0, swagger_1.ApiHeaders)([{
            name: 'Authorization',
            description: 'Токен авторизации',
        }]),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.RequestWithUser, Object]),
    __metadata("design:returntype", Promise)
], LearningPlanController.prototype, "addContent", null);
__decorate([
    (0, common_1.Post)('update_start_year'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Обновление года начала учебного плана',
    }),
    (0, swagger_1.ApiHeaders)([{
            name: 'Authorization',
            description: 'Токен авторизации',
        }]),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [learning_plan_dto_1.UpdateStartYearDto,
        request_dto_1.RequestWithUser]),
    __metadata("design:returntype", Promise)
], LearningPlanController.prototype, "update_start_year", null);
__decorate([
    (0, common_1.Post)('delete_content'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Удаление контента учебного плана',
    }),
    (0, swagger_1.ApiHeaders)([{
            name: 'Authorization',
            description: 'Токен авторизации',
        }]),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LearningPlanController.prototype, "deleteContent", null);
__decorate([
    (0, common_1.Post)('delete'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Удаление учебного плана',
    }),
    (0, swagger_1.ApiHeaders)([{
            name: 'Authorization',
            description: 'Токен авторизации',
        }]),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LearningPlanController.prototype, "deleteLearningPlan", null);
exports.LearningPlanController = LearningPlanController = __decorate([
    (0, common_1.Controller)('learning_plan'),
    __metadata("design:paramtypes", [learning_plan_service_1.LearningPlanService])
], LearningPlanController);
//# sourceMappingURL=learning_plan.controller.js.map