import { Types } from "mongoose"
import { SolveTestResponse } from "../../common/db/model/tests/solveTests/solveTests.error"
import { Status } from "../../common/db/model/tests/testResults/testResult.model"
import { questionService } from "../../common/service/question.service"
import { solveTestService } from "../../common/service/solveTest.service"
import { testResultService } from "../../common/service/testResult.service"
import { SolveTestDto } from "../../common/validation/dto/solveTest.dto"
import { DtoGroup } from "../../common/validation/dtoGroups"
import { validateIt } from "../../common/validation/validate"

export async function startTestHandler(req, res, next: Function) {
    try {
        const data = {
            testId: new Types.ObjectId(req.body.testId),
            userId: new Types.ObjectId(req.userId),
            startedAt: new Date(),
            status: Status.STARTED
        }

        const result = await testResultService.create(data)

        return res.send(SolveTestResponse.Success(result._id))
    } catch (error) {
        return next(error)
    }
}

export async function solveTestHandler(req, res, next: Function) {
    try {
        const data = {
            ...req.body,
            userId: req.userId
        }

        await validateIt(data, SolveTestDto, DtoGroup.CREATE)

        const question = await questionService.findById(data.questionId)

        const result = await solveTestService.create(data)

        if (!result) {
            const test = await solveTestService.checkTest(question.testId, data.userId)
            return res.send(SolveTestResponse.Time(test._id))
        }

        return res.send(SolveTestResponse.Success(result._id))
    } catch (error) {
        return next(error)
    }
}

export async function finishTestHandler(req, res, next: Function) {
    try {
        const data = {
            testId: req.body.testId,
            userId: req.userId,
            finishedAt: new Date(),
            status: Status.FINISHED
        }

        const checkTest = await solveTestService.checkTest(data.testId, data.userId)

        const result = await testResultService.lastTestResult(checkTest._id)

        return res.send(SolveTestResponse.Success(result))
    } catch (error) {
        return next(error)
    }
}
