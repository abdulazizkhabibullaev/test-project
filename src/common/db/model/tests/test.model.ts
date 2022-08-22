import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Collections } from "../../../constants/collections";
import { BaseModel } from "../baseModel";
import { Chapter } from "../subject/chapter/chapter.model";
import { Class } from "../subject/class/class.model";
import { Subject } from "../subject/subject.model";
import { Topic } from "../subject/topic/topic.model";

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
        ref: Collections.CLASS
    })
    classId: Ref<Class>

    @prop({
        type: Types.ObjectId,
        ref: Collections.TOPIC
    })
    topicId?: Ref<Topic>

    @prop({
        type: Types.ObjectId,
        ref: Collections.SUBJECT
    })
    subjectId?: Ref<Subject>

    @prop({
        type: Types.ObjectId,
        ref: Collections.CHAPTER
    })
    chapterId?: Ref<Chapter>

    @prop({ required: true })
    duration: number
}

export const TestModel = getModelForClass(Test)