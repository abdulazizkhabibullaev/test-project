import { IsInt, IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";
import { BaseDto } from "../base.dto";
import { DtoGroup } from "../dtoGroups";
import { IsMongoIdCustom } from "../isMongoId";


export class TestDto extends BaseDto{
    @IsString({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.UPDATE] })
    name: string

    @IsMongoIdCustom({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.UPDATE] })
    topicId: string

    @IsInt({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.UPDATE, DtoGroup.CREATE] })
    questionCount: number

    @IsNumber({ allowInfinity: false, allowNaN: false }, { groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.UPDATE] })
    duration: number
}