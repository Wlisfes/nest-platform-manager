import { request } from '@/utils/utils-request'
import { BodyColumn, ResultColumn, NoticeResolver } from '@/interface/instance.resolver'

/**菜单列表**/
export function httpBaseColumnSystemRouter(data: BodyColumn<Omix>) {
    return request<ResultColumn<Omix>>({
        url: `/api/system/router/column`,
        method: 'POST',
        data
    })
}

/**编辑菜单状态**/
export function httpBaseUpdateStateSystemRouter(data: Omix) {
    return request<NoticeResolver>({
        url: `/api/system/router/update/state`,
        method: 'POST',
        data
    })
}
