import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Collections } from "../../../../constants/collections";
import { BaseModel } from "../../baseModel";
import { Test } from "../test.model";


class Answer {
    @prop({
        required: true,
        default: false
    })
    isCorrect: boolean

    @prop({ required: true })
    answer: string

    @prop({ required: false })
    imgUrl?: string
}

@modelOptions({
    schemaOptions: {
        collection: Collections.QUESTION
    }
})

export class Question extends BaseModel{
    @prop({
        required: true,
        type: Types.ObjectId,
        ref: Collections.TEST
    })
    testId: Ref<Test>

    @prop({ required: true })
    question: string

    @prop({ required: false })
    imgUrl?: string

    @prop({
        required: true,
        type: ()=>[Answer]
    })
    answers: Answer[]
}

export const QuestionModel = getModelForClass(Question)

