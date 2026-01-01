import { BodyColumn, ResultColumn } from '@/interface/instance.resolver'
import { request } from '@/utils'

/**新增部门**/
export function httpBaseSystemDeptCreate(data: Omix) {
    return request({
        url: `/api/system/dept/create`,
        method: 'POST',
        data
    })
}

/**编辑部门**/
export function httpBaseSystemDeptUpdate(data: Omix) {
    return request({
        url: `/api/system/dept/update`,
        method: 'POST',
        data
    })
}

/**删除部门**/
export function httpBaseSystemDeptDelete(data: Omix) {
    return request({
        url: `/api/system/dept/delete`,
        method: 'POST',
        data
    })
}

/**完整部门树**/
export function httpBaseSystemDeptCascader() {
    return request({
        url: `/api/system/dept/cascader`,
        method: 'POST'
    })
}

/**部门列表**/
export function httpBaseSystemDeptColumn(data: Omix) {
    return request({
        url: `/api/system/dept/column`,
        method: 'POST',
        data
    })
}

/**关联用户**/
export function httpBaseSystemJoinDeptUser(data: Omix) {
    return request({
        url: `/api/system/dept/join/user`,
        method: 'POST',
        data
    })
}
