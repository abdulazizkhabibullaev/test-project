import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Collections } from "../../../constants/collections";
import { ObjectId } from "../../../types/types";
import { BaseModel } from "../baseModel";
import { User } from "../user/user.model";


@modelOptions({
    schemaOptions: {
        collection: Collections.MESSAGE
    }
})

export class Message extends BaseModel{
    @prop({
        required: true,
        ref: Collections.MESSAGE,
        type: ObjectId
    })
    userId: Ref<User>

    @prop({ required: true })
    message: string
}

export const  MessageModel = getModelForClass(Message)