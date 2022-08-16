import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Collections } from "../../../constants/collections";
import { BaseModel } from "../baseModel";
import { Class } from "../class/class.model";


@modelOptions({
    schemaOptions: {
        collection: Collections.SUBJECT
    }
})

@index(
    { name: 1 },
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

export class Subject extends BaseModel{
    @prop({ required: true })
    name: string

    @prop(
        {
            required: true,
            type: Types.ObjectId,
            ref: Collections.CLASS
        })
    classId: Ref<Class>[]
}

export const SubjectModel = getModelForClass(Subject)
