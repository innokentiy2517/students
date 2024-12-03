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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttestationType = exports.CreateDisciplineDto = exports.DisciplinesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
var AttestationType;
(function (AttestationType) {
    AttestationType["EXAM"] = "\u042D\u043A\u0437\u0430\u043C\u0435\u043D";
    AttestationType["PASS"] = "\u0417\u0430\u0447\u0451\u0442";
})(AttestationType || (exports.AttestationType = AttestationType = {}));
class DisciplinesDto {
}
exports.DisciplinesDto = DisciplinesDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Уникальный идентификатор дисциплины в базе данных',
    }),
    __metadata("design:type", Number)
], DisciplinesDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Математика',
        description: 'Название дисциплины',
        minLength: 1
    }),
    __metadata("design:type", String)
], DisciplinesDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: AttestationType,
        example: 'Экзамен',
        description: 'Тип аттестации',
    }),
    __metadata("design:type", String)
], DisciplinesDto.prototype, "attestation_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 3,
        description: 'Количество учебных часов в дисциплине',
        minimum: 1
    }),
    __metadata("design:type", Number)
], DisciplinesDto.prototype, "number_of_hours", void 0);
class CreateDisciplineDto {
}
exports.CreateDisciplineDto = CreateDisciplineDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateDisciplineDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: AttestationType }),
    __metadata("design:type", String)
], CreateDisciplineDto.prototype, "attestation_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreateDisciplineDto.prototype, "number_of_hours", void 0);
//# sourceMappingURL=discipline.dto.js.map