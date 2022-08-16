import { ErrorCodes } from "../../../constants/errorCodes";
import { BaseResponse } from "../../../reporter/base.response";

export class EmployeeResponse extends BaseResponse {
    static AlreadyExist(data: any = null) {
        return new EmployeeResponse(ErrorCodes.EMPLOYEE, "employee exist", data)
    }
    public static NotFound(data: any = null) {
        return new EmployeeResponse(ErrorCodes.EMPLOYEE + 1, "employee not found", data);
    }
    public static NotEnoughPermission(data: any = null) {
        return new EmployeeResponse(ErrorCodes.EMPLOYEE + 2, "not enough permission to access", data)
    }
    public static InvalidPassword(data: any = null) {
        return new EmployeeResponse(ErrorCodes.EMPLOYEE+3, "Invalid password", data)
    }
    public static InvalidToken(data: any = null) {
        return new EmployeeResponse(ErrorCodes.EMPLOYEE+4, "Invalid Token", data)
    }
    
}