import { request } from '@/utils/utils-request'
import { BodyColumn, ResultColumn } from '@/interface/instance.resolver'

/**新增角色**/
export function httpBaseCreateSystemRole(data: Omix) {
    return request({
        url: `/api/system/role/create`,
        method: 'POST',
        data
    })
}

/**编辑角色**/
export function httpBaseUpdateSystemRole(data: Omix) {
    return request({
        url: `/api/system/role/update`,
        method: 'POST',
        data
    })
}

/**编辑角色状态**/
export function httpBaseUpdateStateSystemRole(data: Omix) {
    return request({
        url: `/api/system/role/update/state`,
        method: 'POST',
        data
    })
}

/**编辑角色权限**/
export function httpBaseUpdateSystemRoleAuthorize(data: Omix) {
    return request({
        url: `/api/system/role/update/authorize`,
        method: 'POST',
        data
    })
}

/**编辑角色用户**/
export function httpBaseUpdateSystemRoleUser(data: Omix) {
    return request({
        url: `/api/system/role/update/user`,
        method: 'POST',
        data
    })
}

/**角色列表**/
export function httpBaseColumnSystemRole(data: BodyColumn<Omix>) {
    return request<ResultColumn<Omix>>({
        url: `/api/system/role/column`,
        method: 'POST',
        data
    })
}
