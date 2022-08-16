import { IsString, IsOptional, IsMongoId, IsInt, IsNumber, IsArray, IsBoolean } from "class-validator"
import { BaseDto } from "../base.dto"
import { DtoGroup } from "../dtoGroups"
import { IsMongoIdCustom } from "../isMongoId"

class AnswerDto{
    @IsBoolean({
        groups: [DtoGroup.CREATE, DtoGroup.UPDATE]
    })
    isCorrect: boolean

    @IsString({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.UPDATE] })
    answer: string

    @IsString({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.UPDATE, DtoGroup.CREATE] })
    imgUrl: string
}

export class QuestionDto extends BaseDto {
    @IsMongoIdCustom({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.UPDATE] })
    testId: string

    @IsString({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.UPDATE] })
    question: string

    @IsArray({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.UPDATE] })
    answers: AnswerDto[]

    @IsString({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.UPDATE, DtoGroup.CREATE] })
    imgUrl: string
}