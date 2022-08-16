import { ErrorCodes } from "../../../../constants/errorCodes"
import { BaseResponse } from "../../../../reporter/base.response"


export class SolveTestResponse extends BaseResponse {
    public static NotFound(data: any = null) {
        return new BaseResponse(ErrorCodes.SOLVE_TESTS, "Test Not Found", data)
    }
    public static PendingTest(data: any = null) {
        return new BaseResponse(ErrorCodes.SOLVE_TESTS + 1, "Test is not started yet", data)
    }
    public static Time(data: any = null) {
        return new BaseResponse(ErrorCodes.SOLVE_TESTS + 2, "Time is up, test Finished", data)
    }
    public static NotFinished(data: any = null) {
        return new BaseResponse(ErrorCodes.SOLVE_TESTS + 3, "You are not finished your previous test", data)
    }
    public static Finished(data: any = null) {
        return new BaseResponse(ErrorCodes.SOLVE_TESTS + 4, "Test is already finished", data)
    }
}