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
exports.StudentsController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/auth.guard");
const students_dto_1 = require("./students.dto");
const users_dto_1 = require("../users/users.dto");
const students_service_1 = require("./students.service");
const swagger_1 = require("@nestjs/swagger");
const request_dto_1 = require("../auth/request.dto");
let StudentsController = class StudentsController {
    constructor(students_service) {
        this.students_service = students_service;
    }
    async getAll() {
        return this.students_service.getAll();
    }
    async get(body) {
        return this.students_service.get(body);
    }
    async create(req, body) {
        const { user } = req;
        if (![users_dto_1.Roles.ADMIN, users_dto_1.Roles.DIRECTORATE_EMPLOYEE].includes(user.role)) {
            throw new common_1.ForbiddenException({
                message: 'Недостаточно прав',
                cause: 'role'
            });
        }
        if (await this.students_service.findByDocumentNumber(body.document_number)) {
            throw new common_1.BadRequestException({
                message: 'Студент с таким номером зачётки уже существует',
                cause: 'document_number'
            });
        }
        return this.students_service.create(body);
    }
    async update(body, req) {
        const { user } = req;
        if (![users_dto_1.Roles.ADMIN, users_dto_1.Roles.DIRECTORATE_EMPLOYEE].includes(user.role)) {
            throw new common_1.ForbiddenException({
                cause: 'role',
                message: 'Недостаточно прав'
            });
        }
        return this.students_service.update(body);
    }
    deleteStudent(req, body) {
        const { user } = req;
        if (![users_dto_1.Roles.ADMIN, users_dto_1.Roles.DIRECTORATE_EMPLOYEE].includes(user.role)) {
            throw new common_1.ForbiddenException({
                message: 'Недостаточно прав',
                cause: 'role'
            });
        }
        return this.students_service.deleteStudent(body.id);
    }
};
exports.StudentsController = StudentsController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('get_all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "getAll", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('get'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "get", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeaders)([{
            name: 'Authorization',
            description: 'Токен пользователя',
        }]),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.RequestWithUser,
        students_dto_1.CreateStudentDto]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [students_dto_1.StudentsDto,
        request_dto_1.RequestWithUser]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeaders)([
        {
            name: 'Authorization',
            description: 'Токен пользователя',
        }
    ]),
    (0, common_1.Post)('delete'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBody)({ schema: { properties: { student_id: { type: 'number' } } } }),
    (0, swagger_1.ApiOkResponse)(),
    (0, swagger_1.ApiForbiddenResponse)({
        description: 'Недостаточно прав',
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.RequestWithUser, Object]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "deleteStudent", null);
exports.StudentsController = StudentsController = __decorate([
    (0, common_1.Controller)('students'),
    __metadata("design:paramtypes", [students_service_1.StudentsService])
], StudentsController);
//# sourceMappingURL=students.controller.js.map