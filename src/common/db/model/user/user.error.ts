import { ErrorCodes } from "../../../constants/errorCodes";
import { BaseResponse } from "../../../reporter/base.response";

export class UserResponse extends BaseResponse {
    static AlreadyExist(data: any = null) {
        return new UserResponse(ErrorCodes.USER, "user exist", data)
    }
    public static NotFound(data: any = null) {
        return new UserResponse(ErrorCodes.USER + 1, "user not found", data);
    }
    public static NotEnoughPermission(data: any = null) {
        return new UserResponse(ErrorCodes.USER + 2, "not enough permission to access", data)
    }
    public static InvalidPassword(data: any = null) {
        return new UserResponse(ErrorCodes.USER+3, "Invalid password", data)
    }
    public static InvalidToken(data: any = null) {
        return new UserResponse(ErrorCodes.USER+4, "Invalid Token", data)
    }
    
}