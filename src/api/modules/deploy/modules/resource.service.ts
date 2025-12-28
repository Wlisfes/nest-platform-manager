import { request } from '@/utils/utils-request'

/**新增菜单资源**/
export function httpBaseSystemCreateResource(data: Omix) {
    return request({
        url: `/api/windows/system/resource/create`,
        method: 'POST',
        data
    })
}

/**编辑菜单资源**/
export function httpBaseSystemUpdateResource(data: Omix) {
    return request({
        url: `/api/windows/system/resource/update`,
        method: 'POST',
        data
    })
}

/**菜单资源列表**/
export function httpBaseSystemColumnResource(data: Omix) {
    return request({
        url: `/api/windows/system/resource/column`,
        method: 'POST',
        data
    })
}
