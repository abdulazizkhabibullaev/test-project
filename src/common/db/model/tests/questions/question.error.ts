import { ErrorCodes } from "../../../../constants/errorCodes";
import { BaseResponse } from "../../../../reporter/base.response";


export class QuestionResponse extends BaseResponse {
    public static NotFound(data: any = null) {
        return new BaseResponse(ErrorCodes.QUESTION, "Question Not Found", data)
    }
    public static AlreadyExist(data: any = null) {
        return new BaseResponse(ErrorCodes.QUESTION + 1, "Question already exist", data)
    }
}