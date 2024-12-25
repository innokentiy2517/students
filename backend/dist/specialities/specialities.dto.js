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
exports.UpdateSpecialityDto = exports.CreateSpecialityDto = exports.SpecialitiesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class SpecialitiesDto {
}
exports.SpecialitiesDto = SpecialitiesDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SpecialitiesDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SpecialitiesDto.prototype, "name", void 0);
class CreateSpecialityDto {
}
exports.CreateSpecialityDto = CreateSpecialityDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ЭВМ',
    }),
    __metadata("design:type", String)
], CreateSpecialityDto.prototype, "name", void 0);
class UpdateSpecialityDto {
}
exports.UpdateSpecialityDto = UpdateSpecialityDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ЭВМ',
    }),
    __metadata("design:type", String)
], UpdateSpecialityDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Уникальный идентификатор специальности в базе данных',
    }),
    __metadata("design:type", Number)
], UpdateSpecialityDto.prototype, "id", void 0);
//# sourceMappingURL=specialities.dto.js.map