import { ModelType } from "@typegoose/typegoose/lib/types";
import { Types } from "mongoose";
import { Collections } from "../constants/collections";
import { SolveTestResponse } from "../db/model/tests/solveTests/solveTests.error";
import { SolveTest, SolveTestModel } from "../db/model/tests/solveTests/solveTests.model";
import { Status } from "../db/model/tests/testResults/testResult.model";
import { SolveTestDto } from "../validation/dto/solveTest.dto";
import { CommonServices } from "./common.service";
import { testResultService } from "./testResult.service";


class SolveTestService extends CommonServices<SolveTest>{
    constructor(model: ModelType<SolveTest>) {
        super(model)
    }

    public async create(data: SolveTestDto) {
        const $match = {
            $match: {
                userId: data.userId,
                status: Status.STARTED
            }
        }

        const testResult = (await testResultService.aggregate([$match])).shift()

        const query = {
            userId: data.userId,
            questionId: data.questionId,
            createdAt: { $gte: new Date(testResult.startedAt) }
        }

        return await super.updateOneByQuery(
            query,
            data,
            { upsert: true, returnOriginal: false }
        )
    }

    public async checkTest(testId, userId) {
        const $match = {
            $match: {
                userId: userId,
                status: Status.STARTED
            }
        }
        const $lookup = {
            $lookup: {
                from: Collections.QUESTION,
                foreignField: "testId",
                localField: "testId",
                as: "questions"
            }
        }
        const $unwind = {
            $unwind: {
                path: "$questions",
                preserveNullAndEmptyArrays: true
            }
        }

        const $unwindAnswers = {
            $unwind: {
                path: '$questions.answers',
                preserveNullAndEmptyArrays: true
            }
        }

        const $matchCorrectAnswers = {
            $match: {
                'questions.answers.isCorrect': true
            }
        }

        const test = (await testResultService.aggregate([$match, $lookup, $unwind, $unwindAnswers, $matchCorrectAnswers]))
        if (!test.length) throw SolveTestResponse.Finished(testId)

        const $answerMatch = {
            $match: {
                userId: new Types.ObjectId(userId),
                createdAt: { $gte: new Date(test[0].startedAt) }
            }
        }

        const $project = {
            $project: {
                _id: 1,
                userId: 1,
                questionId: 1,
                answerId: 1,
                createdAt: 1,
                trueAnswer: {
                    $filter: {
                        input: test,
                        as: "trueAnswer",
                        cond: {
                            $and: [
                                { $eq: ["$$trueAnswer.questions._id", "$questionId"] },
                                { $eq: ["$$trueAnswer.questions.answers._id", "$answerId"] }
                            ]
                        }
                    }
                }
            }
        }

        const trueAnswers = await this.aggregate([$answerMatch, $project])

        let data = {
            score: trueAnswers.length,
            finishedAt: new Date(),
            status: Status.FINISHED,
            result: trueAnswers.length * 100 / test.length
        }
        return await testResultService.updateOne(test[0]._id, data)
    }
}

export const solveTestService = new SolveTestService(SolveTestModel)
