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
exports.UserDto = exports.Roles = exports.LoginDTO = exports.CreateUserDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
var Roles;
(function (Roles) {
    Roles["TEACHER"] = "\u041F\u0440\u0435\u043F\u043E\u0434\u043E\u0432\u0430\u0442\u0435\u043B\u044C";
    Roles["DIRECTORATE_EMPLOYEE"] = "\u0421\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A \u0434\u0438\u0440\u0435\u043A\u0446\u0438\u0438";
    Roles["EDUCATION_EMPLOYEE"] = "\u0421\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A \u0443\u0447\u0435\u0431\u043D\u043E\u0433\u043E \u043E\u0442\u0434\u0435\u043B\u0430";
    Roles["ADMIN"] = "\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440";
})(Roles || (exports.Roles = Roles = {}));
class UserDto {
}
exports.UserDto = UserDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserDto.prototype, "login", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], UserDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: Roles }),
    __metadata("design:type", String)
], UserDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserDto.prototype, "password", void 0);
class CreateUserDTO {
}
exports.CreateUserDTO = CreateUserDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'admin',
        description: 'Логин пользователя',
        minLength: 6
    }),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "login", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: Roles }),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "role", void 0);
class LoginDTO {
}
exports.LoginDTO = LoginDTO;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LoginDTO.prototype, "login", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LoginDTO.prototype, "password", void 0);
//# sourceMappingURL=users.dto.js.map