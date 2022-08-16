import { ModelType } from "@typegoose/typegoose/lib/types";
import { Types } from "mongoose";
import { SolveTestResponse } from "../db/model/tests/solveTests/solveTests.error";
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
            const question = await questionService.findById(data.questionId)

            let startedAt = (await testResultService.find({ userId: data.userId, status: Status.STARTED, testId: question.testId }))
            if (!startedAt.length) throw SolveTestResponse.Finished(question.testId)
            const limit = (await testService.findById(question.testId)).duration
            let start = startedAt[0].startedAt
            console.log(start.getTime())
            if (new Date() > new Date(start.getTime() + 1000 * 60 * limit)) return

            const $match = {
                $match: {
                    userId: new Types.ObjectId(data.userId),
                    questionId: new Types.ObjectId(data.questionId),
                    createdAt: { $gte: new Date(start), $lt: new Date(start.getTime() + 1000 * 60 * limit) }
                }
            }
            const isDuplicate = await solveTestService.aggregate([$match])

            if (isDuplicate.length) return await this.updateOne(isDuplicate[0]._id, data)

            return await super.create(data)
        } catch (error) {
            throw error
        }
    }

    public async checkTest(testId, userId) {
        try {
            const startedAt = (await testResultService.find({ userId: new Types.ObjectId(userId), status: Status.STARTED, testId: new Types.ObjectId(testId) }))[0].startedAt

            let $userMatch = {
                $match: {
                    userId: new Types.ObjectId(userId),
                    createdAt: { $gte: new Date(startedAt) }
                }
            }

            const userAnswers = await this.aggregate([$userMatch])

            for (let item of userAnswers) {

                let $match = {
                    $match: {
                        _id: new Types.ObjectId(item.questionId)
                    }
                }

                const answers = (await questionService.aggregate([$match]))[0].answers

                const trueAnswer = answers.filter(e => e.isCorrect == true)

                let query = { $inc: { score: 1 } }

                let $testMatch = {
                    $match: {
                        testId: new Types.ObjectId(testId),
                        userId: new Types.ObjectId(userId),
                        status: Status.STARTED
                    }
                }

                const test = (await testResultService.aggregate([$testMatch]))[0]

                if ((trueAnswer[0]._id).toString() == (item.answerId).toString()) {
                    await testResultService.updateOne(new Types.ObjectId(test._id), query)
                }
            }

            return
        } catch (error) {
            throw error
        }
    }

    public async findStatus(questionId) {
        try {
            const question = await questionService.findById(questionId)

            let $match = {
                $match: {
                    "testId": question.testId
                }
            }
            const result = await testResultService.aggregate([$match])
            if (!result.length) {
                return Status.PENDING
            }
            return result[0].status
        } catch (error) {
            throw error
        }
    }

    public async finishTest(data) {
        try {
            const testResult = (await testResultService.find({ testId: data.testId, userId: data.userId, status: Status.STARTED }))[0]

            await testResultService.updateOne(testResult._id, data)

            const questionCount = (await testService.findById(data.testId)).questionCount
            const $match = {
                $match: {
                    _id: testResult._id
                }
            }
            const $time = {
                $project: {
                    _id: 0,
                    duration: {
                        $dateDiff: {
                            startDate: "$startedAt",
                            endDate: "$finishedAt",
                            unit: "second"
                        }
                    }
                }
            }
            const spendTime = await testResultService.aggregate([$match, $time])

            const percent = parseInt((testResult.score * 100 / questionCount).toFixed())

            await testResultService.updateOne(testResult._id, { result: percent })

            const statistics = {
                questions: questionCount,
                spendTime: spendTime[0].duration,
                trueAnswers: testResult.score,
                result: percent
            }
            return statistics
        } catch (error) {
            throw error
        }
    }
}

export const solveTestService = new SolveTestService(SolveTestModel)
