import { Users } from "@prisma/client";
declare enum Roles {
    TEACHER = "\u041F\u0440\u0435\u043F\u043E\u0434\u043E\u0432\u0430\u0442\u0435\u043B\u044C",
    DIRECTORATE_EMPLOYEE = "\u0421\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A \u0434\u0438\u0440\u0435\u043A\u0446\u0438\u0438",
    EDUCATION_EMPLOYEE = "\u0421\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A \u0443\u0447\u0435\u0431\u043D\u043E\u0433\u043E \u043E\u0442\u0434\u0435\u043B\u0430",
    ADMIN = "\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440"
}
declare class UserDto implements Users {
    login: string;
    id: number;
    role: Roles;
    password: string;
}
declare class CreateUserDTO {
    login: string;
    password: string;
    role: Roles;
}
declare class LoginDTO {
    login: string;
    password: string;
}
export { CreateUserDTO, LoginDTO, Roles, UserDto };
