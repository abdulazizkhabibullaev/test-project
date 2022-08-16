import { DtoGroup } from "../dtoGroups";
import { IsInt, IsOptional, IsPositive } from "class-validator";
import { Transform } from "class-transformer";
import { BaseDto } from "../base.dto";

export class PagingDto extends BaseDto {
    @Transform(({ value }) => Number(value))
    @IsInt({ groups: [DtoGroup.PAGING] })
    @IsPositive({ groups: [DtoGroup.PAGING] })
    page: number;

    @Transform(({ value }) => Number(value))
    @IsInt({ groups: [DtoGroup.PAGING] })
    @IsPositive({ groups: [DtoGroup.PAGING] })
    limit: number;
}
