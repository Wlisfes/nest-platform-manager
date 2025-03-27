import { request } from '@/utils/utils-request'
import { BodyColumn, ResultColumn } from '@/interface/instance.resolver'

/**菜单资源列表**/
export function httpBaseColumnSystemRouter(data: BodyColumn<Omix>) {
    return request<ResultColumn<Omix>>({ url: `/api/system/router/column`, method: 'POST', data })
}
