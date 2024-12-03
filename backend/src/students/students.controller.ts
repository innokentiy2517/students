import {
    Body,
    Controller,
    Post,
    UseGuards,
    ForbiddenException,
    HttpStatus,
    Req, HttpCode,
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

        if(user.role !== Roles.DIRECTORATE_EMPLOYEE) {
            throw new ForbiddenException({
                message: 'Недостаточно прав',
                cause: 'role'
            });
        }

        return this.students_service.create(body)
    }

    @Post('get_by_group')
    @ApiBody({
        schema: {
            properties: {
                group_id: {
                    type: 'number',
                    description: 'ID группы',
                }
            },
            required: ['group_id']
        }
    })
    @ApiOkResponse({type: [StudentsDto]})
    async getByGroup(@Body() body: { group_id: number }): Promise<StudentsDto[]> {
        return this.students_service.getStudentsByGroup(body.group_id)
    }

    @UseGuards(AuthGuard)
    @Post('change_group')
    @ApiBearerAuth()
    @ApiHeaders([
        {
            name: 'Authorization',
            description: 'Токен пользователя',
        }
    ])
    @ApiBody({schema: {properties: {student_id: {type: 'number'}, new_group_id: {type: 'number'}}}})
    @ApiOkResponse({type: StudentsDto})
    @ApiForbiddenResponse({
        description: 'Недостаточно прав',
    })
    @HttpCode(HttpStatus.OK)
    async changeGroup(
        @Req() req: RequestWithUser,
        @Body() body: { student_id: number, new_group_id: number }
    ) {
        if(req.user.role !== Roles.DIRECTORATE_EMPLOYEE) {
            throw new ForbiddenException({
                message: 'Недостаточно прав',
                cause: 'role'
            });
        }
        return this.students_service.changeGroup(body.student_id, body.new_group_id)
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiHeaders([
        {
            name: 'Authorization',
            description: 'Токен пользователя',
        }
    ])
    @Post('delete_student')
    @HttpCode(HttpStatus.OK)
    @ApiBody({schema: {properties: {student_id: {type: 'number'}}}})
    @ApiOkResponse()
    @ApiForbiddenResponse({
        description: 'Недостаточно прав',
    })
    deleteStudent(
        @Req() req: RequestWithUser,
        @Body() body: { student_id: number }
    ) {
        if(req.user.role !== Roles.DIRECTORATE_EMPLOYEE) {
            throw new ForbiddenException({
                message: 'Недостаточно прав',
                cause: 'role'
            });
        }

        return this.students_service.deleteStudent(body.student_id)
    }
}
