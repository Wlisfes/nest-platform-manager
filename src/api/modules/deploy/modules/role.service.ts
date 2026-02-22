import { request } from '@/utils'

/**添加岗位角色**/
export function httpBaseSystemCreateRole(data: Omix) {
    return request({
        url: `/api/windows/system/role/create`,
        method: 'POST',
        data
    })
}

/**编辑岗位角色**/
export function httpBaseSystemUpdateRole(data: Omix) {
    return request({
        url: `/api/windows/system/role/update`,
        method: 'POST',
        data
    })
}

/**角色详情**/
export function httpBaseSystemRoleResolver(data: Omix) {
    return request({
        url: `/api/windows/system/role/resolver`,
        method: 'POST',
        data
    })
}

/**角色列表查询**/
export function httpBaseSystemColumnRole(data?: Omix) {
    return request({
        url: `/api/windows/system/role/column`,
        method: 'POST',
        data
    })
}

/**角色关联账号列表**/
export function httpBaseSystemColumnAccountRole(data: Omix) {
    return request({
        url: `/api/windows/system/role/account/column`,
        method: 'POST',
        data
    })
}

/**角色关联用户**/
export function httpBaseSystemCreateAccountRole(data: Omix) {
    return request({
        url: `/api/windows/system/role/account/join`,
        method: 'POST',
        data
    })
}

/**删除角色关联用户**/
export function httpBaseSystemDeleteAccountRole(data: Omix) {
    return request({
        url: `/api/windows/system/role/account/delete`,
        method: 'POST',
        data
    })
}

/**角色菜单权限列表**/
export function httpBaseSystemColumnRoleSheet(data: Omix) {
    return request({
        url: `/api/windows/system/role/sheet/column`,
        method: 'POST',
        data
    })
}
