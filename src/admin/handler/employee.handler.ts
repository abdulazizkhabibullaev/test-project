import { EmployeeDto } from "../../common/validation/dto/employee.dto";
import { DtoGroup } from "../../common/validation/dtoGroups";
import { validateIt } from "../../common/validation/validate";
import { employeeService } from "../../common/service/employee.service";
import { EmployeeResponse } from "../../common/db/model/employee/employee.error";
import { jwt } from "../../common/utils/jwt";
import { roleService } from "../../common/service/role.service";
import { ROLES } from "../../common/constants/roles";
import { PagingDto } from "../../common/validation/dto/paging.dto";
import { BaseDto } from "../../common/validation/base.dto";

export async function createEmployeeHandler(req: any, res: any, next: Function) {
    try {
        await roleService.hasAccess(req.roleId, ROLES.EMPLOYEE_CREATE)
        const data = await validateIt(req.body, EmployeeDto, [DtoGroup.CREATE])

        const employee = await employeeService.create(data)

        return res.send(EmployeeResponse.Success(employee._id))
    } catch (error) {
        return next(error)
    }
}

export async function signInHandler(req: any, res: any, next: Function) {
    try {
        const data = await validateIt(req.body, EmployeeDto, [DtoGroup.LOGIN])
        const employee = await employeeService.findByPhoneNumber(req.body.phoneNumber)

        if (data.password != employee.password) throw EmployeeResponse.InvalidPassword()
        const token = jwt.sign({ phoneNumber: employee.phoneNumber })
        
        return res.send(EmployeeResponse.Success({
            token,
            employee: {
                _id: employee._id,
                fullName: employee.fullName,
                phoneNumber: employee.phoneNumber
            }
        }));
    } catch (error) {
        return next(error)
    }
}

export async function getEmployeePagingHandler(req: any, res: any, next: Function) {
    try {
        await roleService.hasAccess(req.roleId, ROLES.EMPLOYEE)

        const data = await validateIt(req.query, PagingDto, DtoGroup.PAGING)

        const employee = await employeeService.getPaging(data)

        const result = {
            ...await employeeService.getCount(),
            data: employee
        }

        return res.send(EmployeeResponse.Success(result))
    } catch (error) {
        throw next(error)
    }
}

export async function getEmployeeByIdHandler(req, res, next: Function) {
    try {
        await roleService.hasAccess(req.roleId, ROLES.EMPLOYEE)

        const data = await validateIt(req.params, BaseDto, DtoGroup.GET_BY_ID)
        
        const employee = await employeeService.getById(data._id)
        
        return res.send(EmployeeResponse.Success(employee))

    } catch (error) {
        throw next(error)
    }
    
}

export async function updateEmployeeHandler(req: any, res: any, next: Function) {
    try {

        await roleService.hasAccess(req.roleId, ROLES.EMPLOYEE_UPDATE)
        
        const data = await validateIt(req.params, BaseDto, DtoGroup.UPDATE)

        let employee = await employeeService.findById(data)
        if (!employee._id) throw EmployeeResponse.NotFound
        
        const updateEmployee = await employeeService.update(req.params._id, req.body)

        return res.send(EmployeeResponse.Success(updateEmployee._id))

    } catch (error) {
        return next(error)
    }
}

export async function deleteEmployeeHandler(req, res, next: Function) {
    try {
        await roleService.hasAccess(req.roleId, ROLES.EMPLOYEE_DELETE)

        const data = await validateIt(req.params, BaseDto, DtoGroup.GET_BY_ID)

        const employee = await employeeService.deleteOne(data._id)

        return res.send(EmployeeResponse.Success(employee._id))
    } catch (error) {
        throw next(error)
    }
    
}