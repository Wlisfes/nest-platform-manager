import { request } from '@/utils'

/**添加部门**/
export function httpBaseSystemCreateDepartment(data: Omix) {
    return request({
        url: `/api/windows/system/dept/create`,
        method: 'POST',
        data
    })
}

/**编辑部门**/
export function httpBaseSystemUpdateDepartment(data: Omix) {
    return request({
        url: `/api/windows/system/dept/update`,
        method: 'POST',
        data
    })
}

/**部门详情**/
export function httpBaseSystemDepartmentResolver(data: Omix) {
    return request({
        url: `/api/windows/system/dept/resolver`,
        method: 'POST',
        data
    })
}

/**部门树结构**/
export function httpBaseSystemDepartmentTreeStructure() {
    return request({
        url: `/api/windows/system/dept/tree/structure`,
        method: 'POST'
    })
}

/**部门分页列表查询**/
export function httpBaseSystemColumnDepartment(data: Omix) {
    return request({
        url: `/api/windows/system/dept/column`,
        method: 'POST',
        data
    })
}
