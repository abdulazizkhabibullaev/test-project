import { TestResponse } from "../../common/db/model/tests/test.error"
import { BaseDto } from "../../common/validation/base.dto"
import { PagingDto } from "../../common/validation/dto/paging.dto"
import { DtoGroup } from "../../common/validation/dtoGroups"
import { validateIt } from "../../common/validation/validate"
import { testService } from "../../common/service/test.service"

export async function getTestByIdHandler(req: any, res: any, next: Function) {
    try {
        const data = await validateIt(req.params, BaseDto, DtoGroup.GET_BY_ID)

        const result = await testService.getById(data._id)

        return res.send(TestResponse.Success(result))

    } catch (error) {
        return next(error)
    }
}

export async function getTestPagingHandler(req: any, res: any, next: Function) {
    try {
        const data = await validateIt(req.query, PagingDto, DtoGroup.PAGING)

        const test = await testService.getPaging(data, req.query)

        return res.send(TestResponse.Success(test))
    } catch (error) {
        return next(error)
    }
}




