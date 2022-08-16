import { TestResultResponse } from "../../common/db/model/tests/testResults/testResult.error"
import { testResultService } from "../../common/service/testResult.service"
import { BaseDto } from "../../common/validation/base.dto"
import { DtoGroup } from "../../common/validation/dtoGroups"
import { validateIt } from "../../common/validation/validate"


export async function testResultsHandler(req, res, next: Function) {
    try {
        const data = await validateIt(req.params, BaseDto, DtoGroup.GET_BY_ID)

        const result = await testResultService.testResults(data._id)

        return await res.send(TestResultResponse.Success(result))
    } catch (error) {
        return next(error)
    }
}

export async function myResultsHandler(req, res, next: Function) {
    try {
        console.log(req.userId)
        const result = await testResultService.myResults(req.userId)

        return await res.send(TestResultResponse.Success(result))
    } catch (error) {
        return next(error)
    }
}

export async function myStatisticsHandler(req, res, next: Function) {
    try {

        const result = await testResultService.statistics(req.userId)

        return await res.send(TestResultResponse.Success(result))
    } catch (error) {
        return next(error)
    }
}