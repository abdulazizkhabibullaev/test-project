import { ErrorCodes } from "../../../constants/errorCodes";
import { BaseResponse } from "../../../reporter/base.response";


export class SubjectResponse extends BaseResponse{
    public static NotFound(data: any=null) {
        return new BaseResponse(ErrorCodes.SUBJECT, "Subject Not Found", data)
    }
    public static AlreadyExist(data: any = null) {
        return new BaseResponse(ErrorCodes.SUBJECT+1, "Subject already exist", data)
    }
}