import { IsDate, IsEnum, IsInt, IsMongoId, IsNumber, IsOptional } from "class-validator";
import { Status } from "../../db/model/tests/testResults/testResult.model";
import { BaseDto } from "../base.dto";
import { DtoGroup } from "../dtoGroups";
import { IsMongoIdCustom } from "../isMongoId";


export class TestResultDto extends BaseDto {
    @IsMongoIdCustom({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    userId: string

    @IsMongoIdCustom({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    testId: string

    @IsDate({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.UPDATE] })
    startedAt: Date

    @IsDate({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.UPDATE] })
    finishedAt: Date

    @IsNumber()
    @IsOptional({ groups: [DtoGroup.UPDATE, DtoGroup.UPDATE] })
    score: number

    @IsEnum(Status, { groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.UPDATE] })
    status: Status

    @IsNumber()
    @IsOptional({ groups: [DtoGroup.UPDATE, DtoGroup.UPDATE] })
    result: number
}