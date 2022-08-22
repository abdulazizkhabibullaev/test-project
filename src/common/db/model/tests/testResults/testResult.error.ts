import { ErrorCodes } from "../../../../constants/errorCodes";
import { BaseResponse } from "../../../../reporter/base.response";


export class TestResultResponse extends BaseResponse {
    public static NotFound(data: any = null) {
        return new BaseResponse(ErrorCodes.TEST_RESULT, "Test result Not Found", data)
    }
    public static NotFinished(data: any = null) {
        return new BaseResponse(ErrorCodes.TEST_RESULT + 1, "You are not finished your previous test", data)
    }
}