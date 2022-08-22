import { ROLES } from "../../common/constants/roles"
import { ClassResponse } from "../../common/db/model/subject/class/class.error"
import { BaseDto } from "../../common/validation/base.dto"
import { PagingDto } from "../../common/validation/dto/paging.dto"
import { ClassDto } from "../../common/validation/dto/class.dto"
import { DtoGroup } from "../../common/validation/dtoGroups"
import { validateIt } from "../../common/validation/validate"
import { roleService } from "../../common/service/role.service"
import { classService } from "../../common/service/class.service"


export async function createClassHandler(req: any, res: any, next: Function) {
    try {
        await roleService.hasAccess(req.roleId, ROLES.CLASS_CREATE)

        const data = await validateIt(req.body, ClassDto, DtoGroup.CREATE)

        const result = await classService.create(data)

        return res.send(ClassResponse.Success(result._id))

    } catch (error) {
        return next(error)
    }
}
export async function getClassByIdHandler(req: any, res: any, next: Function) {
    try {
        await roleService.hasAccess(req.roleId, ROLES.CLASS)

        const data = await validateIt(req.params, BaseDto, DtoGroup.GET_BY_ID)

        const result = await classService.getById(data._id)

        return res.send(ClassResponse.Success(result))

    } catch (error) {
        return next(error)
    }
}

export async function getClassPagingHandler(req: any, res: any, next: Function) {
    try {
        await roleService.hasAccess(req.roleId, ROLES.CLASS)

        const data = await validateIt(req.query, PagingDto, DtoGroup.PAGING)

        const classes = await classService.getPaging(data)
        const result = {
            ...await classService.getCount(),
            data: classes
        }
        return res.send(ClassResponse.Success(result))
    } catch (error) {
        return next(error)
    }
}

export async function updateClassHandler(req: any, res: any, next: Function) {
    try {
        await roleService.hasAccess(req.roleId, ROLES.CLASS_UPDATE)

        const data = await validateIt(req.params, BaseDto, DtoGroup.UPDATE)

        const changeClass = await classService.update(data, req.body)

        return res.send(ClassResponse.Success(changeClass._id))

    } catch (error) {
        return next(error)
    }
}

export async function deleteClassHandler(req: any, res: any, next: Function) {
    try {

        await roleService.hasAccess(req.roleId, ROLES.CLASS_DELETE)

        const data = await validateIt(req.params, BaseDto, DtoGroup.DELETE)

        const result = await classService.deleteOne(data._id)

        return res.send(ClassResponse.Success(result._id))
    } catch (error) {
        return next(error)
    }
}


