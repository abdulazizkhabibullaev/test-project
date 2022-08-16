import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Collections } from "../../../constants/collections";
import { BaseModel } from "../baseModel";
import { Topic } from "../topic/topic.model";

@modelOptions({
    schemaOptions: {
        collection: Collections.TEST
    }
})

@index(
{
    name: 1
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
    
    
export class Test extends BaseModel{
    @prop({ required: true })
    name: string

    @prop({ default: 0})
    questionCount?: number

    @prop({
        required: true,
        type: Types.ObjectId,
        ref: Collections.TOPIC
    })
    topicId: Ref<Topic>

    @prop({ required: true })
    duration: number
}

export const TestModel = getModelForClass(Test)