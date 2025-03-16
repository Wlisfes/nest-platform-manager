import { request } from '@/utils/utils-request'

/**账号登录**/
export function httpCommonUserAuthorize(data: Omix) {
    return request({
        url: `/api/common/user/token/authorize`,
        method: 'POST',
        data
    })
}

/**获取账号基本信息**/
export function httpCommonUserResolver() {
    return request({
        url: `/api/common/user/token/resolver`,
        method: 'GET'
    })
}
