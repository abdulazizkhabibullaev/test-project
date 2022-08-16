import { IsString } from "class-validator";
import { BaseDto } from "../base.dto";
import { DtoGroup } from "../dtoGroups";


export class ClassDto extends BaseDto{
    @IsString({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    number: string
}
