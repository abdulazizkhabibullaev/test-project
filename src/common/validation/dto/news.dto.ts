import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";
import { Alignment, Languages, ListIndicator, TitleType } from "../../db/model/news/news.model";
import { BaseDto } from "../base.dto";
import { DtoGroup } from "../dtoGroups";

export class ContentDataDto {
    @IsOptional({
        groups: [DtoGroup.UPDATE],
    })
    @IsBoolean({
        groups: [DtoGroup.UPDATE],
    })
    newLine: boolean;

    @IsOptional({
        groups: [DtoGroup.UPDATE],
    })
    @IsBoolean({
        groups: [DtoGroup.UPDATE],
    })
    bold: boolean;

    @IsOptional({
        groups: [DtoGroup.UPDATE],
    })
    @IsBoolean({
        groups: [DtoGroup.UPDATE],
    })
    underline: boolean;

    @IsBoolean({
        groups: [DtoGroup.UPDATE],
    })
    @IsOptional({
        groups: [DtoGroup.UPDATE],
    })
    italic: boolean;


    @IsBoolean({
        groups: [DtoGroup.UPDATE],
    })
    @IsOptional({
        groups: [DtoGroup.UPDATE],
    })
    strikethrough: boolean;

    @IsOptional({
        groups: [DtoGroup.UPDATE],
    })
    @IsString({
        groups: [DtoGroup.UPDATE],
    })
    value: string;

    @IsOptional({
        groups: [DtoGroup.UPDATE],
    })
    @IsNumber(
        {
            allowInfinity: false,
            allowNaN: false,
            maxDecimalPlaces: 2,
        },
        {
            groups: [DtoGroup.UPDATE],
        },
    )
    size: number;

    @IsOptional({
        groups: [DtoGroup.UPDATE],
    })
    @IsEnum(Alignment, {
        groups: [DtoGroup.UPDATE],
    })
    align: Alignment;

    @IsOptional({
        groups: [DtoGroup.UPDATE],
    })
    @IsBoolean({
        groups: [DtoGroup.UPDATE],
    })
    sup: boolean;

    @IsOptional({
        groups: [DtoGroup.UPDATE],
    })
    @IsBoolean({
        groups: [DtoGroup.UPDATE],
    })
    sub: boolean;

    @IsOptional({
        groups: [DtoGroup.UPDATE]
    })
    @IsUrl(
        {},
        {
            groups: [DtoGroup.UPDATE],
        },
    )
    href: string;


    @IsOptional({
        groups: [DtoGroup.UPDATE]
    })
    @IsEnum(ListIndicator, {
        groups: [DtoGroup.UPDATE],
    })
    listIndicator: ListIndicator;
}

export class NewsDto extends BaseDto{
    @IsEnum(Languages, { groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.UPDATE] })
    language: Languages

    @IsString({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.UPDATE] })
    imgUrl: string

    @IsString({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.UPDATE] })
    title: string

    @IsEnum(TitleType, { groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.UPDATE] })
    titleType: TitleType

    @IsArray({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.UPDATE] })
    @Type(() => ContentDataDto)
    content: ContentDataDto[]
} 