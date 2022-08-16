import { ErrorCodes } from "../../../constants/errorCodes";
import { BaseResponse } from "../../../reporter/base.response";


export class ChapterResponse extends BaseResponse {
    public static NotFound(data: any = null) {
        return new BaseResponse(ErrorCodes.CHAPTER, "Chapter Not Found", data)
    }
    public static AlreadyExist(data: any = null) {
        return new BaseResponse(ErrorCodes.CHAPTER + 1, "Chapter already exist", data)
    }
}