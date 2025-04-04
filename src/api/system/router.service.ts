import { request } from '@/utils/utils-request'
import { BodyColumn, ResultColumn } from '@/interface/instance.resolver'

/**创建菜单**/
export function httpBaseCreateSystemRouter(data: Omix) {
    return request({
        url: `/api/system/router/create`,
        method: 'POST',
        data
    })
}

/**编辑菜单**/
export function httpBaseUpdateSystemRouter(data: Omix) {
    return request({
        url: `/api/system/router/update`,
        method: 'POST',
        data
    })
}

/**编辑菜单状态**/
export function httpBaseUpdateStateSystemRouter(data: Omix) {
    return request({
        url: `/api/system/router/update/state`,
        method: 'POST',
        data
    })
}

/**删除菜单**/
export function httpBaseDeleteSystemRouter(data: Omix) {
    return request({
        url: `/api/system/router/delete`,
        method: 'POST',
        data
    })
}

/**菜单列表**/
export function httpBaseColumnSystemRouter(data: BodyColumn<Omix>) {
    return request<ResultColumn<Omix>>({
        url: `/api/system/router/column`,
        method: 'POST',
        data
    })
}

/**菜单列表树**/
export function httpBaseColumnTreeSystemRouter() {
    return request({
        url: `/api/system/router/column/tree`,
        method: 'GET'
    })
}

/**获取当前用户菜单**/
export function httpBaseColumnUserSystemRouter() {
    return request({
        url: `/api/system/router/user`,
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
