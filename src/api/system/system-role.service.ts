import { request } from '@/utils/utils-request'
import { BodyColumn, ResultColumn } from '@/interface/instance.resolver'

/**新增角色**/
export function httpBaseSystemRoleCreate(data: Omix) {
    return request({
        url: `/api/system/role/create`,
        method: 'POST',
        data
    })
}

/**编辑角色**/
export function httpBaseSystemRoleUpdate(data: Omix) {
    return request({
        url: `/api/system/role/update`,
        method: 'POST',
        data
    })
}

/**编辑角色数据权限**/
export function httpBaseSystemRoleModelUpdate(data: Omix) {
    return request({
        url: `/api/system/role/model/update`,
        method: 'POST',
        data
    })
}

/**角色详情信息**/
export function httpBaseSystemRoleResolver(data: Omix) {
    return request({
        url: `/api/system/role/resolver`,
        method: 'POST',
        data
    })
}

/**删除角色**/
export function httpBaseSystemRoleDelete(data: Omix) {
    return request({
        url: `/api/system/role/delete`,
        method: 'POST',
        data
    })
}

/**所有角色配置**/
export function httpBaseSystemColumnRoleWhole() {
    return request({
        url: `/api/system/role/column/whole`,
        method: 'POST'
    })
}

/**角色关联用户列表**/
export function httpBaseSystemColumnRoleUser(data: BodyColumn<Omix>) {
    return request<ResultColumn<Omix>>({
        url: `/api/system/role/column/user`,
        method: 'POST',
        data
    })
}

/**角色关联用户**/
export function httpBaseSystemJoinRoleUser(data: Omix) {
    return request({
        url: `/api/system/role/join/user`,
        method: 'POST',
        data
    })
}

/**移除角色关联用户**/
export function httpBaseSystemJoinRoleUserDelete(data: Omix) {
    return request({
        url: `/api/system/role/join/user/delete`,
        method: 'POST',
        data
    })
}
