import { TopicResponse } from "../../common/db/model/topic/topic.error"
import { BaseDto } from "../../common/validation/base.dto"
import { PagingDto } from "../../common/validation/dto/paging.dto"
import { DtoGroup } from "../../common/validation/dtoGroups"
import { validateIt } from "../../common/validation/validate"
import { topicService } from "../../common/service/topic.service"

export async function getTopicByIdHandler(req: any, res: any, next: Function) {
    try {
        const data = await validateIt(req.params, BaseDto, DtoGroup.GET_BY_ID)

        const result = await topicService.getById(data._id)

        return res.send(TopicResponse.Success(result))

    } catch (error) {
        return next(error)
    }
}

export async function getTopicPagingHandler(req: any, res: any, next: Function) {
    try {
        

        const data = await validateIt(req.query, PagingDto, DtoGroup.PAGING)

        const topic = await topicService.getPaging(data)
        const result = {
            ...await topicService.getCount(),
            data: topic
        }
        return res.send(TopicResponse.Success(result))
    } catch (error) {
        return next(error)
    }
}

export async function getTopicByChapterIdHandler(req: any, res: any, next: Function) {
    try {
        const data = await validateIt(req.params, BaseDto, DtoGroup.GET_BY_ID)

        const result = await topicService.getByChapterId(data._id)

        return res.send(TopicResponse.Success(result))

    } catch (error) {
        return next(error)
    }
}


