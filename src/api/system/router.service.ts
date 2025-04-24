import { request } from '@/utils/utils-request'
import { BodyColumn, ResultColumn } from '@/interface/instance.resolver'

/**创建菜单**/
export function httpBaseSystemRouterCreate(data: Omix) {
    return request({
        url: `/api/system/router/create`,
        method: 'POST',
        data
    })
}

/**编辑菜单**/
export function httpBaseSystemRouterUpdate(data: Omix) {
    return request({
        url: `/api/system/router/update`,
        method: 'POST',
        data
    })
}

/**编辑菜单状态**/
export function httpBaseSystemSwitchRouter(data: Omix) {
    return request({
        url: `/api/system/router/update/state`,
        method: 'POST',
        data
    })
}

/**删除菜单**/
export function httpBaseSystemRouterDelete(data: Omix) {
    return request({
        url: `/api/system/router/delete`,
        method: 'POST',
        data
    })
}

/**菜单列表**/
export function httpBaseSystemColumnRouter(data: BodyColumn<Omix>) {
    return request<ResultColumn<Omix>>({
        url: `/api/system/router/column`,
        method: 'POST',
        data
    })
}

/**菜单列表树**/
export function httpBaseSystemColumnTreeRouter() {
    return request({
        url: `/api/system/router/column/tree`,
        method: 'GET'
    })
}

/**获取当前用户菜单**/
export function httpBaseSystemUserRouter() {
    return request({
        url: `/api/system/router/column/user`,
        method: 'GET'
    })
}

/**菜单资源详情**/
export function httpBaseSystemRouterResolver(params: Omix) {
    return request({
        url: `/api/system/router/resolver`,
        method: 'GET',
        params
    })
}
