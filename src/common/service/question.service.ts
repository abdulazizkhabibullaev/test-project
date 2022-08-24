import { ModelType } from "@typegoose/typegoose/lib/types";
import { QueryOptions, Types } from "mongoose";
import { Collections } from "../../common/constants/collections";
import { QuestionResponse } from "../../common/db/model/tests/questions/question.error";
import { Question, QuestionModel } from "../../common/db/model/tests/questions/question.model";
import { CommonServices } from "../../common/service/common.service";
import { PagingDto } from "../../common/validation/dto/paging.dto";
import { QuestionDto } from "../../common/validation/dto/question.dto";
import { TestDto } from "../../common/validation/dto/test.dto";


class QuestionService extends CommonServices<Question>{
    constructor(model: ModelType<Question>) {
        super(model)
    }

    public async create(data: QuestionDto) {
        try {
            return await super.create(data)
        } catch (e) {
            if (e.code == 11000) throw QuestionResponse.AlreadyExist(Object.keys(e.keyPattern))
            throw e
        }
    }

    public async getPaging(testId, data: PagingDto) {
        let query = {
            isDeleted: false,
            testId: new Types.ObjectId(testId),
        }


        const $project = {
            $project: {
                question: 1,
                answers: {
                    $map: {
                        input: {
                            $filter: {
                                input: "$answers",
                                as: "answer",
                                cond: {
                                    $and: [
                                        { $eq: ["$$answer.isCorrect", true] }
                                    ]
                                }
                            },
                        },
                        as: "el",
                        in: "$$el._id"
                    }
                },
            }
        }

        const $pipeline = [$project]

        return await this.findPaging(query, data, $pipeline)
    }

    public async update(id, data: TestDto, options?: QueryOptions) {
        try {
            return await super.updateOne(id, data, options)
        } catch (e) {
            if (e.code == 11000) throw QuestionResponse.AlreadyExist(Object.keys(e.keyPattern))
            throw e
        }
    }

    public async getById(id: string) {
        const $match = {
            $match: {
                _id: new Types.ObjectId(id),
                isDeleted: false
            }
        }
        const $lookup = {
            $lookup: {
                from: Collections.TEST,
                foreignField: "_id",
                localField: "testId",
                as: "test"
            }
        }
        const $unwind = {
            $unwind: {
                path: "$test",
                preserveNullAndEmptyArrays: true
            }
        }
        const $project = {
            $project: {
                test: {
                    name: 1,
                    questionCount: 1,
                    duration: 1
                },
                question: 1,
                answers: {
                    _id: 1,
                    isCorrect: 1,
                    answer: 1,
                },
            }
        }
        const $pipeline = [$match, $lookup, $unwind, $project]
        const data = await this.aggregate($pipeline)
        if (!data || !data[0]) throw QuestionResponse.NotFound(id);
        return data[0];
    }
}

export const questionService = new QuestionService(QuestionModel)