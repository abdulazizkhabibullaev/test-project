import { ModelType } from "@typegoose/typegoose/lib/types";
import { Types } from "mongoose";
import { SolveTest, SolveTestModel } from "../db/model/tests/solveTests/solveTests.model";
import { Status } from "../db/model/tests/testResults/testResult.model";
import { SolveTestDto } from "../validation/dto/solveTest.dto";
import { CommonServices } from "./common.service";
import { questionService } from "./question.service";
import { testService } from "./test.service";
import { testResultService } from "./testResult.service";


class SolveTestService extends CommonServices<SolveTest>{
    constructor(model: ModelType<SolveTest>) {
        super(model)
    }

    public async create(data: SolveTestDto) {
        try {
            const test = await testResultService.findOne({ userId: data.userId, status: Status.STARTED })

            const limit = (await testService.findById(test.testId)).duration
            
            if (new Date() > new Date(test.startedAt.getTime() + 1000 * 60 * limit)) return

            const $match = {
                $match: {
                    userId: new Types.ObjectId(data.userId),
                    questionId: new Types.ObjectId(data.questionId),
                    createdAt: { $gte: new Date(test.startedAt) }
                }
            }
            const isDuplicate = (await solveTestService.aggregate([$match])).shift()

            if (isDuplicate) return await this.updateOne(isDuplicate._id, data)

            return await super.create(data)
        } catch (error) {
            throw error
        }
    }

    public async checkTest(testId, userId) {
        try {
            const $match = {
                $match: {
                    testId: new Types.ObjectId(testId)
                }
            }
            const $project = {
                $project: {
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
                    }
                },
            }

            const $unwind = {
                $unwind: {
                    path: "$answers"
                }
            }
            const questions = await questionService.aggregate([$match, $project, $unwind])

            const test = await testResultService.findOne({ userId: userId, status: Status.STARTED })

            const $userProject = {
                $project: {
                    userId: 1,
                    createdAt: 1,
                    trueAnswer: {
                        $filter: {
                            input: questions,
                            as: "true",
                            cond: {
                                $and: [
                                    { $eq: ["$$true.answers", "$answerId"] }
                                ]
                            }
                        }
                    }
                }
            }

            let $userMatch = {
                $match: {
                    userId: new Types.ObjectId(userId),
                    createdAt: { $gte: new Date(test.startedAt) },
                    $expr: {
                        $and: [
                            { $size: "$trueAnswer" }
                        ]
                    }
                }
            }

            const userAnswers = await this.aggregate([$userProject, $userMatch])

            let data = {
                score: userAnswers.length,
                finishedAt: new Date(),
                status: Status.FINISHED,
                result: userAnswers.length *100/questions.length
            }
            return await testResultService.updateOne(test._id, data)
        } catch (error) {
            throw error
        }
    }
}

export const solveTestService = new SolveTestService(SolveTestModel)
