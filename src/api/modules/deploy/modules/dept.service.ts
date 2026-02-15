import { request } from '@/utils'

/**添加部门**/
export function httpBaseSystemCreateDepartment(data: Omix) {
    return request({
        url: `/api/windows/system/sheet/create/resource`,
        method: 'POST',
        data
    })
}