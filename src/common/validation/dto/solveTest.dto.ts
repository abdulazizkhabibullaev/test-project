import { IsMongoId, IsOptional, IsString } from "class-validator";
import { BaseDto } from "../base.dto";
import { DtoGroup } from "../dtoGroups";
import { IsMongoIdCustom } from "../isMongoId";


export class SolveTestDto extends BaseDto {
    @IsMongoIdCustom({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    questionId: string

    @IsMongoIdCustom({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    answerId: string

    @IsMongoIdCustom({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    userId: string
}