import { Transform } from "class-transformer";
import { IsMongoId, IsOptional, IsPhoneNumber, IsString, MinLength } from "class-validator";
import { ObjectId } from "../../types/types";
import { BaseDto } from "../base.dto";
import { DtoGroup } from "../dtoGroups";
import { IsMongoIdCustom } from "../isMongoId";


export class EmployeeDto extends BaseDto{
    @IsOptional({ groups: [DtoGroup.UPDATE] })
    @IsString({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    fullName: string;

    @Transform(({ value }) => value ? '+' + value.replace(/[^0-9]/g, '') : value)
    @IsPhoneNumber(null, { groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.UPDATE] })
    phoneNumber: string

    @IsOptional({ groups: [DtoGroup.UPDATE] })
    @IsString({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE, DtoGroup.LOGIN] })
    @MinLength(4, {groups:[DtoGroup.CREATE, DtoGroup.UPDATE, DtoGroup.LOGIN]})
    password: string

    @IsMongoIdCustom({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.UPDATE] })
    roleId: string
}