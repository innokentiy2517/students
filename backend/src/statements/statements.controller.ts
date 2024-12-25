import {
    BadRequestException,
    Body,
    Controller,
    ForbiddenException, Get,
    HttpCode,
    Post,
    Req,
    UseGuards
} from '@nestjs/common';
import {StatementsService} from "./statements.service";
import {CreateStatementDto, StatementChangeMarkDto} from "./statements.dto";
import {Roles} from "../users/users.dto";
import {AuthGuard} from "../auth/auth.guard";
import {
    ApiBadRequestResponse,
    ApiBearerAuth, ApiBody,
    ApiForbiddenResponse,
    ApiHeader, ApiHeaders, ApiOperation,
} from "@nestjs/swagger";
import {RequestWithUser} from "../auth/request.dto";

@Controller('statements')
export class StatementsController {
    constructor(private statements_service: StatementsService) {
    }

    @UseGuards(AuthGuard)
    @Post('create')
    @ApiBearerAuth('access-token')
    @ApiHeader({name: 'Authorization', description: 'JWT токен'})
    @ApiForbiddenResponse({description: 'Недостаточно прав'})
    @ApiBadRequestResponse({description: 'У студента уже есть активная ведомость по данному предмету'})
    async create(
        @Req() req: RequestWithUser,
        @Body() body: CreateStatementDto
    ) {
        if (![Roles.ADMIN, Roles.DIRECTORATE_EMPLOYEE].includes(req.user.role as Roles)) {
            throw new ForbiddenException({message:'Недостаточно прав', cause: 'role'});
        }

        const statements = await this.statements_service.getActiveStatementsByStudentAndDiscipline(body.student_id, body.discipline_id);

        if(statements.length > 0) {
            throw new BadRequestException({message:'У студента уже есть активная ведомость по данному предмету', cause: 'discipline_id'});
        }

        return this.statements_service.create(body);
    }

    @UseGuards(AuthGuard)
    @Post('set_mark')
    @ApiHeader({name: 'Authorization', description: 'JWT токен'})
    @ApiForbiddenResponse({description: 'Недостаточно прав'})
    @ApiBadRequestResponse({description: 'Ведомость не найдена'})
    async set_mark(
        @Req() req: RequestWithUser,
        @Body() body: StatementChangeMarkDto
    ) {
       if(![Roles.ADMIN, Roles.DIRECTORATE_EMPLOYEE, Roles.TEACHER].includes(req.user.role as Roles)) {
            throw new ForbiddenException({
                cause: 'role', message: 'Недостаточно прав'
            });
        }

        const statement = await this.statements_service.getStatementById(body.id);

        if(!statement) {
            throw new BadRequestException({
                cause: 'id', message: 'Ведомость не найдена'
            });
        }

        return this.statements_service.set_mark(body);
    }

    @UseGuards(AuthGuard)
    @Post('delete')
    @HttpCode(200)
    @ApiOperation({
        summary: 'Удаление ведомости',
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                id: {
                    type: 'number'
                }
            },
            required: ['id']
        }
    })
    @ApiForbiddenResponse({description: 'Недостаточно прав'})
    @ApiBadRequestResponse({description: 'Ведомость не найдена'})
    @ApiBearerAuth()
    @ApiHeaders([
        {
            name: 'Authorization',
            description: 'Токен пользователя',
        }
    ])
    async delete(
        @Req() req: RequestWithUser,
        @Body() body: { id: number }
    ) {
        if(![Roles.ADMIN, Roles.DIRECTORATE_EMPLOYEE].includes(req.user.role as Roles)) {
            throw new ForbiddenException({
                message: 'Недостаточно прав',
                cause: 'role'
            });
        }

        const statement = await this.statements_service.getStatementById(body.id);

        if(!statement) {
            throw new BadRequestException({message:'Ведомость не найдена', cause: 'id'});
        }

        return this.statements_service.delete(body.id)
    }

    @Get('get')
    async get() {
        return this.statements_service.get()
    }
}
