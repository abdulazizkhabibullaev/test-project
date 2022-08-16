import { SubjectResponse } from "../../common/db/model/subject/subject.error"
import { BaseDto } from "../../common/validation/base.dto"
import { PagingDto } from "../../common/validation/dto/paging.dto"
import { DtoGroup } from "../../common/validation/dtoGroups"
import { validateIt } from "../../common/validation/validate"
import { subjectService } from "../../common/service/subject.service"

export async function getSubjectByIdHandler(req: any, res: any, next: Function) {
    try {
        const data = await validateIt(req.params, BaseDto, DtoGroup.GET_BY_ID)

        const result = await subjectService.getById(data._id)

        return res.send(SubjectResponse.Success(result))

    } catch (error) {
        return next(error)
    }
}

export async function getSubjectPagingHandler(req: any, res: any, next: Function) {
    try {
        const data = await validateIt(req.query, PagingDto, DtoGroup.PAGING)

        let subject;
        if (req.query.classId) {
            subject = await subjectService.getPaging(data, req.query.classId)
        } else {
            subject = await subjectService.getPaging(data)
        }

        return res.send(SubjectResponse.Success(subject))
    } catch (error) {
        return next(error)
    }
}

export async function getSubjectByClassIdHandler(req: any, res: any, next: Function) {
    try {
        const data = await validateIt(req.params, BaseDto, DtoGroup.GET_BY_ID)

        const result = await subjectService.getByClassId(data._id)

        return res.send(SubjectResponse.Success(result))

    } catch (error) {
        return next(error)
    }
}




