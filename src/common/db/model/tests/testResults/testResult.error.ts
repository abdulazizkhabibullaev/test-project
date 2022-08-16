import { ErrorCodes } from "../../../../constants/errorCodes";
import { BaseResponse } from "../../../../reporter/base.response";


export class TestResultResponse extends BaseResponse {
    public static NotFound(data: any = null) {
        return new BaseResponse(ErrorCodes.TEST, "Test result Not Found", data)
    }
}