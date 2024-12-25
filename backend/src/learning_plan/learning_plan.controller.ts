import {BadRequestException, Body, Controller, ForbiddenException, Get, Post, Req, UseGuards} from '@nestjs/common';
import {LearningPlanService} from "./learning_plan.service";
import {RequestWithUser} from "../auth/request.dto";
import {AuthGuard} from "../auth/auth.guard";
import {ApiBearerAuth, ApiBody, ApiHeaders, ApiOperation} from "@nestjs/swagger";
import {CreateLearningPlanDto, UpdateStartYearDto} from "./learning_plan.dto";
import {Roles} from "../users/users.dto";

@Controller('learning_plan')
export class LearningPlanController {
    constructor(private learning_plan_service: LearningPlanService) {
    }

    @UseGuards(AuthGuard)
    @Get('get_learning_plans')
    @ApiOperation({
        summary: 'Получение списка учебных планов',
    })
    @ApiHeaders([{
        name: 'Authorization',
        description: 'Токен авторизации',
    }])
    @ApiBearerAuth()
    async getLearningPlans(
        @Req() req: RequestWithUser
    ) {
        return this.learning_plan_service.getLearningPlans();
    }

    @UseGuards(AuthGuard)
    @Post('get_learning_plan')
    @ApiOperation({
        summary: 'Получение учебного плана',
    })
    @ApiHeaders([{
        name: 'Authorization',
        description: 'Токен авторизации',
    }])
    @ApiBearerAuth()
    async getLearningPlan(
        @Req() req: RequestWithUser,
        @Body() body: { id: number }
    ) {
        return this.learning_plan_service.getLearningPlanWithContent(body);
    }

    @UseGuards(AuthGuard)
    @Post('get_learning_plan_for_group')
    async getLearningPlanContentsForGroup(@Body() body: {speciality_id: number, start_study_year: number}) {
        return this.learning_plan_service.getLearningPlanForGroup(body);
    }

    @UseGuards(AuthGuard)
    @Post('create')
    @ApiOperation({
        summary: 'Создание учебного плана',
    })
    @ApiHeaders([{
        name: 'Authorization',
        description: 'Токен авторизации',
    }])
    @ApiBearerAuth()
    async create(
        @Req() req: RequestWithUser,
        @Body() body: CreateLearningPlanDto
    ): Promise<void> {
        const { user } = req;

        if(![Roles.ADMIN, Roles.EDUCATION_EMPLOYEE].includes(user.role as Roles)) {
            throw new ForbiddenException('Недостаточно прав');
        }

        if(await this.learning_plan_service.getLearningPlan(body)){
            throw new BadRequestException({
                cause: 'start_study_year',
                message: 'Учебный план для данной специальности и года уже существует'
            });
        }

        return this.learning_plan_service.create(body);
    }

    @Post('add_content')
    @UseGuards(AuthGuard)
    @ApiOperation({
        summary: 'Добавление контента учебного плана',
    })
    @ApiHeaders([{
        name: 'Authorization',
        description: 'Токен авторизации',
    }])
    @ApiBearerAuth()
    async addContent(
        @Req() req: RequestWithUser,
        @Body() body: {
            learning_plan_id: number,
            discipline_id: number,
            number_of_hours: number,
            attestation_type: string,
            semester: number
        }
    ) {
        const { user } = req;

        if(![Roles.ADMIN, Roles.EDUCATION_EMPLOYEE].includes(user.role as Roles)) {
            throw new ForbiddenException({
                cause: 'role',
                message: 'Недостаточно прав'
            });
        }

        return this.learning_plan_service.addContent(body);
    }

    @Post('update_start_year')
    @UseGuards(AuthGuard)
    @ApiOperation({
        summary: 'Обновление года начала учебного плана',
    })
    @ApiHeaders([{
        name: 'Authorization',
        description: 'Токен авторизации',
    }])
    @ApiBearerAuth()
    async update_start_year(
        @Body() body: UpdateStartYearDto,
        @Req() req: RequestWithUser
    ) {
        const { user } = req;

        if(![Roles.ADMIN, Roles.EDUCATION_EMPLOYEE].includes(user.role as Roles)) {
            throw new ForbiddenException('Недостаточно прав');
        }

        if(await this.learning_plan_service.getLearningPlanByYearAndSpecialityId(body)){
            throw new BadRequestException({
                cause: 'start_study_year',
                message: 'Учебный план для данной специальности и года уже существует'
            });
        }

        return this.learning_plan_service.updateStartYear(body);
    }

    @Post('delete_content')
    @UseGuards(AuthGuard)
    @ApiOperation({
        summary: 'Удаление контента учебного плана',
    })
    @ApiHeaders([{
        name: 'Authorization',
        description: 'Токен авторизации',
    }])
    @ApiBearerAuth()
    deleteContent(@Body() body: { id: number }) {
        return this.learning_plan_service.deleteContent(body);
    }

    @Post('delete')
    @UseGuards(AuthGuard)
    @ApiOperation({
        summary: 'Удаление учебного плана',
    })
    @ApiHeaders([{
        name: 'Authorization',
        description: 'Токен авторизации',
    }])
    @ApiBearerAuth()
    deleteLearningPlan(@Body() body: { id: number }) {
        return this.learning_plan_service.deleteLearningPlan(body);
    }
}
