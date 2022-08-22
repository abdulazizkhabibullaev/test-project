import { ROLES } from "../../common/constants/roles"
import { TopicResponse } from "../../common/db/model/subject/topic/topic.error"
import { BaseDto } from "../../common/validation/base.dto"
import { PagingDto } from "../../common/validation/dto/paging.dto"
import { TopicDto } from "../../common/validation/dto/topic.dto"
import { DtoGroup } from "../../common/validation/dtoGroups"
import { validateIt } from "../../common/validation/validate"
import { roleService } from "../../common/service/role.service"
import { topicService } from "../../common/service/topic.service"


export async function createTopicHandler(req: any, res: any, next: Function) {
    try {
        await roleService.hasAccess(req.roleId, ROLES.TOPIC_CREATE)

        const data = await validateIt(req.body, TopicDto, DtoGroup.CREATE)

        const result = await topicService.create(data)

        return res.send(TopicResponse.Success(result._id))

    } catch (error) {
        return next(error)
    }
}
export async function getTopicByIdHandler(req: any, res: any, next: Function) {
    try {
        await roleService.hasAccess(req.roleId, ROLES.TOPIC)

        const data = await validateIt(req.params, BaseDto, DtoGroup.GET_BY_ID)

        const result = await topicService.getById(data._id)

        return res.send(TopicResponse.Success(result))

    } catch (error) {
        return next(error)
    }
}

export async function getTopicPagingHandler(req: any, res: any, next: Function) {
    try {
        await roleService.hasAccess(req.roleId, ROLES.TOPIC)

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

export async function updateTopicHandler(req: any, res: any, next: Function) {
    try {
        await roleService.hasAccess(req.roleId, ROLES.TOPIC_UPDATE)

        const data = await validateIt(req.params, BaseDto, DtoGroup.UPDATE)

        const changeTopic = await topicService.update(data, req.body)

        return res.send(TopicResponse.Success(changeTopic._id))

    } catch (error) {
        return next(error)
    }
}

export async function deleteTopicHandler(req: any, res: any, next: Function) {
    try {
        await roleService.hasAccess(req.roleId, ROLES.TOPIC_DELETE)

        const data = await validateIt(req.params, BaseDto, DtoGroup.DELETE)

        const result = await topicService.deleteOne(data._id)

        return res.send(TopicResponse.Success(result._id))
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
