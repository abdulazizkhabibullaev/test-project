import { BaseResponse } from "../../common/reporter/base.response"
import { userService } from "../../common/service/user.service"
import { jwt } from "../../common/utils/jwt"

export async function authUser(request: any, response: any, next: Function){
    try {
        const { phoneNumber } = jwt.verify(request.headers.token)
        const user = await userService.findByPhoneNumber(phoneNumber)

        request.userId = user._id

        return next()

    } catch (error) {
        return next(BaseResponse.UnAuthorizationError(error))
    }
}