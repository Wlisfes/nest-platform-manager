import { request } from '@/utils'

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

/**分页列表查询**/
export function httpBaseSystemColumnSheet(data: Omix) {
    return request({
        url: `/api/windows/system/sheet/column`,
        method: 'POST',
        data
    })
}

/**菜单树结构**/
export function httpBaseSystemSheetTreeStructure() {
    return request({
        url: `/api/windows/system/sheet/tree/structure`,
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
