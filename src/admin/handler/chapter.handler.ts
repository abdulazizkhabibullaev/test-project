import { ROLES } from "../../common/constants/roles"
import { ChapterResponse } from "../../common/db/model/chapter/chapter.error"
import { BaseDto } from "../../common/validation/base.dto"
import { PagingDto } from "../../common/validation/dto/paging.dto"
import { ChapterDto } from "../../common/validation/dto/chapter.dto"
import { DtoGroup } from "../../common/validation/dtoGroups"
import { validateIt } from "../../common/validation/validate"
import { roleService } from "../../common/service/role.service"
import { chapterService } from "../../common/service/chapter.service"


export async function createChapterHandler(req: any, res: any, next: Function) {
    try {
        await roleService.hasAccess(req.roleId, ROLES.CHAPTER_CREATE)

        const data = await validateIt(req.body, ChapterDto, DtoGroup.CREATE)

        const result = await chapterService.create(data)

        return res.send(ChapterResponse.Success(result._id))

    } catch (error) {
        return next(error)
    }
}
export async function getChapterByIdHandler(req: any, res: any, next: Function) {
    try {
        await roleService.hasAccess(req.roleId, ROLES.CHAPTER)

        const data = await validateIt(req.params, BaseDto, DtoGroup.GET_BY_ID)

        const result = await chapterService.getById(data._id)

        return res.send(ChapterResponse.Success(result))

    } catch (error) {
        return next(error)
    }
}

export async function getChapterPagingHandler(req: any, res: any, next: Function) {
    try {
        await roleService.hasAccess(req.roleId, ROLES.CHAPTER)

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

export async function updateChapterHandler(req: any, res: any, next: Function) {
    try {
        await roleService.hasAccess(req.roleId, ROLES.CHAPTER_UPDATE)

        const data = await validateIt(req.params, BaseDto, DtoGroup.UPDATE)

        const changeChapter = await chapterService.update(data, req.body)

        return res.send(ChapterResponse.Success(changeChapter._id))

    } catch (error) {
        return next(error)
    }
}

export async function deleteChapterHandler(req: any, res: any, next: Function) {
    try {

        await roleService.hasAccess(req.roleId, ROLES.CHAPTER_DELETE)

        const data = await validateIt(req.params, BaseDto, DtoGroup.DELETE)

        const result = await chapterService.deleteOne(data._id)

        return res.send(ChapterResponse.Success(result._id))
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
