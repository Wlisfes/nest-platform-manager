import { request } from '@/utils'

/**新增账号**/
export function httpBaseSystemCreateAccount(data: Omix) {
    return request({
        url: `/api/windows/system/account/create`,
        method: 'POST',
        data
    })
}

/**账号列表**/
export function httpBaseSystemColumnAccount(data: Omix) {
    return request({
        url: `/api/windows/system/account/column`,
        method: 'POST',
        data
    })
}

/**账号详情**/
export function httpBaseSystemAccountResolver(data: Omix) {
    return request({
        url: `/api/windows/system/account/resolver`,
        method: 'POST',
        data
    })
}
