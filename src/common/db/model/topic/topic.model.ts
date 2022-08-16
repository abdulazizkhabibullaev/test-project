import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Collections } from "../../../constants/collections";
import { BaseModel } from "../baseModel";
import { Chapter } from "../chapter/chapter.model";


@modelOptions({
    schemaOptions: {
        collection: Collections.TOPIC
    }
})

@index(
    {
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

export class Topic extends BaseModel{
    @prop({ required: true })
    name: string

    @prop({
        type: Types.ObjectId,
        ref: Collections.CHAPTER
    })
    chapterId: Ref<Chapter>
}

export const TopicModel = getModelForClass(Topic)