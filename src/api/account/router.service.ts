import { request } from '@/utils/utils-request'
import { RestColumn } from '@/interface/instance.resolver'
import * as env from '@/interface/instance.resolver'

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
export function httpColumnRouter() {
    return request<RestColumn<env.BodySaveRouter>>({
        url: `/api/system/router/column`,
        method: 'POST'
    })
}

/**所有菜单树**/
export function httpColumnTreeRouter() {
    return request<RestColumn<env.RestTreeRouter>>({
        url: `/api/system/router/column/tree`,
        method: 'GET'
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
