import { request } from '@/utils'

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

/**菜单资源详情**/
export function httpBaseSystemResourceResolver(data: Omix) {
    return request({
        url: `/api/windows/system/resource/resolver`,
        method: 'POST',
        data
    })
}

/**菜单资源树结构表**/
export function httpBaseSystemSelectResource() {
    return request({
        url: `/api/windows/system/resource/select`,
        method: 'POST'
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
