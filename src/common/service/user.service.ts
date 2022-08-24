import { ModelType } from "@typegoose/typegoose/lib/types";
import { QueryOptions, Types } from "mongoose";
import { Collections } from "../../common/constants/collections";
import { UserResponse } from "../../common/db/model/user/user.error";
import { User, UserModel } from "../../common/db/model/user/user.model";
import { CommonServices } from "../../common/service/common.service";
import { UserDto } from "../../common/validation/dto/user.dto";
import { PagingDto } from "../../common/validation/dto/paging.dto";


class UserService extends CommonServices<User>{
    constructor(model: ModelType<User>) {
        super(model)
    }

    public async create(data: UserDto) {
        try {
            return await super.create(data)
        } catch (e) {
            if (e.code == 11000) throw UserResponse.AlreadyExist(Object.keys(e.keyPattern))
            throw e
        }
    }

    public async findByPhoneNumber(data) {
        const user = await this.findOne({ phoneNumber: data })
        if (!user) throw UserResponse.NotFound(data)
        return user
    }

    public async getPaging(data: PagingDto) {
        let query = {
            isDeleted: false
        }

        const $project = {
            $project: {
                _id: 1,
                firstName: 1,
                lastName: 1,
                phoneNumber: 1,
                address: 1,
                gender: 1
            }
        }
        const $pipeline = [$project]
        return await this.findPaging(query, data, $pipeline)
    }

    public async update(id, data: UserDto, options?: QueryOptions) {
        try {
            return await super.updateOne(id, data, options)
        } catch (e) {
            if (e.code == 11000) throw UserResponse.AlreadyExist(Object.keys(e.keyPattern))
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
        const $project = {
            $project: {
                _id: 1,
                firstName: 1,
                lastName: 1,
                phoneNumber: 1,
                address: 1,
                gender: 1
            }
        }
        const $pipeline = [$match, $project]
        const data = await this.aggregate($pipeline)
        if (!data || !data[0]) throw UserResponse.NotFound(id);
        return data[0];
    }
}

export const userService = new UserService(UserModel);