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
exports.StatementsController = void 0;
const common_1 = require("@nestjs/common");
const statements_service_1 = require("./statements.service");
const statements_dto_1 = require("./statements.dto");
const users_dto_1 = require("../users/users.dto");
const auth_guard_1 = require("../auth/auth.guard");
const swagger_1 = require("@nestjs/swagger");
const request_dto_1 = require("../auth/request.dto");
let StatementsController = class StatementsController {
    constructor(statements_service) {
        this.statements_service = statements_service;
    }
    async create(req, body) {
        if (req.user.role !== users_dto_1.Roles.DIRECTORATE_EMPLOYEE) {
            throw new common_1.ForbiddenException('Недостаточно прав');
        }
        const statements = await this.statements_service.getActiveStatementsByStudentAndDiscipline(body.student_id, body.discipline_id);
        if (statements.length > 0) {
            throw new common_1.BadRequestException('У студента уже есть активная ведомость по данному предмету');
        }
        return this.statements_service.create(body);
    }
    async set_mark(req, body) {
        if (req.user.role !== users_dto_1.Roles.TEACHER) {
            throw new common_1.ForbiddenException('Недостаточно прав');
        }
        const statement = await this.statements_service.getStatementById(body.id);
        if (!statement) {
            throw new common_1.BadRequestException('Ведомость не найдена');
        }
        return this.statements_service.set_mark(body);
    }
    async delete(req, body) {
        if (req.user.role !== users_dto_1.Roles.DIRECTORATE_EMPLOYEE) {
            throw new common_1.ForbiddenException('Недостаточно прав');
        }
        const statement = await this.statements_service.getStatementById(body.id);
        if (!statement) {
            throw new common_1.BadRequestException('Ведомость не найдена');
        }
        return this.statements_service.delete(body.id);
    }
};
exports.StatementsController = StatementsController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('create'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiHeader)({ name: 'Authorization', description: 'JWT токен' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Недостаточно прав' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'У студента уже есть активная ведомость по данному предмету' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.RequestWithUser,
        statements_dto_1.CreateStatementDto]),
    __metadata("design:returntype", Promise)
], StatementsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('set_mark'),
    (0, swagger_1.ApiHeader)({ name: 'Authorization', description: 'JWT токен' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Недостаточно прав' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Ведомость не найдена' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.RequestWithUser,
        statements_dto_1.StatementChangeMarkDto]),
    __metadata("design:returntype", Promise)
], StatementsController.prototype, "set_mark", null);
__decorate([
    (0, common_1.Post)('delete'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({
        summary: 'Удаление ведомости',
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                id: {
                    type: 'number'
                }
            },
            required: ['id']
        }
    }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Недостаточно прав' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Ведомость не найдена' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeaders)([
        {
            name: 'Authorization',
            description: 'Токен пользователя',
        }
    ]),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.RequestWithUser, Object]),
    __metadata("design:returntype", Promise)
], StatementsController.prototype, "delete", null);
exports.StatementsController = StatementsController = __decorate([
    (0, common_1.Controller)('statements'),
    __metadata("design:paramtypes", [statements_service_1.StatementsService])
], StatementsController);
//# sourceMappingURL=statements.controller.js.map