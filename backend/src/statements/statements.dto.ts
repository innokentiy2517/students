import {Statements} from "@prisma/client";
import {ApiProperty, PartialType} from "@nestjs/swagger";

class StatementsDto implements Statements {
    @ApiProperty()
    id: number;

    @ApiProperty()
    date_of_issue: Date;

    @ApiProperty()
    mark: number | null;

    @ApiProperty()
    student_id: number;

    @ApiProperty()
    discipline_id: number;
}

class CreateStatementDto {
    @ApiProperty()
    student_id: number;

    @ApiProperty()
    discipline_id: number;

    @ApiProperty()
    date_of_issue: Date;
}

class StatementChangeMarkDto {
    @ApiProperty()
    mark: number;

    @ApiProperty()
    id: number;
}

export {StatementsDto, CreateStatementDto, StatementChangeMarkDto}