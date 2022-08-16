import { getModelForClass, index, modelOptions, prop } from "@typegoose/typegoose";
import { Collections } from "../../../constants/collections";
import { BaseModel } from "../baseModel";


@modelOptions({
    schemaOptions: {
        collection: Collections.ROLE
    }
})

@index({
    name: 1
},
    {
        unique: true,
        name: "name",
        background: true,
        partialFilterExpression: {
            isDeleted: {
                $eq: false,
                $type: "bool"
            }
        }
    }
)

@index({
    isDeleted: 1
},
    {
        background: true,
        name: "deleted",
        partialFilterExpression: {
            isDeleted: {
                $eq: false
            }
        }
    }
)

export class Role extends BaseModel{
    @prop({
        trim: true,
        required: true
    })
    name: string

    @prop({
        trim: true,
        required: true
    })
    description: string
    //role
    @prop({ default: false })
    role?: boolean
    
    @prop({ default: false })
    roleCreate: boolean

    @prop({ default: false })
    roleUpdate: boolean

    @prop({ default: false })
    roleDelete: boolean

    //subject
    @prop({ default: false })
    subject: boolean

    @prop({ default: false })
    subjectCreate: boolean

    @prop({ default: false })
    subjectUpdate: boolean

    @prop({ default: false })
    subjectDelete: boolean

    //test
    @prop({ default: false })
    test: boolean

    @prop({ default: false })
    testCreate: boolean

    @prop({ default: false })
    testUpdate: boolean

    @prop({ default: false })
    testDelete: boolean

    //news
    @prop({ default: false })
    news: boolean

    @prop({ default: false })
    newsCreate: boolean

    @prop({ default: false })
    newsUpdate: boolean

    @prop({ default: false })
    newsDelete: boolean

    //employee
    @prop({ default: false })
    employee: boolean

    @prop({ default: false })
    employeeCreate: boolean

    @prop({ default: false })
    employeeUpdate: boolean

    @prop({ default: false })
    employeeDelete: boolean

    @prop({ default: false })
    class: boolean

    @prop({ default: false })
    classCreate: boolean

    @prop({ default: false })
    classUpdate: boolean

    @prop({ default: false })
    classDelete: boolean

    @prop({ default: false })
    chapter: boolean

    @prop({ default: false })
    chapterCreate: boolean

    @prop({ default: false })
    chapterUpdate: boolean

    @prop({ default: false })
    chapterDelete: boolean

    @prop({ default: false })
    topic: boolean

    @prop({ default: false })
    topicCreate: boolean

    @prop({ default: false })
    topicUpdate: boolean

    @prop({ default: false })
    topicDelete: boolean

    @prop({ default: false })
    question: boolean

    @prop({ default: false })
    questionCreate: boolean

    @prop({ default: false })
    questionUpdate: boolean

    @prop({ default: false })
    questionDelete: boolean

    @prop({ default: false })
    answer: boolean

    @prop({ default: false })
    answerCreate: boolean

    @prop({ default: false })
    answerUpdate: boolean

    @prop({ default: false })
    answerDelete: boolean
}

export const RoleModel = getModelForClass(Role)