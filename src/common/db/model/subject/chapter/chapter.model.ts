import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Collections } from "../../../../constants/collections";
import { BaseModel } from "../../baseModel";
import { Subject } from "../subject.model";


@modelOptions({
    schemaOptions: {
        collection: Collections.CHAPTER
    }
})

@index({
    name: 1
},
    {
        unique: true,
        background: true,
        name: "name",
        partialFilterExpression: {
            isDeleted: {
                $eq: false
            }
        }
    }
)

export class Chapter extends BaseModel{
    @prop({ required: true })
    name: string

    @prop({
        required: true,
        type: Types.ObjectId,
        ref: Collections.SUBJECT
    })
    subjectId: Ref<Subject>
}

export const ChapterModel = getModelForClass(Chapter)