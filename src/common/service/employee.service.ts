import { ModelType } from "@typegoose/typegoose/lib/types";
import { QueryOptions, Types } from "mongoose";
import { Collections } from "../../common/constants/collections";
import { EmployeeResponse } from "../../common/db/model/employee/employee.error";
import { Employee, EmployeeModel } from "../../common/db/model/employee/employee.model";
import { CommonServices } from "../../common/service/common.service";
import { EmployeeDto } from "../../common/validation/dto/employee.dto";
import { PagingDto } from "../../common/validation/dto/paging.dto";


class EmployeeService extends CommonServices<Employee>{
    constructor(model: ModelType<Employee>) {
        super(model)
    }

    public async create(data: EmployeeDto) {
        try {
            return await super.create(data)
        } catch (e) {
            if (e.code == 11000) throw EmployeeResponse.AlreadyExist(Object.keys(e.keyPattern))
            throw e
        }
    }

    public async findByPhoneNumber(data: string) {
        try {
            const employee = await this.findOne({ phoneNumber: data })
            if (!employee) throw EmployeeResponse.NotFound(data)
            return employee
        } catch (error) {
            throw error
        }
    }

    public async getPaging(data: PagingDto) {
        let query = {
            isDeleted: false
        }

        const $lookup = {
            $lookup: {
                from: Collections.ROLE,
                foreignField: "_id",
                localField: "roleId",
                as: "role"
            }
        }
        const $unwind = {
            $unwind: {
                path: "$role",
                preserveNullAndEmptyArrays: true
            }
        }
        const $project = {
            $project: {
                _id: 1,
                fullName: 1,
                phoneNumber: 1,
                role: {
                    _id: 1,
                    name: 1,
                },
            }
        }
        const $pipeline = [$lookup, $unwind, $project]
        return await this.findPaging(query, data, $pipeline)
    }

    public async update(id, data: EmployeeDto, options?: QueryOptions) {
        try {
            return await super.updateOne(id, data, options)
        } catch (e) {
            if (e.code == 11000) throw EmployeeResponse.AlreadyExist(Object.keys(e.keyPattern))
            throw e
        }
    }

    public async getById(id: string) {
        const $match = {
            $match: {
                _id: new Types.ObjectId(id),
                isDeleted: false
            }
        }
        const $lookup = {
            $lookup: {
                from: Collections.ROLE,
                foreignField: "_id",
                localField: "roleId",
                as: "role"
            }
        }
        const $unwind = {
            $unwind: {
                path: "$role",
                preserveNullAndEmptyArrays: true
            }
        }
        const $project = {
            $project: {
                fullName: 1,
                phoneNumber: 1,
                role: {
                    _id: 1,
                    name: 1
                }
            }
        }
        const $pipeline = [$match, $lookup, $unwind, $project]
        const data = await this.aggregate($pipeline)
        if (!data || !data[0]) throw EmployeeResponse.NotFound(id);
        return data[0];
    }
}

export const employeeService = new EmployeeService(EmployeeModel);