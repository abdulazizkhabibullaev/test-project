import { Transform } from "class-transformer";
import { IsEnum, IsOptional, IsPhoneNumber, IsString, MinLength } from "class-validator";
import { Gender } from "../../db/model/user/user.model";
import { BaseDto } from "../base.dto";
import { DtoGroup } from "../dtoGroups";


export class UserDto extends BaseDto {
    @IsOptional({ groups: [DtoGroup.UPDATE] })
    @IsString({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    firstName: string;

    @IsOptional({ groups: [DtoGroup.UPDATE] })
    @IsString({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    lastName: string;

    @Transform(({ value }) => value ? '+' + value.replace(/[^0-9]/g, '') : value)
    @IsPhoneNumber(null, { groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.UPDATE] })
    phoneNumber: string

    @IsOptional({ groups: [DtoGroup.UPDATE] })
    @IsString({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE, DtoGroup.LOGIN] })
    @MinLength(4, { groups: [DtoGroup.CREATE, DtoGroup.UPDATE, DtoGroup.LOGIN] })
    password: string

    @IsOptional({ groups: [DtoGroup.UPDATE] })
    @IsString({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    address: string;

    @IsEnum(Gender, { groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    gender: Gender
}