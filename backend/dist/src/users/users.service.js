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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const node_crypto_1 = require("node:crypto");
let UsersService = class UsersService {
    constructor(prisma_service) {
        this.prisma_service = prisma_service;
    }
    async register(body) {
        const hashed_password = (0, node_crypto_1.createHash)('sha256').update(body.password).digest('hex');
        return this.prisma_service.users.create({
            data: {
                login: body.login,
                password: hashed_password,
                role: body.role
            }
        });
    }
    async checkUsername(login) {
        const user = await this.prisma_service.users.findFirst({
            where: {
                login
            }
        });
        return !!user;
    }
    async getUserByLogin(login) {
        return this.prisma_service.users.findFirst({
            where: {
                login
            }
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map