import { ModelType } from "@typegoose/typegoose/lib/types";
import { QueryOptions, Types } from "mongoose";
import { Collections } from "../../common/constants/collections";
import { TopicResponse } from "../../common/db/model/topic/topic.error";
import { Topic, TopicModel } from "../../common/db/model/topic/topic.model";
import { CommonServices } from "../../common/service/common.service";
import { TopicDto } from "../../common/validation/dto/topic.dto";
import { PagingDto } from "../../common/validation/dto/paging.dto";


class TopicService extends CommonServices<Topic>{
    constructor(model: ModelType<Topic>) {
        super(model)
    }

    public async create(data: TopicDto) {
        try {
            return await super.create(data)
        } catch (e) {
            if (e.code == 11000) throw TopicResponse.AlreadyExist(Object.keys(e.keyPattern))
            throw e
        }
    }

    public async getPaging(data: PagingDto) {
        let query = {
            isDeleted: false
        }

        const $lookup = {
            $lookup: {
                from: Collections.CHAPTER,
                foreignField: "_id",
                localField: "chapterId",
                as: "chapter"
            }
        }
        const $unwind = {
            $unwind: {
                path: "$chapter",
                preserveNullAndEmptyArrays: true
            }
        }
        const $project = {
            $project: {
                _id: 1,
                name: 1,
                chapter: {
                    _id: 1,
                    name: 1,
                },
            }
        }
        const $pipeline = [$lookup, $unwind, $project]
        return await this.findPaging(query, data, $pipeline)
    }

    public async update(id, data: TopicDto, options?: QueryOptions) {
        try {
            return await super.updateOne(id, data, options)
        } catch (e) {
            if (e.code == 11000) throw TopicResponse.AlreadyExist(Object.keys(e.keyPattern))
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
                    from: Collections.CHAPTER,
                    foreignField: "_id",
                    localField: "chapterId",
                    as: "chapter"
                }
            }
            const $unwind = {
                $unwind: {
                    path: "$chapter",
                    preserveNullAndEmptyArrays: true
                }
            }
            const $project = {
                $project: {
                    name: 1,
                    chapter: {
                        _id: 1,
                        name: 1
                    }
                }
            }
            const $pipeline = [$match, $lookup, $unwind, $project]
            const data = await this.aggregate($pipeline)
            if (!data || !data[0]) throw TopicResponse.NotFound(id);
            return data[0];
        } catch (error) {
            return error
        }
    }

    public async getByChapterId(id) {
        try {
            const $match = {
                $match: {
                    "chapterId": new Types.ObjectId(id),
                    isDeleted: false
                }
            }
            const $project = {
                $project: {
                    name: 1
                }
            }
            const $pipeline = [$match, $project]
            return await this.aggregate($pipeline)
        } catch (error) {
            return error
        }
    }
}

export const topicService = new TopicService(TopicModel);