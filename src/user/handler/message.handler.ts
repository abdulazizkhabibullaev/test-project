import { MessageResponse } from "../../common/db/model/message/message.error"
import { messageService } from "../../common/service/message.service"
import { MessageDto } from "../../common/validation/dto/message.dto"
import { DtoGroup } from "../../common/validation/dtoGroups"
import { validateIt } from "../../common/validation/validate"

export async function createMessageHandler(req: any, res: any, next: Function) {
    try {
        const data = {
            userId: req.userId,
            ...req.body
        }
        await validateIt(data, MessageDto, DtoGroup.CREATE)
        const message = await messageService.create(data)

        return res.send(MessageResponse.Success(message._id))
    } catch (error) {
        return next(error)
    }
}