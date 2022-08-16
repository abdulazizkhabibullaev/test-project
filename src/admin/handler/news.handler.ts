import { ROLES } from "../../common/constants/roles"
import { NewsResponse } from "../../common/db/model/news/news.error"
import { BaseDto } from "../../common/validation/base.dto"
import { PagingDto } from "../../common/validation/dto/paging.dto"
import { NewsDto } from "../../common/validation/dto/news.dto"
import { DtoGroup } from "../../common/validation/dtoGroups"
import { validateIt } from "../../common/validation/validate"
import { roleService } from "../../common/service/role.service"
import { newsService } from "../../common/service/news.service"


export async function createNewsHandler(req: any, res: any, next: Function) {
    try {
        await roleService.hasAccess(req.roleId, ROLES.NEWS_CREATE)

        const data = await validateIt(req.body, NewsDto, DtoGroup.CREATE)

        const result = await newsService.create(data)

        return res.send(NewsResponse.Success(result._id))

    } catch (error) {
        return next(error)
    }
}
export async function getNewsByIdHandler(req: any, res: any, next: Function) {
    try {
        await roleService.hasAccess(req.roleId, ROLES.NEWS)

        const data = await validateIt(req.params, BaseDto, DtoGroup.GET_BY_ID)

        const result = await newsService.getById(data._id)

        return res.send(NewsResponse.Success(result))

    } catch (error) {
        return next(error)
    }
}

export async function getNewsPagingHandler(req: any, res: any, next: Function) {
    try {
        await roleService.hasAccess(req.roleId, ROLES.NEWS)

        const data = await validateIt(req.query, PagingDto, DtoGroup.PAGING)
        if (!req.query.language) throw NewsResponse.Language()

        const news = await newsService.getPaging(data, req.query.language)

        return res.send(NewsResponse.Success(news))
    } catch (error) {
        return next(error)
    }
}

export async function updateNewsHandler(req: any, res: any, next: Function) {
    try {
        await roleService.hasAccess(req.roleId, ROLES.NEWS_UPDATE)

        const data = await validateIt(req.params, BaseDto, DtoGroup.UPDATE)

        const changeNews = await newsService.update(data, req.body)

        return res.send(NewsResponse.Success(changeNews._id))

    } catch (error) {
        return next(error)
    }
}

export async function deleteNewsHandler(req: any, res: any, next: Function) {
    try {

        await roleService.hasAccess(req.roleId, ROLES.NEWS_DELETE)

        const data = await validateIt(req.params, BaseDto, DtoGroup.DELETE)

        const result = await newsService.deleteOne(data._id)

        return res.send(NewsResponse.Success(result._id))
    } catch (error) {
        return next(error)
    }
}
