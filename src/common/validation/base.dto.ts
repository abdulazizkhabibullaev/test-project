import { IsOptional } from "class-validator";
import { DtoGroup } from "./dtoGroups";
import { IsMongoIdCustom } from "./isMongoId";

export class BaseDto {
    @IsOptional({ groups: [DtoGroup.PAGING] })
    @IsMongoIdCustom({
        groups: [
            DtoGroup.UPDATE,
            DtoGroup.DELETE,
            DtoGroup.GET_BY_ID,
            DtoGroup.PAGING
        ],
    })
    _id?: string;
}