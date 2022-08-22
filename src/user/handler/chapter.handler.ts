import { ChapterResponse } from "../../common/db/model/subject/chapter/chapter.error"
import { BaseDto } from "../../common/validation/base.dto"
import { PagingDto } from "../../common/validation/dto/paging.dto"
import { ChapterDto } from "../../common/validation/dto/chapter.dto"
import { DtoGroup } from "../../common/validation/dtoGroups"
import { validateIt } from "../../common/validation/validate"
import { chapterService } from "../../common/service/chapter.service"

export async function getChapterByIdHandler(req: any, res: any, next: Function) {
    try {
        const data = await validateIt(req.params, BaseDto, DtoGroup.GET_BY_ID)

        const result = await chapterService.getById(data._id)

        return res.send(ChapterResponse.Success(result))

    } catch (error) {
        return next(error)
    }
}

export async function getChapterPagingHandler(req: any, res: any, next: Function) {
    try {
        const data = await validateIt(req.query, PagingDto, DtoGroup.PAGING)

        const chapter = await chapterService.getPaging(data)
        const result = {
            ...await chapterService.getCount(),
            data: chapter
        }
        return res.send(ChapterResponse.Success(result))
    } catch (error) {
        return next(error)
    }
}

export async function getChapterByClassIdHandler(req: any, res: any, next: Function) {
    try {
        const data = await validateIt(req.params, BaseDto, DtoGroup.GET_BY_ID)

        const result = await chapterService.getBySubjectId(data._id)

        return res.send(ChapterResponse.Success(result))

    } catch (error) {
        return next(error)
    }
}



