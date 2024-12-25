import { Disciplines } from "@prisma/client";
declare enum AttestationType {
    EXAM = "\u042D\u043A\u0437\u0430\u043C\u0435\u043D",
    PASS = "\u0417\u0430\u0447\u0451\u0442",
    COURSE_WORK = "\u041A\u0443\u0440\u0441\u043E\u0432\u0430\u044F \u0440\u0430\u0431\u043E\u0442\u0430",
    DIFF_PASS = "\u0414\u0438\u0444\u0444\u0435\u0440\u0435\u043D\u0446\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0437\u0430\u0447\u0435\u0442"
}
declare class DisciplinesDto implements Disciplines {
    id: number;
    name: string;
}
declare class CreateDisciplineDto {
    name: string;
}
export { DisciplinesDto, Disciplines, CreateDisciplineDto, AttestationType };
