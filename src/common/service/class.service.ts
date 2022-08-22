import { ModelType } from "@typegoose/typegoose/lib/types";
import { QueryOptions, Types } from "mongoose";
import { Collections } from "../../common/constants/collections";
import { ClassResponse } from "../db/model/subject/class/class.error";
import { Class, ClassModel } from "../db/model/subject/class/class.model";
import { Employee } from "../../common/db/model/employee/employee.model";
import { CommonServices } from "../../common/service/common.service";
import { ClassDto } from "../../common/validation/dto/class.dto";
import { PagingDto } from "../../common/validation/dto/paging.dto";


class ClassService extends CommonServices<Class>{
    constructor(model: ModelType<Class>) {
        super(model)
    }
    public async create(data: ClassDto) {
        try {
            return await super.create(data)
        } catch (e) {
            if (e.code == 11000) throw ClassResponse.AlreadyExist(Object.keys(e.keyPattern))
            throw e
        }
    }
    public async getPaging(data: PagingDto) {

        let query = {
            isDeleted: false
        }

        const $project = {
            $project: {
                _id: 1,
                classNumber: 1
            }
        }
        const $pipeline = [$project]
        return await this.findPaging(query, data, $pipeline)
    }

    public async update(id, data: ClassDto, options?: QueryOptions) {
        try {
            return await super.updateOne(id, data, options)
        } catch (e) {
            if (e.code == 11000) throw ClassResponse.AlreadyExist(Object.keys(e.keyPattern))
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
           
            const $project = {
                $project: {
                    classNumber: 1
                }
            }
            const $pipeline = [$match, $project]
            const data = await this.aggregate($pipeline)
            if (!data || !data[0]) throw ClassResponse.NotFound(id);
            return data[0];
        } catch (error) {
            return error
        }
    }
}

export const classService = new ClassService(ClassModel)