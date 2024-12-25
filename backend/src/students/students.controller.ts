import {
    Body,
    Controller,
    Post,
    UseGuards,
    ForbiddenException,
    HttpStatus,
    Req, HttpCode, BadRequestException, Get,
} from '@nestjs/common';
import {AuthGuard} from "../auth/auth.guard";
import {CreateStudentDto, StudentsDto} from "./students.dto";
import {Roles} from "../users/users.dto";
import {StudentsService} from "./students.service";
import {
    ApiBearerAuth,
    ApiBody,
    ApiForbiddenResponse,
    ApiHeaders,
    ApiOkResponse
} from "@nestjs/swagger";
import {RequestWithUser} from "../auth/request.dto";

@Controller('students')
export class StudentsController {
    constructor(private students_service: StudentsService) {}

    @UseGuards(AuthGuard)
    @Get('get_all')
    async getAll() {
        return this.students_service.getAll()
    }

    @UseGuards(AuthGuard)
    @Post('get')
    async get(@Body() body: { id: number }) {
        return this.students_service.get(body)
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiHeaders([{
        name: 'Authorization',
        description: 'Токен пользователя',
    }])
    @Post('create')
    async create(
        @Req() req: RequestWithUser,
        @Body() body: CreateStudentDto
    ) {
        const {user} = req;

        if(![Roles.ADMIN, Roles.DIRECTORATE_EMPLOYEE].includes(user.role as Roles)) {
            throw new ForbiddenException({
                message: 'Недостаточно прав',
                cause: 'role'
            });
        }

        if(await this.students_service.findByDocumentNumber(body.document_number)) {
            throw new BadRequestException({
                message: 'Студент с таким номером зачётки уже существует',
                cause: 'document_number'
            });
        }

        return this.students_service.create(body)
    }

    @UseGuards(AuthGuard)
    @Post('update')
    async update(@Body() body: StudentsDto) {
        return this.students_service.update(body)
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiHeaders([
        {
            name: 'Authorization',
            description: 'Токен пользователя',
        }
    ])
    @Post('delete')
    @HttpCode(HttpStatus.OK)
    @ApiBody({schema: {properties: {student_id: {type: 'number'}}}})
    @ApiOkResponse()
    @ApiForbiddenResponse({
        description: 'Недостаточно прав',
    })
    deleteStudent(
        @Req() req: RequestWithUser,
        @Body() body: { id: number }
    ) {
        const {user} = req;

        if(![Roles.ADMIN, Roles.DIRECTORATE_EMPLOYEE].includes(user.role as Roles)) {
            throw new ForbiddenException({
                message: 'Недостаточно прав',
                cause: 'role'
            });
        }

        return this.students_service.deleteStudent(body.id)
    }
}
