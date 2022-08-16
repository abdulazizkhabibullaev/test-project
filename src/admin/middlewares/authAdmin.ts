import { BaseResponse } from "../../common/reporter/base.response"
import { employeeService } from "../../common/service/employee.service"
import { jwt } from "../../common/utils/jwt"

export async function authAdmin(request: any, response: any, next: Function){
    try {

        const { phoneNumber } = jwt.verify(request.headers.token)
        const employee = await employeeService.findByPhoneNumber(phoneNumber)

        request.roleId = employee.roleId
        request.employeeId = employee._id

        return next()
        
    } catch (error) {
        return next(BaseResponse.UnAuthorizationError(error))
    }
}