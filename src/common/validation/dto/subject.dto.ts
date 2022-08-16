import { IsMongoId, IsString } from "class-validator";
import { BaseDto } from "../base.dto";
import { DtoGroup } from "../dtoGroups";
import { IsMongoIdCustom } from "../isMongoId";


export class SubjectDto extends BaseDto{
    @IsString({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    name: string

    @IsMongoIdCustom({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    classId: string
}