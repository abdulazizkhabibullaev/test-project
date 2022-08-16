import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Collections } from "../../../../constants/collections";
import { BaseModel } from "../../baseModel";
import { User } from "../../user/user.model";
import { Test } from "../test.model";

export enum Status {
    STARTED = 'started',
    FINISHED = 'finished',
    PENDING = 'pending'
}

@modelOptions({
    schemaOptions: {
        collection: Collections.TEST_RESULT
    }
})

export class TestResult extends BaseModel{
    @prop({
        required: true,
        type: Types.ObjectId,
        ref: Collections.USER
    })
    userId: Ref<User>

    @prop({
        required: true,
        type: Types.ObjectId,
        ref: Collections.TEST
    })
    testId: Ref<Test>

    @prop({
        default: null
    })
    startedAt: Date

    @prop({default: null})
    finishedAt: Date

    @prop({ default: 0 })
    score: number

    @prop({
        enum: Status,
        type: String,
        default: Status.PENDING
    })
    status: Status;

    @prop({ default: 0 })
    result: number
}

export const TestResultModel = getModelForClass(TestResult)