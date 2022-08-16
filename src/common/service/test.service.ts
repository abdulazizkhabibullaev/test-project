import { ModelType } from "@typegoose/typegoose/lib/types";
import { QueryOptions, Types } from "mongoose";
import { Collections } from "../../common/constants/collections";
import { TestResponse } from "../../common/db/model/tests/test.error";
import { Test, TestModel } from "../../common/db/model/tests/test.model";
import { CommonServices } from "../../common/service/common.service";
import { TestDto } from "../../common/validation/dto/test.dto";
import { PagingDto } from "../../common/validation/dto/paging.dto";
import { testResultService } from "./testResult.service";


class TestService extends CommonServices<Test>{
    constructor(model: ModelType<Test>) {
        super(model)
    }

    public async create(data: TestDto) {
        try {
            return await super.create(data)
        } catch (e) {
            if (e.code == 11000) throw TestResponse.AlreadyExist(Object.keys(e.keyPattern))
            throw e
        }
    }

    public async getPaging(dto, data) {
        try {
            const { topicId, subjectId, chapterId, classId } = data

            let $match = {
                $match: {
                    $or: [
                        { topicId: new Types.ObjectId(topicId) },
                        { "topic.chapterId": new Types.ObjectId(chapterId) },
                        { "chapter.subjectId": new Types.ObjectId(subjectId) },
                        { "subject.classId": new Types.ObjectId(classId) }
                    ]
                }
            }

            let newQuery = {
                isDeleted: false
            }

            const $topicLookup = {
                $lookup: {
                    from: Collections.TOPIC,
                    foreignField: "_id",
                    localField: "topicId",
                    as: "topic"
                }
            }
            const $topicUnwind = {
                $unwind: {
                    path: "$topic",
                    preserveNullAndEmptyArrays: true
                }
            }

            const $chapterLookup = {
                $lookup: {
                    from: Collections.CHAPTER,
                    foreignField: "_id",
                    localField: "topic.chapterId",
                    as: "chapter"
                }
            }
            const $chapterUnwind = {
                $unwind: {
                    path: "$chapter",
                    preserveNullAndEmptyArrays: true
                }
            }

            const $subjectLookup = {
                $lookup: {
                    from: Collections.SUBJECT,
                    foreignField: "_id",
                    localField: "chapter.subjectId",
                    as: "subject"
                }
            }
            const $subjectUnwind = {
                $unwind: {
                    path: "$subject",
                    preserveNullAndEmptyArrays: true
                }
            }

            const $classLookup = {
                $lookup: {
                    from: Collections.CLASS,
                    foreignField: "_id",
                    localField: "subject.classId",
                    as: "class"
                }
            }

            const $classUnwind = {
                $unwind: {
                    path: "$class",
                    preserveNullAndEmptyArrays: true
                }
            }

            const $sort = {
                $sort: {
                    createdAt: -1
                }
            }
            const $project = {
                $project: {
                    name: 1,
                    questionCount: 1,
                    duration: 1,
                    createdAt: 1
                }
            }
            const $pipeline = [$topicLookup, $topicUnwind, $chapterLookup, $chapterUnwind, $subjectLookup, $subjectUnwind, $classLookup, $classUnwind, $match, $sort, $project]
            let result = await this.findPaging(newQuery, dto, $pipeline)

            if (!result.length) result = await this.findPaging(newQuery, dto, [$sort, $project])

            for (let data of result) {
                const averageResult = await testResultService.avarageResult(data._id)
                data.averageResult = averageResult
            }

            return result
        } catch (error) {
            throw error
        }
    }

    public async update(id, data: TestDto, options?: QueryOptions) {
        try {
            return await super.updateOne(id, data, options)
        } catch (e) {
            if (e.code == 11000) throw TestResponse.AlreadyExist(Object.keys(e.keyPattern))
            throw e
        }
    }

    public async getById(id: string) {
        try {
            const $match = {
                $match: {
                    _id: new Types.ObjectId(id),
                    isDeleted: false
                }
            }
            const $lookup = {
                $lookup: {
                    from: Collections.TOPIC,
                    foreignField: "_id",
                    localField: "topicId",
                    as: "topic"
                }
            }
            const $unwind = {
                $unwind: {
                    path: "$topic",
                    preserveNullAndEmptyArrays: true
                }
            }
            const $project = {
                $project: {
                    name: 1,
                    questionCount: 1,
                    duration: 1,
                    topic: {
                        name: 1
                    }
                }
            }
            const $pipeline = [$match, $lookup, $unwind, $project]
            const data = await this.aggregate($pipeline)
            if (!data || !data[0]) throw TestResponse.NotFound(id);

            const averageResult = await testResultService.avarageResult(id)
            const maxResult = await testResultService.maxResult(id)
            const userCount = await testResultService.userCount(id)
            
            data[0].userCount = userCount
            data[0].averageResult = averageResult
            data[0].maxResult = maxResult


            return data;
        } catch (error) {
            return error
        }
    }
}

export const testService = new TestService(TestModel);

