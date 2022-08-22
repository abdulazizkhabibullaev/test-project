import { ErrorCodes } from "../../../../constants/errorCodes";
import { BaseResponse } from "../../../../reporter/base.response";


export class TopicResponse extends BaseResponse {
    public static NotFound(data: any = null) {
        return new BaseResponse(ErrorCodes.TOPIC, "Topic Not Found", data)
    }
    public static AlreadyExist(data: any = null) {
        return new BaseResponse(ErrorCodes.TOPIC + 1, "Topic already exist", data)
    }
}