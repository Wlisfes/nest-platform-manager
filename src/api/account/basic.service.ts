import { request } from '@/utils/utils-request'
import { BodyColumn, RestColumn } from '@/interface/instance.resolver'
import * as env from '@/interface/instance.resolver'

/**字典类型**/
export function httpColumnSimpleStalk() {
    return request({
        url: `/api/system/simple/stalk`,
        method: 'POST'
    })
}

/**字典列表**/
export function httpColumnSimple(data: BodyColumn) {
    return request({
        url: `/api/system/simple/list`,
        method: 'POST',
        data
    })
}

/**更新字典**/
export function httpUpdateSimple(data: Omix) {
    return request({
        url: `/api/system/simple/update`,
        method: 'POST',
        data
    })
}

/**字典详情**/
export function httpResolveSimple(params: Omix<{ id: number }>) {
    return request({
        url: `/api/system/simple/resolve`,
        method: 'POST',
        params
    })
}

/**新增菜单**/
export function httpCreateRouter(data: env.BodySaveRouter) {
    return request({
        url: `/api/system/router/create`,
        method: 'POST',
        data
    })
}

/**编辑菜单**/
export function httpUpdateRouter(data: env.BodySaveRouter) {
    return request({
        url: `/api/system/router/update`,
        method: 'POST',
        data
    })
}

/**菜单列表**/
export function httpColumnRouter(data: Omix<{ id: string }>) {
    return request<RestColumn<env.BodySaveRouter>>({
        url: `/api/system/router/column`,
        method: 'POST',
        data
    })
}

/**所有菜单树**/
export function httpColumnTreeRouter(data: Omix<{ type?: string }>) {
    return request<RestColumn<env.RestTreeRouter>>({
        url: `/api/system/router/column/tree`,
        method: 'POST',
        data
    })
}

/**菜单详情**/
export function httpResolveRouter(params: Omix<{ sid: string }>) {
    return request<env.BodySaveRouter>({
        url: `/api/system/router/resolve`,
        method: 'GET',
        params
    })
}
