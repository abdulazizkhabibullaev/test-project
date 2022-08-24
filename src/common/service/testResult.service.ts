import { ModelType } from "@typegoose/typegoose/lib/types"
import { Types } from "mongoose"
import { Collections } from "../constants/collections"
import { TestResultResponse } from "../db/model/tests/testResults/testResult.error"
import { TestResult, TestResultModel } from "../db/model/tests/testResults/testResult.model"
import { CommonServices } from "./common.service"
import { testService } from "./test.service"

class TestResultService extends CommonServices<TestResult>{
    constructor(model: ModelType<TestResult>) {
        super(model)
    }

    public async create(data) {
        try {
            return await super.create(data)
        } catch (e) {
            if (e.code == 11000) throw TestResultResponse.NotFinished(Object.keys(e.keyPattern))
            throw e
        }
    }

    public async lastTestResult(id) {
        const $match = {
            $match: {
                _id: new Types.ObjectId(id)
            }
        }
        const $project = {
            $project: {
                _id: 1,
                duration: {
                    $dateDiff: {
                        startDate: "$startedAt",
                        endDate: "$finishedAt",
                        unit: "second"
                    }
                },
                userId: 1,
                testId: 1,
                score: 1,
                result: 1
            }
        }

        const test = (await testResultService.aggregate([$match, $project])).shift()

        const questionCount = (await testService.findById(test.testId)).questionCount

        const statistics = {
            ...test,
            questions: questionCount
        }
        return statistics
    }

    public async testResults(testId) {
        let $match = {
            $match: {
                testId: new Types.ObjectId(testId),
                isDeleted: false
            }
        }
        let $lookup = {
            $lookup: {
                from: Collections.USER,
                foreignField: "_id",
                localField: "userId",
                as: "user"
            }
        }
        let $unwind = {
            $unwind: {
                path: "$user"
            }
        }
        let $sort = {
            $sort: {
                result: -1
            }
        }
        let $project = {
            $project: {
                user: {
                    firstName: 1
                },
                result: 1,
                finishedAt: 1
            }
        }
        const result = await testResultService.aggregate([$match, $lookup, $unwind, $sort, $project])

        return result
    }

    public async avarageResult(testId) {
        let $group = {
            $group: {
                _id: "$testId",
                avg: { $avg: "$result" }
            }
        }
        let $match = {
            $match: {
                testId: new Types.ObjectId(testId),
                isDeleted: false
            }
        }
        const result = await testResultService.aggregate([$match, $group])

        return result.shift()
    }

    public async maxResult(testId) {
        let $group = {
            $group: {
                _id: "$testId",
                max: { $max: "$result" }
            }
        }
        let $match = {
            $match: {
                testId: new Types.ObjectId(testId),
                isDeleted: false
            }
        }
        const result = await testResultService.aggregate([$match, $group])

        return result.shift()
    }

    public async userCount(testId) {
        let $match = {
            $match: {
                testId: new Types.ObjectId(testId),
                isDeleted: false
            }
        }
        let $group = {
            $group: {
                _id: "$userId",
            }
        }
        const result = await this.aggregate([$match, $group])
        return result.length
    }

    public async myResults(userId) {
        let $match = {
            $match: {
                userId: new Types.ObjectId(userId),
                isDeleted: false
            }
        }
        let $lookup = {
            $lookup: {
                from: Collections.TEST,
                foreignField: "_id",
                localField: "testId",
                as: "test"
            }
        }
        let $unwind = {
            $unwind: {
                path: "$test"
            }
        }
        let $project = {
            $project: {
                test: {
                    name: 1
                },
                startedAt: 1,
                finishedAt: 1,
                result: 1,
                score: 1
            }
        }
        return await this.aggregate([$match, $lookup, $unwind, $project])
    }


    public async statistics(userId) {

        const result = await this.myResults(userId)

        const testCount = result.length

        let $match = {
            $match: {
                userId: new Types.ObjectId(userId)
            }
        }

        const $group = {
            $group: {
                _id: "$userId",
                avg: { $avg: "$result" }
            }
        }
        const totalAverage = (await this.aggregate([$match, $group])).shift()

        const lastWeek = new Date(new Date().getTime() - 1000 * 3600 * 24 * 7)

        const $weekMatch = {
            $match: {
                userId: new Types.ObjectId(userId),
                finishedAt: { $gte: lastWeek }
            }
        }

        const weekAverage = (await this.aggregate([$weekMatch, $group])).shift()

        const data = {
            testCount: testCount,
            weekAverage: weekAverage.avg,
            totalAverage: totalAverage.avg
        }

        return data
    }
}

export const testResultService = new TestResultService(TestResultModel)