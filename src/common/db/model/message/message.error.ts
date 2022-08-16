import { ErrorCodes } from "../../../constants/errorCodes";
import { BaseResponse } from "../../../reporter/base.response";


export class MessageResponse extends BaseResponse {
    public static NotFound(data: any = null) {
        return new BaseResponse(ErrorCodes.MESSAGE, "Message Not Found", data)
    }
}