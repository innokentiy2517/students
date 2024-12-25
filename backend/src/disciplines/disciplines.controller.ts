import {
    BadRequestException,
    Body,
    Controller,
    ForbiddenException,
    Post,
    UseGuards,
    Req,
    HttpCode, Get
} from '@nestjs/common';
import {DisciplinesService} from "./disciplines.service";
import {AuthGuard} from "../auth/auth.guard";
import {CreateDisciplineDto, DisciplinesDto} from "./disciplines.dto";
import {Roles} from "../users/users.dto";
import {
    ApiBadRequestResponse, ApiBearerAuth,
    ApiForbiddenResponse,
    ApiHeader, ApiHeaders,
    ApiOkResponse,
    ApiOperation
} from "@nestjs/swagger";
import {RequestWithUser} from "../auth/request.dto";

@Controller('disciplines')
export class DisciplinesController {
    constructor(private discipline_service: DisciplinesService) {
    }

    @UseGuards(AuthGuard)
    @Post('create')
    @ApiHeader({name: 'Authorization', description: 'Токен доступа'})
    @ApiOkResponse({description: 'Дисциплина создана'})
    @ApiForbiddenResponse({description: 'Недостаточно прав'})
    @ApiOperation({summary: 'Создание дисциплины'})
    async create(
        @Req() req: RequestWithUser,
        @Body() body: CreateDisciplineDto
    ) {
        const {user} = req;

        if(![Roles.ADMIN, Roles.EDUCATION_EMPLOYEE].includes(user.role as Roles)) {
            throw new ForbiddenException({
                cause: 'role',
                message: 'Недостаточно прав'
            });
        }

        return this.discipline_service.create(body)
    }

    @Get('get_disciplines')
    @ApiOperation({summary: 'Получение списка дисциплин'})
    @ApiOkResponse({type: [DisciplinesDto]})
    async getDisciplines(): Promise<DisciplinesDto[]> {
        return this.discipline_service.getDisciplines()
    }

    @UseGuards(AuthGuard)
    @Post('update')
    @ApiOkResponse()
    @ApiBadRequestResponse({description: 'Дисциплина не найдена'})
    @ApiForbiddenResponse({description: 'Недостаточно прав'})
    async update(
        @Req() req: RequestWithUser,
        @Body() body: DisciplinesDto
    ): Promise<void> {
        const {user} = req;

        if(![Roles.ADMIN, Roles.EDUCATION_EMPLOYEE].includes(user.role as Roles)) {
            throw new ForbiddenException({
                message: 'Недостаточно прав',
                cause: 'role'
            });
        }

        const discipline = await this.discipline_service.getDisciplineById(body.id)

        if(!discipline) {
            throw new BadRequestException({
                message: 'Дисциплина не найдена',
                cause: 'id'
            })
        }

        return this.discipline_service.update(body)
    }

    @UseGuards(AuthGuard)
    @Post('delete')
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Удаление дисциплины',
        description: 'Удаление дисциплины по идентификатору. Также удаляет все связанные ведомости.'
    })
    @ApiHeaders([{
        name: 'Authorization',
        description: 'Токен доступа',
    }])
    @HttpCode(200)
    async delete(
        @Req() req: RequestWithUser,
        @Body() body: { id: number }
    ){
        if(req.user.role !== Roles.EDUCATION_EMPLOYEE) {
            throw new ForbiddenException({
                message: 'Недостаточно прав',
                cause: 'role'
            });
        }

        const discipline = await this.discipline_service.getDisciplineById(body.id)

        if(!discipline) {
            throw new BadRequestException({
                message:'Дисциплина не найдена',
                cause: 'id'
            })
        }

        return this.discipline_service.delete(body.id)
    }
}
