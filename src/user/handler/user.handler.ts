import { UserDto } from "../../common/validation/dto/user.dto";
import { DtoGroup } from "../../common/validation/dtoGroups";
import { validateIt } from "../../common/validation/validate";
import { userService } from "../../common/service/user.service";
import { UserResponse } from "../../common/db/model/user/user.error";
import { jwt } from "../../common/utils/jwt";
import { PagingDto } from "../../common/validation/dto/paging.dto";
import { BaseDto } from "../../common/validation/base.dto";

export async function createUserHandler(req: any, res: any, next: Function) {
    try {
        const data = await validateIt(req.body, UserDto, [DtoGroup.CREATE])

        const user = await userService.create(data)

        return res.send(UserResponse.Success(user._id))
    } catch (error) {
        return next(error)
    }
}

export async function signInHandler(req: any, res: any, next: Function) {
    try {
        const data = await validateIt(req.body, UserDto, DtoGroup.LOGIN)
        const user = await userService.findByPhoneNumber(req.body.phoneNumber)

        if (data.password != user.password) throw UserResponse.InvalidPassword()
        const token = jwt.sign({ phoneNumber: user.phoneNumber })

        return res.send(UserResponse.Success({
            token,
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber
            }
        }));
    } catch (error) {
        return next(error)
    }
}


export async function getMyselfHandler(req, res, next: Function) {
    try {
        console.log(req.userId)
        const user = await userService.getById(req.userId)

        return res.send(UserResponse.Success(user))

    } catch (error) {
        throw next(error)
    }

}

export async function updateUserHandler(req: any, res: any, next: Function) {
    try {
        let user = await userService.findById(req.userId)
        if (!user._id) throw UserResponse.NotFound
        
        const updateUser = await userService.update(user._id, req.body)

        return res.send(UserResponse.Success(updateUser._id))

    } catch (error) {
        return next(error)
    }
}

export async function deleteUserHandler(req, res, next: Function) {
    try {

        const data = await validateIt(req.params, BaseDto, DtoGroup.GET_BY_ID)

        const user = await userService.deleteOne(data._id)

        return res.send(UserResponse.Success(user._id))
    } catch (error) {
        throw next(error)
    }

}