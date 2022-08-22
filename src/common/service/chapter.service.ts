import { ModelType } from "@typegoose/typegoose/lib/types";
import { QueryOptions, Types } from "mongoose";
import { Collections } from "../constants/collections";
import { ChapterResponse } from "../db/model/subject/chapter/chapter.error";
import { Chapter, ChapterModel } from "../db/model/subject/chapter/chapter.model";
import { CommonServices } from "./common.service";
import { ChapterDto } from "../validation/dto/chapter.dto";
import { PagingDto } from "../validation/dto/paging.dto";


class ChapterService extends CommonServices<Chapter>{
    constructor(model: ModelType<Chapter>) {
        super(model)
    }

    public async create(data: ChapterDto) {
        try {
            return await super.create(data)
        } catch (e) {
            if (e.code == 11000) throw ChapterResponse.AlreadyExist(Object.keys(e.keyPattern))
            throw e
        }
    }

    public async getPaging(data: PagingDto) {
        let query = {
            isDeleted: false
        }

        const $lookup = {
            $lookup: {
                from: Collections.SUBJECT,
                foreignField: "_id",
                localField: "subjectId",
                as: "subject"
            }
        }
        const $unwind = {
            $unwind: {
                path: "$subject",
                preserveNullAndEmptyArrays: true
            }
        }
        const $project = {
            $project: {
                _id: 1,
                name: 1,
                subject: {
                    _id: 1,
                    name: 1,
                },
            }
        }
        const $pipeline = [$lookup, $unwind, $project]
        return await this.findPaging(query, data, $pipeline)
    }

    public async update(id, data: ChapterDto, options?: QueryOptions) {
        try {
            return await super.updateOne(id, data, options)
        } catch (e) {
            if (e.code == 11000) throw ChapterResponse.AlreadyExist(Object.keys(e.keyPattern))
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
                    from: Collections.SUBJECT,
                    foreignField: "_id",
                    localField: "subjectId",
                    as: "subject"
                }
            }
            const $unwind = {
                $unwind: {
                    path: "$subject",
                    preserveNullAndEmptyArrays: true
                }
            }
            const $project = {
                $project: {
                    name: 1,
                    subject: {
                        _id: 1,
                        name: 1
                    }
                }
            }
            const $pipeline = [$match, $lookup, $unwind, $project]
            const data = await this.aggregate($pipeline)
            if (!data || !data[0]) throw ChapterResponse.NotFound(id);
            return data[0];
        } catch (error) {
            return error
        }
    }

    public async getBySubjectId(id) {
        try {
            const $match = {
                $match: {
                    "subjectId": new Types.ObjectId(id),
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

export const chapterService = new ChapterService(ChapterModel);