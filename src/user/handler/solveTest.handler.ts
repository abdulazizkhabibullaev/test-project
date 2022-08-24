import { Types } from "mongoose"
import { SolveTestResponse } from "../../common/db/model/tests/solveTests/solveTests.error"
import { Status } from "../../common/db/model/tests/testResults/testResult.model"
import { solveTestService } from "../../common/service/solveTest.service"
import { testService } from "../../common/service/test.service"
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

        const testResult = await testResultService.findOne({ userId: data.userId, status: Status.STARTED })
        const test = await testService.findById(testResult.testId)
        const limit = test.duration
        
        if (new Date() > new Date((testResult.startedAt).getTime() + 1000 * 60 * limit)) {
            return res.send(SolveTestResponse.Time(test._id))
        }

        const result = await solveTestService.create(data)

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

        const result = await testResultService.lastTestResult(checkTest)

        return res.send(SolveTestResponse.Success(result))
    } catch (error) {
        return next(error)
    }
}
