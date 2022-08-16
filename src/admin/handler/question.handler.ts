import { ROLES } from "../../common/constants/roles"
import { QuestionResponse } from "../../common/db/model/tests/questions/question.error"
import { BaseDto } from "../../common/validation/base.dto"
import { PagingDto } from "../../common/validation/dto/paging.dto"
import { QuestionDto } from "../../common/validation/dto/question.dto"
import { DtoGroup } from "../../common/validation/dtoGroups"
import { validateIt } from "../../common/validation/validate"
import { roleService } from "../../common/service/role.service"
import { questionService } from "../../common/service/question.service"
import { testService } from "../../common/service/test.service"


export async function createQuestionHandler(req: any, res: any, next: Function) {
    try {
        await roleService.hasAccess(req.roleId, ROLES.QUESTION_CREATE)

        const data = await validateIt(req.body, QuestionDto, DtoGroup.CREATE)

        const result = await questionService.create(data)

        let query = { $inc: { questionCount: 1 } }
        await testService.updateOne(data.testId, query)

        return res.send(QuestionResponse.Success(result._id))

    } catch (error) { 
        return next(error)
    }
}

export async function getQuestionByIdHandler(req: any, res: any, next: Function) {
    try {
        await roleService.hasAccess(req.roleId, ROLES.QUESTION)

        const data = await validateIt(req.params, BaseDto, DtoGroup.GET_BY_ID)

        const result = await questionService.getById(data._id)

        return res.send(QuestionResponse.Success(result))

    } catch (error) {
        return next(error)
    }
}

export async function getQuestionPagingHandler(req: any, res: any, next: Function) {
    try {
        await roleService.hasAccess(req.roleId, ROLES.QUESTION)

        const data = await validateIt(req.query, PagingDto, DtoGroup.PAGING)

        const question = await questionService.getPaging(req.query.testId, data)
        return res.send(QuestionResponse.Success(question))
    } catch (error) {
        return next(error)
    }
}

export async function updateQuestionHandler(req: any, res: any, next: Function) {
    try {
        await roleService.hasAccess(req.roleId, ROLES.QUESTION_UPDATE)

        const data = await validateIt(req.params, BaseDto, DtoGroup.UPDATE)

        const changeQuestion = await questionService.update(data, req.body)

        return res.send(QuestionResponse.Success(changeQuestion._id))

    } catch (error) {
        return next(error)
    }
}

export async function deleteQuestionHandler(req: any, res: any, next: Function) {
    try {

        await roleService.hasAccess(req.roleId, ROLES.QUESTION_DELETE)

        const data = await validateIt(req.params, BaseDto, DtoGroup.DELETE)

        const result = await questionService.deleteOne(data._id)

        let query = { $inc: { questionCount: -1 } }
        await testService.updateOne(data._id, query)

        return res.send(QuestionResponse.Success(result._id))
    } catch (error) {
        return next(error)
    }
}





