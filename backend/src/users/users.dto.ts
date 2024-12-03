import {ApiProperty} from "@nestjs/swagger";
import {Users} from "@prisma/client";

enum Roles {
    TEACHER = 'Преподователь',
    DIRECTORATE_EMPLOYEE = 'Сотрудник дирекции',
    EDUCATION_EMPLOYEE = 'Сотрудник учебного отдела',
    ADMIN = 'Администратор'
}

class UserDto implements Users {
    @ApiProperty()
    login: string

    @ApiProperty()
    id: number

    @ApiProperty({enum: Roles})
    role: Roles

    @ApiProperty()
    password: string
}

class CreateUserDTO {
    @ApiProperty({
        example: 'admin',
        description: 'Логин пользователя',
        minLength: 6
    })
    login: string

    @ApiProperty()
    password: string

    @ApiProperty({enum: Roles})
    role: Roles
}

class LoginDTO {
    @ApiProperty()
    login: string

    @ApiProperty()
    password: string
}

export { CreateUserDTO, LoginDTO, Roles, UserDto }