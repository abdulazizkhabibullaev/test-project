import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Collections } from "../../../constants/collections";
import { ObjectId } from "../../../types/types";
import { BaseModel } from "../baseModel";
import { Role } from "../roles/role.model";

@modelOptions({
    schemaOptions: {
        collection: Collections.EMPLOYEE
    }
})

@index(
    {
        phoneNumber: 1,
    },
    {
        unique: true,
        background: true,
        name: "phoneNumber",
        partialFilterExpression: {
            isDeleted: {
                $eq: false,
            },
        },
    }
)

export class Employee extends BaseModel {
    @prop({ required: true, trim: true })
    fullName: string

    @prop({ required: true, trim: true })
    phoneNumber: string

    @prop({ required: true, trim: true })
    password: string

    @prop({
        required: true,
        ref: Collections.ROLE,
        type: ObjectId
    })
    roleId: Ref<Role>
}
export const EmployeeModel = getModelForClass(Employee)