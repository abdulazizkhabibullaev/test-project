import { ROLES } from "../../common/constants/roles"
import { SubjectResponse } from "../../common/db/model/subject/subject.error"
import { BaseDto } from "../../common/validation/base.dto"
import { PagingDto } from "../../common/validation/dto/paging.dto"
import { SubjectDto } from "../../common/validation/dto/subject.dto"
import { DtoGroup } from "../../common/validation/dtoGroups"
import { validateIt } from "../../common/validation/validate"
import { roleService } from "../../common/service/role.service"
import { subjectService } from "../../common/service/subject.service"


export async function createSubjectHandler(req: any, res: any, next: Function) {
    try {
        await roleService.hasAccess(req.roleId, ROLES.SUBJECT_CREATE)

        const data = await validateIt(req.body, SubjectDto, DtoGroup.CREATE)

        const result = await subjectService.create(data)

        return res.send(SubjectResponse.Success(result._id))

    } catch (error) {
        return next(error)
    }
}
export async function getSubjectByIdHandler(req: any, res: any, next: Function) {
    try {
        await roleService.hasAccess(req.roleId, ROLES.SUBJECT)

        const data = await validateIt(req.params, BaseDto, DtoGroup.GET_BY_ID)

        const result = await subjectService.getById(data._id)

        return res.send(SubjectResponse.Success(result))

    } catch (error) {
        return next(error)
    }
}

export async function getSubjectPagingHandler(req: any, res: any, next: Function) {
    try {
        await roleService.hasAccess(req.roleId, ROLES.SUBJECT)

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

export async function updateSubjectHandler(req: any, res: any, next: Function) {
    try {
        await roleService.hasAccess(req.roleId, ROLES.SUBJECT_UPDATE)

        const data = await validateIt(req.params, BaseDto, DtoGroup.UPDATE)

        const changeSubject = await subjectService.update(data, req.body)

        return res.send(SubjectResponse.Success(changeSubject._id))

    } catch (error) {
        return next(error)
    }
}

export async function deleteSubjectHandler(req: any, res: any, next: Function) {
    try {

        await roleService.hasAccess(req.roleId, ROLES.SUBJECT_DELETE)

        const data = await validateIt(req.params, BaseDto, DtoGroup.DELETE)

        const result = await subjectService.deleteOne(data._id)

        return res.send(SubjectResponse.Success(result._id))
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


