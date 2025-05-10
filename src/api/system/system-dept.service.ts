import { request } from '@/utils/utils-request'
import { BodyColumn, ResultColumn } from '@/interface/instance.resolver'

/**新增部门**/
export function httpBaseSystemDeptCreate(data: Omix) {
    return request({
        url: `/api/system/dept/create`,
        method: 'POST',
        data
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
