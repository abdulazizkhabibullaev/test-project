import { QuestionResponse } from "../../common/db/model/tests/questions/question.error"
import { BaseDto } from "../../common/validation/base.dto"
import { PagingDto } from "../../common/validation/dto/paging.dto"
import { DtoGroup } from "../../common/validation/dtoGroups"
import { validateIt } from "../../common/validation/validate"
import { questionService } from "../../common/service/question.service"

export async function getQuestionByIdHandler(req: any, res: any, next: Function) {
    try {
        const data = await validateIt(req.params, BaseDto, DtoGroup.GET_BY_ID)

        const result = await questionService.getById(data._id)

        return res.send(QuestionResponse.Success(result))

    } catch (error) {
        return next(error)
    }
}

export async function getQuestionPagingHandler(req: any, res: any, next: Function) {
    try {
        const data = await validateIt(req.query, PagingDto, DtoGroup.PAGING)

        const question = await questionService.getPaging(req.query.testId, data)
        return res.send(QuestionResponse.Success(question))
    } catch (error) {
        return next(error)
    }
}





