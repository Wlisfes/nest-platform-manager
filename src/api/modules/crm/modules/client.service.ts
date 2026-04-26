import { request } from '@/utils'

/**销售管理-客户列表-新增客户**/
export function httpBaseCrmClientCommonCreate(data: Omix) {
    return request({
        url: `/api/windows/crm/client/common/create`,
        method: 'POST',
        data
    })
}

/**销售管理-客户列表-分页列表查询**/
export function httpBaseCrmClientCommonConsumer(data: Omix) {
    return request({
        url: `/api/windows/crm/client/common/consumer`,
        method: 'POST',
        data
    })
}

/**销售管理-客户列表-客户详情**/
export function httpBaseCrmClientResolver(data: Omix) {
    return request({
        url: `/api/windows/crm/client/resolver`,
        method: 'POST',
        data
    })
}
