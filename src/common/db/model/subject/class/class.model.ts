import { getModelForClass, index, modelOptions, prop } from "@typegoose/typegoose";
import { Collections } from "../../../../constants/collections";
import { BaseModel } from "../../baseModel";


@modelOptions({
    schemaOptions: {
        collection: Collections.CLASS
    }
})

@index(
    { number: 1 },
    {
        unique: true,
        background: true,
        name: "number",
        partialFilterExpression: { isDeleted: { $eq: false } }
    }
)

export class Class extends BaseModel {
    @prop({ required: true })
    number: string
}

export const ClassModel = getModelForClass(Class)