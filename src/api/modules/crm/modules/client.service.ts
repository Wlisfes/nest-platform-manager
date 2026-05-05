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

/**销售管理-客户短信应用-分页列表**/
export function httpBaseCrmClientSmsColumn(data: Omix) {
    return request({
        url: `/api/windows/crm/client/sms/column`,
        method: 'POST',
        data
    })
}

/**销售管理-客户短信应用-新增**/
export function httpBaseCrmClientSmsCreate(data: Omix) {
    return request({
        url: `/api/windows/crm/client/sms/create`,
        method: 'POST',
        data
    })
}
