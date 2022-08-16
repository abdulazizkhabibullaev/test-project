import { IsString } from "class-validator";
import { BaseDto } from "../base.dto";
import { DtoGroup } from "../dtoGroups";
import { IsMongoIdCustom } from "../isMongoId";


export class MessageDto extends BaseDto {
    @IsMongoIdCustom({ groups: [DtoGroup.CREATE] })
    userId: string

    @IsString({ groups: [DtoGroup.CREATE] })
    message: string
}