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

/***************************************************************************************************/
/**添加菜单**/
export function httpBaseSystemCreateSheetResource(data: Omix) {
    return request({
        url: `/api/windows/system/sheet/create/resource`,
        method: 'POST',
        data
    })
}

/**编辑菜单**/
export function httpBaseSystemUpdateSheetResource(data: Omix) {
    return request({
        url: `/api/windows/system/sheet/update/resource`,
        method: 'POST',
        data
    })
}

/**菜单列表**/
export function httpBaseSystemColumnSheetResource(data: Omix) {
    return request({
        url: `/api/windows/system/sheet/column/resource`,
        method: 'POST',
        data
    })
}

/**菜单树结构**/
export function httpBaseSystemTreeSheetResource() {
    return request({
        url: `/api/windows/system/sheet/tree/resource`,
        method: 'POST'
    })
}

/**菜单、按钮详情**/
export function httpBaseSystemSheetResolver(data: Omix) {
    return request({
        url: `/api/windows/system/sheet/resolver`,
        method: 'POST',
        data
    })
}

/**添加权限按钮**/
export function httpBaseSystemCreateSheetAuthorize(data: Omix) {
    return request({
        url: `/api/windows/system/sheet/create/authorize`,
        method: 'POST',
        data
    })
}

/**编辑权限按钮**/
export function httpBaseSystemUpdateSheetAuthorize(data: Omix) {
    return request({
        url: `/api/windows/system/sheet/update/authorize`,
        method: 'POST',
        data
    })
}
