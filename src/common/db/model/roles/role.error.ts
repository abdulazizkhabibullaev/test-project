import { BaseResponse } from "../../../reporter/base.response";
import { ErrorCodes } from "../../../constants/errorCodes";

export class RoleResponse extends BaseResponse {
    static NotFound(data: any = null) {
        return new BaseResponse(ErrorCodes.ROLE, 'Role not found', data);
    }
    static AlreadyExist(data: any = null) {
        return new BaseResponse(ErrorCodes.ROLE + 1, 'The role already exist!', data);
    }
    static NotEnoughPermission(data: any = null) {
        return new BaseResponse(ErrorCodes.ROLE + 2, 'Not enough permissions to access!', data);
    }

}
