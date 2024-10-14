import { request } from '@/utils/utils-request'
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
