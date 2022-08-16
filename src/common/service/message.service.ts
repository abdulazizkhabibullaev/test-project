import { ModelType } from "@typegoose/typegoose/lib/types";
import { Types } from "mongoose";
import { Collections } from "../constants/collections";
import { MessageResponse } from "../db/model/message/message.error";
import { Message, MessageModel } from "../db/model/message/message.model";
import { PagingDto } from "../validation/dto/paging.dto";
import { CommonServices } from "./common.service";


class MessageService extends CommonServices<Message>{
    constructor(model: ModelType<Message>) {
        super(model)
    }

    public async getPaging(data: PagingDto) {
        let query = {
            isDeleted: false
        }

        const $lookup = {
            $lookup: {
                from: Collections.USER,
                foreignField: "_id",
                localField: "userId",
                as: "user"
            }
        }
        const $unwind = {
            $unwind: {
                path: "$user",
                preserveNullAndEmptyArrays: true
            }
        }
        const $project = {
            $project: {
                message: 1,
                user: {
                    _id: 1,
                    firstName: 1,
                    lastname: 1,
                    phoneNumber: 1
                },
            }
        }
        const $pipeline = [$lookup, $unwind, $project]
        return await this.findPaging(query, data, $pipeline)
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
                    from: Collections.USER,
                    foreignField: "_id",
                    localField: "userId",
                    as: "user"
                }
            }
            const $unwind = {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: true
                }
            }
            const $project = {
                $project: {
                    message: 1,
                    user: {
                        _id: 1,
                        firstName: 1,
                        lastname: 1,
                        phoneNumber: 1
                    },
                }
            }
            const $pipeline = [$match, $lookup, $unwind, $project]
            const data = await this.aggregate($pipeline)
            if (!data || !data[0]) throw MessageResponse.NotFound(id);
            return data[0];
        } catch (error) {
            return error
        }
    }
}

export const messageService = new MessageService(MessageModel)

