import { NewsResponse } from "../../common/db/model/news/news.error"
import { newsService } from "../../common/service/news.service"
import { BaseDto } from "../../common/validation/base.dto"
import { PagingDto } from "../../common/validation/dto/paging.dto"
import { DtoGroup } from "../../common/validation/dtoGroups"
import { validateIt } from "../../common/validation/validate"


export async function getNewsByIdHandler(req: any, res: any, next: Function) {
    try {
        const data = await validateIt(req.params, BaseDto, DtoGroup.GET_BY_ID)

        const result = await newsService.getById(data._id)

        await newsService.update(data._id, { $inc: { viewCount: 1 } })
        
        return res.send(NewsResponse.Success(result))

    } catch (error) {
        return next(error)
    }
}

export async function getNewsPagingHandler(req: any, res: any, next: Function) {
    try {

        const data = await validateIt(req.query, PagingDto, DtoGroup.PAGING)

        if (!req.query.language) throw NewsResponse.Language()
        const news = await newsService.getPaging(data, req.query.language)

        return res.send(NewsResponse.Success(news))
    } catch (error) {
        return next(error)
    }
}