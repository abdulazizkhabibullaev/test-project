import { ModelType } from "@typegoose/typegoose/lib/types";
import { QueryOptions, Types } from "mongoose";
import { Collections } from "../../common/constants/collections";
import { SubjectResponse } from "../../common/db/model/subject/subject.error";
import { Subject, SubjectModel } from "../../common/db/model/subject/subject.model";
import { CommonServices } from "../../common/service/common.service";
import { SubjectDto } from "../../common/validation/dto/subject.dto";
import { PagingDto } from "../../common/validation/dto/paging.dto";


class SubjectService extends CommonServices<Subject>{
    constructor(model: ModelType<Subject>) {
        super(model)
    }

    public async create(data: SubjectDto) {
        try {
            return await super.create(data)
        } catch (e) {
            if (e.code == 11000) throw SubjectResponse.AlreadyExist(Object.keys(e.keyPattern))
            throw e
        }
    }

    public async getPaging(data: PagingDto, classId?) {
        let query = {
            isDeleted: false
        }

        let newQuery = {
            isDeleted: false,
            classId: new Types.ObjectId(classId)
        }

        const $lookup = {
            $lookup: {
                from: Collections.CLASS,
                foreignField: "_id",
                localField: "classId",
                as: "class"
            }
        }
        const $unwind = {
            $unwind: {
                path: "$class",
                preserveNullAndEmptyArrays: true
            }
        }
        const $project = {
            $project: {
                _id: 1,
                name: 1,
                class: {
                    _id: 1,
                    classNumber: 1,
                },
            }
        }
        const $pipeline = [$lookup, $unwind, $project]
        
        return await this.findPaging(classId? newQuery : query, data, $pipeline)
    }

    public async update(id, data: SubjectDto, options?: QueryOptions) {
        try {
            return await super.updateOne(id, data, options)
        } catch (e) {
            if (e.code == 11000) throw SubjectResponse.AlreadyExist(Object.keys(e.keyPattern))
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
                    from: Collections.CLASS,
                    foreignField: "_id",
                    localField: "classId",
                    as: "class"
                }
            }
            const $unwind = {
                $unwind: {
                    path: "$class",
                    preserveNullAndEmptyArrays: true
                }
            }
            const $project = {
                $project: {
                    name: 1,
                    class: {
                        _id: 1,
                        classNumber: 1
                    }
                }
            }
            const $pipeline = [$match, $lookup, $unwind, $project]
            const data = await this.aggregate($pipeline)
            if (!data || !data[0]) throw SubjectResponse.NotFound(id);
            return data[0];
        } catch (error) {
            return error
        }
    }

    public async getByClassId(id) {
        try {
            const $match = {
                $match: {
                    "classId": new Types.ObjectId(id)
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

export const subjectService = new SubjectService(SubjectModel);