import { getModelForClass, index, modelOptions, prop } from "@typegoose/typegoose";
import { Collections } from "../../../constants/collections";
import { BaseModel } from "../baseModel";

export enum Gender{
    MALE = 'male',
    FEMALE = 'female'
}

@modelOptions({
    schemaOptions: {
        collection: Collections.USER
    }
})

@index({
    phoneNumber: 1
},
    {
        unique: true,
        background: true,
        name: "phoneNumber",
        partialFilterExpression: {
            isDeleted: {
                $eq: false
            }
        }
    }
)

export class User extends BaseModel{
    @prop({ required: true})
    phoneNumber: string

    @prop({ required: true, trim: true })
    firstName: string

    @prop({ required: true, trim: true })
    lastName: string

    @prop({ required: true, trim: true })
    password: string

    @prop({ required: true, trim: true })
    address: string

    @prop({
        enum: Gender,
        type: String,
        default: Gender.MALE,
        required: true
    })
    gender: Gender
}

export const UserModel = getModelForClass(User)