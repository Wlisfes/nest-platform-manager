import { request } from '@/utils'

/**添加通用角色**/
export function httpBaseSystemCreateCommonRole(data: Omix) {
    return request({
        url: `/api/windows/system/role/create/common`,
        method: 'POST',
        data
    })
}

/**添加部门角色**/
export function httpBaseSystemCreateDepartmentRole(data: Omix) {
    return request({
        url: `/api/windows/system/role/create/department`,
        method: 'POST',
        data
    })
}

/**编辑通用角色**/
export function httpBaseSystemUpdateCommonRole(data: Omix) {
    return request({
        url: `/api/windows/system/role/update/common`,
        method: 'POST',
        data
    })
}

/**编辑部门角色**/
export function httpBaseSystemUpdateDepartmentRole(data: Omix) {
    return request({
        url: `/api/windows/system/role/update/department`,
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

/**通用角色列表查询**/
export function httpBaseSystemColumnCommonRole(data: Omix) {
    return request({
        url: `/api/windows/system/role/column/common`,
        method: 'POST',
        data
    })
}

/**部门角色列表查询**/
export function httpBaseSystemColumnDepartmentRole(data: Omix) {
    return request({
        url: `/api/windows/system/role/column/department`,
        method: 'POST',
        data
    })
}

/**角色关联账号列表**/
export function httpBaseSystemColumnRoleAccount(data: Omix) {
    return request({
        url: `/api/windows/system/role/account/column`,
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
