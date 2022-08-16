import { ROLES } from "../../common/constants/roles"
import { RoleResponse } from "../../common/db/model/roles/role.error"
import { BaseDto } from "../../common/validation/base.dto"
import { PagingDto } from "../../common/validation/dto/paging.dto"
import { RoleDto } from "../../common/validation/dto/role.dto"
import { DtoGroup } from "../../common/validation/dtoGroups"
import { validateIt } from "../../common/validation/validate"
import { roleService } from "../../common/service/role.service"


export async function createRoleHandler(req: any, res: any, next: Function) {
    try {
        await roleService.hasAccess(req.roleId, ROLES.ROLE_CREATE)

        const data = await validateIt(req.body, RoleDto, DtoGroup.CREATE)

        const role = await roleService.create(data)

        return res.send(RoleResponse.Success(role._id))

    } catch (error) {
        return next(error)
    }
}
export async function getRoleByIdHandler(req: any, res: any, next: Function) {
    try {
        await roleService.hasAccess(req.roleId, ROLES.ROLE)

        const data = await validateIt(req.params, BaseDto, DtoGroup.GET_BY_ID)

        const role = await roleService.getRoleById(data._id)

        return res.send(RoleResponse.Success(role))

    } catch (error) {
        return next(error)
    }
}

export async function getRolePagingHandler(req: any, res: any, next: Function) {
    try {
        await roleService.hasAccess(req.roleId, ROLES.ROLE)

        const data = await validateIt(req.query, PagingDto, DtoGroup.PAGING)

        const roles = await roleService.getPaging(data)
        const result = {
            ...await roleService.getCount(),
            data: roles
        }
        return res.send(RoleResponse.Success(result))
    } catch (error) {
        return next(error)
    }
}

export async function updateRoleHandler(req: any, res: any, next: Function) {
    try {
        await roleService.hasAccess(req.roleId, ROLES.ROLE_UPDATE)
        
        const data = await validateIt(req.params, BaseDto, DtoGroup.UPDATE)

        // if (req.roleId == req.params._id) throw RoleResponse.NotEnoughPermission()
        
        const changeRole = await roleService.update(data, req.body)

        return res.send(RoleResponse.Success(changeRole._id))

    } catch (error) {
        return next(error)
    }
}

export async function deleteRoleHandler(req: any, res: any, next: Function) {
    try {

        await roleService.hasAccess(req.roleId, ROLES.ROLE_DELETE)

        const data = await validateIt(req.params, BaseDto, DtoGroup.DELETE)

        const role = await roleService.deleteOne(data._id)

        return res.send(RoleResponse.Success(role._id))
    } catch (error) {
        return next(error)
    }
}


