import { Disciplines } from "@prisma/client";
declare enum AttestationType {
    EXAM = "\u042D\u043A\u0437\u0430\u043C\u0435\u043D",
    PASS = "\u0417\u0430\u0447\u0451\u0442"
}
declare class DisciplinesDto implements Disciplines {
    id: number;
    name: string;
    attestation_type: string;
    number_of_hours: number;
}
declare class CreateDisciplineDto {
    name: string;
    attestation_type: string;
    number_of_hours: number;
}
export { DisciplinesDto, Disciplines, CreateDisciplineDto, AttestationType };
