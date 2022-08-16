import { ErrorCodes } from "../../../constants/errorCodes";
import { BaseResponse } from "../../../reporter/base.response";


export class NewsResponse extends BaseResponse {
    public static NotFound(data: any = null) {
        return new BaseResponse(ErrorCodes.NEWS, "News Not Found", data)
    }
    public static AlreadyExist(data: any = null) {
        return new BaseResponse(ErrorCodes.NEWS + 1, "News already exist", data)
    }
    public static Language(data: any = null) {
            return new BaseResponse(ErrorCodes.NEWS + 2, "Language must be provided", data)
    }
}