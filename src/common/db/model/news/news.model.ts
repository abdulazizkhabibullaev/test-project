import { getModelForClass, index, modelOptions, prop } from "@typegoose/typegoose";
import { Collections } from "../../../constants/collections";
import { BaseModel } from "../baseModel";

export enum ContentType {
    TEXT = 'text',
    VIDEO = 'video',
    IMAGE = 'img',
    LIST = 'list',
    LINK = 'link'
}
export enum Alignment {
    START = 'left',
    END = 'right',
    CENTER = 'center'
}
export enum ListIndicator {
    DOT = 'dot',
    NUMBER = 'number'
}

export enum TitleType {
    PARENTS = 'parents',
    TEACHER = 'teahers',
    STUDENT = 'students'
}

export enum Languages{
    UZ = 'uzbek',
    EN = 'english',
    RU = 'russian'
}

export class ContentData {
    @prop({
        default: undefined
    })
    newLine: boolean;

    @prop({
        enum: ContentType,
        type: String
    })
    type: ContentType;

    @prop({
        default: undefined
    })
    bold: boolean;

    @prop({
        default: undefined
    })
    underline: boolean;

    @prop({
        default: undefined
    })
    italic: boolean;

    @prop({
        default: undefined
    })
    strikethrough: boolean;

    @prop({
        default: undefined,
        trim: true
    })
    value: string;

    @prop({
        default: 14
    })
    size: number;

    @prop({
        enum: Alignment,
        type: String
    })
    align: Alignment;

    @prop({
        default: undefined
    })
    sup: boolean;

    @prop({
        default: undefined
    })
    sub: boolean;

    @prop({
        default: undefined,
        trim: true
    })
    href: string;

    @prop({
        default: undefined
    })
    items: any[];

    @prop({
        default: undefined,
        type: String,
        enum: ListIndicator
    })
    listIndicator: ListIndicator
}

@modelOptions({
    schemaOptions: {
        collection: Collections.NEWS
    }
})

@index({
    title: 1
},
    {
        unique: true,
        name: "name",
        background: true,
        partialFilterExpression: {
            isDeleted: {
                $eq: false
            }
        }
    }
)

export class News extends BaseModel {
    @prop({ required: true })
    language: Languages

    @prop({ required: true })
    imgUrl?: string

    @prop({ required: true, trim: true })
    title: string

    @prop({ required: true, trim: true })
    titleType: TitleType

    @prop({
        required: true,
        type: () => [ContentData]
    })
    content: ContentData[]

    @prop({ default: 0 })
    viewCount?: number
}

export const NewsModel = getModelForClass(News)