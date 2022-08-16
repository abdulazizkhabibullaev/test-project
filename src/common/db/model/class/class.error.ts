import { ErrorCodes } from "../../../constants/errorCodes";
import { BaseResponse } from "../../../reporter/base.response";


export class ClassResponse extends BaseResponse {
    public static NotFound(data: any = null) {
        return new BaseResponse(ErrorCodes.CLASS, "Class Not Found", data)
    }
    public static AlreadyExist(data: any = null) {
        return new BaseResponse(ErrorCodes.CLASS + 1, "Class already exist", data)
    }
}