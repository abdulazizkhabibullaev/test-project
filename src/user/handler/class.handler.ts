
import { ClassResponse } from "../../common/db/model/subject/class/class.error"
import { BaseDto } from "../../common/validation/base.dto"
import { PagingDto } from "../../common/validation/dto/paging.dto"
import { DtoGroup } from "../../common/validation/dtoGroups"
import { validateIt } from "../../common/validation/validate"
import { classService } from "../../common/service/class.service"

export async function getClassByIdHandler(req: any, res: any, next: Function) {
    try {
        const data = await validateIt(req.params, BaseDto, DtoGroup.GET_BY_ID)

        const result = await classService.getById(data._id)

        return res.send(ClassResponse.Success(result))

    } catch (error) {
        return next(error)
    }
}

export async function getClassPagingHandler(req: any, res: any, next: Function) {
    try {
        const data = await validateIt(req.query, PagingDto, DtoGroup.PAGING)

        const classes = await classService.getPaging(data)
    
        return res.send(ClassResponse.Success(classes))
    } catch (error) {
        return next(error)
    }
}



