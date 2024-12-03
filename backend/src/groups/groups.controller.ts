import {
    Body,
    Controller,
    Post,
    UseGuards,
    ForbiddenException,
    BadRequestException,
    Req,
    HttpCode
} from '@nestjs/common';
import {GroupsService} from "./groups.service";
import {AuthGuard} from "../auth/auth.guard";
import {CreateGroupDto, GroupsDto} from "./groups.dto";
import {Roles} from "../users/users.dto"
import {
    ApiBadRequestResponse, ApiBearerAuth, ApiBody,
    ApiCreatedResponse,
    ApiForbiddenResponse, ApiHeader, ApiHeaders,
    ApiOkResponse, ApiOperation,
    ApiResponse, ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {Groups} from "@prisma/client";
import {RequestWithUser} from "../auth/request.dto";

@Controller('groups')
export class GroupsController {
    constructor(private groups_service: GroupsService) {}

    @UseGuards(AuthGuard)
    @Post('create')
    @ApiOperation({
        description: 'Создание группы',
        summary: 'Создание группы'
    })
    @ApiHeaders([{
        name: 'Authorization',
        description: 'Токен пользователя',
    }])
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({description: 'Требуется авторизация'})
    @ApiCreatedResponse({description: 'Группа успешно создана'})
    @ApiForbiddenResponse({description: 'Недостаточно прав'})
    async create(
        @Body() body: CreateGroupDto,
        @Req() req: RequestWithUser
    ): Promise<void> {
        const {user} = req;

        if(user.role !== Roles.DIRECTORATE_EMPLOYEE) {
            throw new ForbiddenException();
        }

        return this.groups_service.create(body)
    }

    @UseGuards(AuthGuard)
    @Post('get_groups')
    @ApiOperation({
        description: 'Получение списка групп',
        summary: 'Получение списка групп'
    })
    @ApiHeaders([{
        name: 'Authorization',
        description: 'Токен пользователя',
    }])
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({description: 'Требуется авторизация'})
    @ApiOkResponse({type: [GroupsDto]})
    async getGroups(
        @Req() req: RequestWithUser
    ): Promise<Groups[]> {
        return this.groups_service.getGroups()
    }

    @UseGuards(AuthGuard)
    @ApiOperation({
        description: 'Обновление информации о группе',
        summary: 'Обновление информации о группе'
    })
    @ApiForbiddenResponse({description: 'Недостаточно прав'})
    @ApiBadRequestResponse({description: 'Группа не найдена'})
    @ApiOkResponse({description: 'Информация о группе обновлена'})
    @Post('update')
    async update(
        @Req() req: RequestWithUser,
        @Body() body: Groups
    ): Promise<void> {
        const {user} = req;
        if(user.role !== Roles.DIRECTORATE_EMPLOYEE) {
            throw new ForbiddenException('Недостаточно прав');
        }

        const group = await this.groups_service.getGroup(body.id);

        if(!group) {
            throw new BadRequestException('Группа не найдена');
        }

        return this.groups_service.update(body)
    }

    @ApiOperation({
        summary: 'Удаление группы',
        description: 'Удаление группы. При удалении группы будут удалены все связанные студенты, а также все связанные со студентами ведомости.',
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                id: {type: 'number'}
            },
            required: ['id']
        }
    })
    @ApiForbiddenResponse({description: 'Недостаточно прав'})
    @HttpCode(200)
    @Post('delete')
    async delete(
        @Req() req: RequestWithUser,
        @Body() body: { id: number }
    ) {
        const {user} = req;

        if(user.role !== Roles.DIRECTORATE_EMPLOYEE) {
            throw new ForbiddenException('Недостаточно прав');
        }

        const group = await this.groups_service.getGroup(body.id);

        if(!group) {
            throw new BadRequestException('Группа не найдена');
        }

        return this.groups_service.delete(body.id)
    }

    async getGroupPerformance(
        @Req() req: RequestWithUser,
        @Body() body: { group_id: number }
    ){
        const {user} = req;

        if(user.role !== Roles.EDUCATION_EMPLOYEE) {
            throw new ForbiddenException('Недостаточно прав');
        }

        const group = await this.groups_service.getGroupPerformance(body.group_id)
    }
}
