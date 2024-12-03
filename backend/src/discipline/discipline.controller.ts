import {
    BadRequestException,
    Body,
    Controller,
    ForbiddenException,
    Post,
    UseGuards,
    Req,
    HttpCode
} from '@nestjs/common';
import {DisciplineService} from "./discipline.service";
import {AuthGuard} from "../auth/auth.guard";
import {CreateDisciplineDto, DisciplinesDto} from "./discipline.dto";
import {Roles} from "../users/users.dto";
import {
    ApiBadRequestResponse, ApiBearerAuth,
    ApiForbiddenResponse,
    ApiHeader, ApiHeaders,
    ApiOkResponse,
    ApiOperation
} from "@nestjs/swagger";
import {RequestWithUser} from "../auth/request.dto";

@Controller('discipline')
export class DisciplineController {
    constructor(private discipline_service: DisciplineService) {
    }

    @UseGuards(AuthGuard)
    @Post('create')
    @ApiHeader({name: 'Authorization', description: 'Токен доступа'})
    @ApiOkResponse({description: 'Дисциплина создана'})
    @ApiForbiddenResponse({description: 'Недостаточно прав'})
    @ApiOperation({summary: 'Создание дисциплины'})
    async create(
        @Req() req: Request & {user: { login: string, role: string }},
        @Body() body: CreateDisciplineDto
    ) {
        if(req.user.role !== Roles.EDUCATION_EMPLOYEE) {
            throw new ForbiddenException();
        }

        return this.discipline_service.create(body)
    }

    @Post('get_disciplines')
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
        if(req.user.role !== Roles.EDUCATION_EMPLOYEE) {
            throw new ForbiddenException('Недостаточно прав');
        }

        const discipline = await this.discipline_service.getDisciplineById(body.id)

        if(!discipline) {
            throw new BadRequestException('Дисциплина не найдена')
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
            throw new BadRequestException('Дисциплина не найдена')
        }

        return this.discipline_service.delete(body.id)
    }
}
