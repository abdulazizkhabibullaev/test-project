import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Collections } from "../../../../constants/collections";
import { BaseModel } from "../../baseModel";
import { User } from "../../user/user.model";
import { Question } from "../questions/question.model";

@modelOptions({
    schemaOptions: {
        collection: Collections.SOLVE_TESTS
    }
})

export class SolveTest extends BaseModel{
    @prop({
        type: Types.ObjectId,
        ref: Collections.USER
    })
    userId: Ref<User>
    
    @prop({
        required: true,
        type: Types.ObjectId,
        ref: Collections.QUESTION
    })
    questionId: Ref<Question>

    @prop({
        required: true,
        type: Types.ObjectId,
        ref: Collections.QUESTION,
        default: null
    })
    answerId: Types.ObjectId
}

export const SolveTestModel = getModelForClass(SolveTest)

