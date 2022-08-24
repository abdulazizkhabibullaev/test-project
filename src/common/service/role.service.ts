import { BeAnObject, IObjectWithTypegooseFunction, ModelType, Ref } from "@typegoose/typegoose/lib/types";
import { Types, RefType, QueryOptions, Document } from "mongoose";
import { EmployeeResponse } from "../../common/db/model/employee/employee.error";
import { RoleResponse } from "../../common/db/model/roles/role.error";
import { Role, RoleModel } from "../../common/db/model/roles/role.model";
import { CommonServices } from "../../common/service/common.service";
import { PagingDto } from "../../common/validation/dto/paging.dto";
import { RoleDto } from "../../common/validation/dto/role.dto";


class RoleService extends CommonServices<Role>{
    constructor(model: ModelType<Role>) {
        super(model)
    }

    public async getRoleById(id) {
        const role = await this.findById(id)
        if (!role) throw RoleResponse.NotFound(id)
        return role
    }

    public async create(data: RoleDto) {
        try {
            return await super.create(data)
        } catch (error) {
            if (error.code == 12000) throw RoleResponse.AlreadyExist(Object.keys(error.keyPattern))
            throw error
        }
    }

    public async hasAccess(id: string, access: string) {
        const role = await this.findById(id)
        if (!role) throw RoleResponse.NotFound(id)
        if (!role[access] || role.isDeleted) throw EmployeeResponse.NotEnoughPermission()

    }

    public async getPaging(data: PagingDto) {
            let query = {
                isDeleted: false
            }
            return this.findPaging(query, data)
    }

    public async update(id, data: RoleDto, options?: QueryOptions) {
        try {
            return await super.updateOne(id, data, options)
        } catch (e) {
            if (e.code == 11000) throw RoleResponse.AlreadyExist(Object.keys(e.keyPattern))
            throw e
        }
    }
}

export const roleService = new RoleService(RoleModel);
