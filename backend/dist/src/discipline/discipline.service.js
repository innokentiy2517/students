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
exports.DisciplineService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DisciplineService = class DisciplineService {
    constructor(prisma_service) {
        this.prisma_service = prisma_service;
    }
    async create(body) {
        await this.prisma_service.disciplines.create({ data: body });
    }
    getDisciplines() {
        return this.prisma_service.disciplines.findMany();
    }
    async update(body) {
        await this.prisma_service.disciplines.update({ where: { id: body.id }, data: body });
    }
    async getDisciplineById(id) {
        return this.prisma_service.disciplines.findUnique({ where: { id } });
    }
    async delete(id) {
        await this.prisma_service.$transaction([
            this.prisma_service.statements.deleteMany({ where: { discipline_id: id } }),
            this.prisma_service.disciplines.delete({ where: { id } })
        ]);
    }
};
exports.DisciplineService = DisciplineService;
exports.DisciplineService = DisciplineService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DisciplineService);
//# sourceMappingURL=discipline.service.js.map