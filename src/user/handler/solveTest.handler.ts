import { Types } from "mongoose"
import { SolveTestResponse } from "../../common/db/model/tests/solveTests/solveTests.error"
import { Status } from "../../common/db/model/tests/testResults/testResult.model"
import { questionService } from "../../common/service/question.service"
import { solveTestService } from "../../common/service/solveTest.service"
import { testResultService } from "../../common/service/testResult.service"
import { SolveTestDto } from "../../common/validation/dto/solveTest.dto"
import { DtoGroup } from "../../common/validation/dtoGroups"
import { validateIt } from "../../common/validation/validate"


export async function solveTestHandler(req, res, next: Function) {
    try {
        const data = {
            ...req.body,
            userId: req.userId
        }

        await validateIt(data, SolveTestDto, DtoGroup.CREATE)

        const status = await solveTestService.findStatus(data.questionId)

        if (status == Status.PENDING) throw SolveTestResponse.PendingTest(status)

        const question = await questionService.findById(data.questionId)

        const result = await solveTestService.create(data)

        if (!result) {
            await solveTestService.checkTest(question.testId, data.userId)
            const statistics = await solveTestService.finishTest({
                testId: question.testId,
                userId: data.userId,
                finishedAt: new Date(),
                status: Status.FINISHED
            })
            return res.send(SolveTestResponse.Time(statistics))
        }
        return res.send(SolveTestResponse.Success(result._id))
    } catch (error) {
        return next(error)
    }
}

export async function startTestHandler(req, res, next: Function) {
    try {
        const data = {
            testId: new Types.ObjectId(req.body.testId),
            userId: new Types.ObjectId(req.userId),
            startedAt: new Date(),
            status: Status.STARTED
        }

        const test = await testResultService.find({ testId: data.testId, userId: data.userId, status: data.status })
        if (test.length) return res.send(SolveTestResponse.NotFinished(test[0]._id))

        const result = await testResultService.create(data)

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
        const testResult = (await testResultService.find({ testId: data.testId, userId: data.userId, status: Status.STARTED }))[0]
        if (!testResult) return res.send(SolveTestResponse.Finished(data.testId))
        await solveTestService.checkTest(data.testId, data.userId)

        const result = await solveTestService.finishTest(data)

        return res.send(SolveTestResponse.Success(result))
    } catch (error) {
        return next(error)
    }
}
