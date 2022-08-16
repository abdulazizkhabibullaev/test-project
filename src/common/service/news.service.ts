import { ModelType } from "@typegoose/typegoose/lib/types";
import { QueryOptions, Types } from "mongoose";
import { Collections } from "../constants/collections";
import { NewsResponse } from "../db/model/news/news.error";
import { News, NewsModel } from "../db/model/news/news.model";
import { CommonServices } from "./common.service";
import { NewsDto } from "../validation/dto/news.dto";
import { PagingDto } from "../validation/dto/paging.dto";


class NewsService extends CommonServices<News>{
    constructor(model: ModelType<News>) {
        super(model)
    }

    public async create(data: NewsDto) {
        try {
            return await super.create(data)
        } catch (e) {
            if (e.code == 11000) throw NewsResponse.AlreadyExist(Object.keys(e.keyPattern))
            throw e
        }
    }

    public async getPaging(data: PagingDto, language) {
        let query = {
            isDeleted: false,
            language: language
        }

        let $project = {
            $project: {
                imgUrl: 1,
                title: 1,
                titleType: 1,
                createdAt: 1
            }
        }
        return await this.findPaging(query, data, [$project])
    }

    public async update(id, data, options?: QueryOptions) {
        try {
            return await super.updateOne(id, data, options)
        } catch (e) {
            if (e.code == 11000) throw NewsResponse.AlreadyExist(Object.keys(e.keyPattern))
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
            let $project = {
                $project: {
                    isDeleted: 0,
                    titleType: 0,
                    "content._id": 0,
                    __v: 0
                }
            }
            const $pipeline = [$match, $project]

            const data = await this.aggregate($pipeline)

            if (!data || !data[0]) throw NewsResponse.NotFound(id);

            return data[0];
        } catch (error) {
            return error
        }
    }

}

export const newsService = new NewsService(NewsModel);