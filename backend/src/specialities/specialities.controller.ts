import {BadRequestException, Body, Controller, ForbiddenException, Get, Post, Req, UseGuards} from '@nestjs/common';
import {SpecialitiesService} from "./specialities.service";
import {RequestWithUser} from "../auth/request.dto";
import {Specialities} from "@prisma/client";
import {AuthGuard} from "../auth/auth.guard";
import {CreateSpecialityDto, UpdateSpecialityDto} from "./specialities.dto";
import {ApiBearerAuth, ApiHeaders, ApiOperation} from "@nestjs/swagger";
import {Roles} from "../users/users.dto";

@Controller('specialities')
export class SpecialitiesController {
    constructor(private specialities_service: SpecialitiesService) {}

    @UseGuards(AuthGuard)
    @Post('create')
    @ApiOperation({
        summary: 'Создание специальности',
        description: 'Создание специальности'
    })
    @ApiHeaders([{
        name: 'Authorization',
        description: 'Токен авторизации',
    }])
    @ApiBearerAuth()
    async create(
        @Body() body: CreateSpecialityDto,
        @Req() req: RequestWithUser
    ): Promise<void> {
        const { user } = req;

        if(![Roles.ADMIN, Roles.EDUCATION_EMPLOYEE].includes(user.role as Roles)) {
            throw new ForbiddenException('Недостаточно прав');
        }

        if(await this.specialities_service.getSpecialityByName(body.name)) {
            throw new BadRequestException({
                cause: 'name',
                message: 'Специальность с таким названием уже существует'
            });
        }

        return this.specialities_service.create(body);
    }

    @UseGuards(AuthGuard)
    @Get('get_specialities')
    @ApiOperation({
        summary: 'Получение списка специальностей',
        description: 'Получение списка специальностей'
    })
    @ApiHeaders([{
        name: 'Authorization',
        description: 'Токен авторизации',
    }])
    @ApiBearerAuth()
    async getSpecialities(
        @Req() req: RequestWithUser
    ): Promise<Specialities[]> {
        return this.specialities_service.getSpecialities();
    }

    @UseGuards(AuthGuard)
    @Post('update')
    @ApiOperation({
        summary: 'Обновление специальности',
        description: 'Обновление специальности'
    })
    @ApiHeaders([{
        name: 'Authorization',
        description: 'Токен авторизации',
    }])
    @ApiBearerAuth()
    async updateById(
        @Body() body: UpdateSpecialityDto,
        @Req() req: RequestWithUser
    ): Promise<Specialities> {
        const { user } = req;

        if(![Roles.ADMIN, Roles.EDUCATION_EMPLOYEE].includes(user.role as Roles)) {
            throw new ForbiddenException('Недостаточно прав');
        }

        return this.specialities_service.updateById(body);
    }

    @Post('delete')
    @UseGuards(AuthGuard)
    @ApiOperation({
        summary: 'Удаление специальности',
        description: 'Удаление специальности'
    })
    @ApiHeaders([{
        name: 'Authorization',
        description: 'Токен авторизации',
    }])
    @ApiBearerAuth()
    async delete(
        @Body() body: { id: number },
        @Req() req: RequestWithUser
    ) {
        const { user } = req;

        if(![Roles.ADMIN, Roles.EDUCATION_EMPLOYEE].includes(user.role as Roles)) {
            throw new ForbiddenException({
                cause: 'role',
                message: 'Недостаточно прав'
            });
        }

        return this.specialities_service.delete(body.id);
    }
}
