import { Types } from "mongoose"
import { ROLES } from "../../common/constants/roles"
import { TestResponse } from "../../common/db/model/tests/test.error"
import { BaseDto } from "../../common/validation/base.dto"
import { PagingDto } from "../../common/validation/dto/paging.dto"
import { TestDto } from "../../common/validation/dto/test.dto"
import { DtoGroup } from "../../common/validation/dtoGroups"
import { validateIt } from "../../common/validation/validate"
import { roleService } from "../../common/service/role.service"
import { testService } from "../../common/service/test.service"


export async function createTestHandler(req: any, res: any, next: Function) {
    try {
        await roleService.hasAccess(req.roleId, ROLES.TEST_CREATE)

        const data = await validateIt(req.body, TestDto, DtoGroup.CREATE)

        const result = await testService.create(data)

        return res.send(TestResponse.Success(result._id))

    } catch (error) {
        return next(error)
    }
}
export async function getTestByIdHandler(req: any, res: any, next: Function) {
    try {
        await roleService.hasAccess(req.roleId, ROLES.TEST)

        const data = await validateIt(req.params, BaseDto, DtoGroup.GET_BY_ID)

        const result = await testService.getById(data._id)

        return res.send(TestResponse.Success(result))

    } catch (error) {
        return next(error)
    }
}

export async function getTestPagingHandler(req: any, res: any, next: Function) {
    try {
        await roleService.hasAccess(req.roleId, ROLES.TEST)

        const data = await validateIt(req.query, PagingDto, DtoGroup.PAGING)

        const test = await testService.getPaging(data, req.query)

        return res.send(TestResponse.Success(test))
    } catch (error) {
        return next(error)
    }
}

export async function updateTestHandler(req: any, res: any, next: Function) {
    try {
        await roleService.hasAccess(req.roleId, ROLES.TEST_UPDATE)

        const data = await validateIt(req.params, BaseDto, DtoGroup.UPDATE)

        const changeTest = await testService.update(data, req.body)

        return res.send(TestResponse.Success(changeTest._id))

    } catch (error) {
        return next(error)
    }
}

export async function deleteTestHandler(req: any, res: any, next: Function) {
    try {

        await roleService.hasAccess(req.roleId, ROLES.TEST_DELETE)

        const data = await validateIt(req.params, BaseDto, DtoGroup.DELETE)

        const result = await testService.deleteOne(data._id)

        return res.send(TestResponse.Success(result._id))
    } catch (error) {
        return next(error)
    }
}



