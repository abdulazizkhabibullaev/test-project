import { MessageResponse } from "../../common/db/model/message/message.error"
import { messageService } from "../../common/service/message.service"
import { BaseDto } from "../../common/validation/base.dto"
import { PagingDto } from "../../common/validation/dto/paging.dto"
import { DtoGroup } from "../../common/validation/dtoGroups"
import { validateIt } from "../../common/validation/validate"


export async function getMessageByIdHandler(req: any, res: any, next: Function) {
    try {
        const data = await validateIt(req.params, BaseDto, DtoGroup.GET_BY_ID)

        const result = await messageService.getById(data._id)

        return res.send(MessageResponse.Success(result))

    } catch (error) {
        return next(error)
    }
}

export async function getMessagePagingHandler(req: any, res: any, next: Function) {
    try {

        const data = await validateIt(req.query, PagingDto, DtoGroup.PAGING)

        const message = await messageService.getPaging(data)

        return res.send(MessageResponse.Success(message))
    } catch (error) {
        return next(error)
    }
}