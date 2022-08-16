import { ModelType } from "@typegoose/typegoose/lib/types"
import { QueryOptions, Types } from "mongoose"
import { Collections } from "../constants/collections"
import { TestResult, TestResultModel } from "../db/model/tests/testResults/testResult.model"
import { TestResultDto } from "../validation/dto/testResult.dto"
import { CommonServices } from "./common.service"

class TestResultService extends CommonServices<TestResult>{
    constructor(model: ModelType<TestResult>) {
        super(model)
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
        try {
            let $match = {
                $match: {
                    testId: new Types.ObjectId(testId),
                    isDeleted: false
                }
            }
            const result = await testResultService.aggregate([$match])
            let scores = []

            result.forEach(e => scores.push(e.result))

            const average = scores.reduce((a, b) => a + b, 0) / scores.length

            return average
        } catch (error) {
            return error
        }
    }

    public async maxResult(testId) {
        try {
            let $match = {
                $match: {
                    testId: new Types.ObjectId(testId),
                    isDeleted: false
                }
            }
            let $sort = {
                $sort: {
                    result: -1
                }
            }
            const result = (await testResultService.aggregate([$match, $sort]))[0]

            return result.result
        } catch (error) {
            return error
        }
    }

    public async userCount(testId) {
        try {
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
        } catch (error) {
            return error
        }
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

        const lastWeek = new Date(new Date().getTime() - 1000 * 3600 * 24 * 7)
        const week = result.filter(e => e.finishedAt > lastWeek)

        let scores = []

        week.forEach(e => scores.push(e.result))

        const weekAverage = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed()

        scores = []
        
        result.forEach(e => scores.push(e.result))

        const average = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed()

        const data = {
            testCount: testCount,
            weekAverage: weekAverage,
            totalAverage: average
        }

        return data
    }
}

export const testResultService = new TestResultService(TestResultModel)