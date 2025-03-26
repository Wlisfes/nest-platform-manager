import { request } from '@/utils/utils-request'

/**授权登录**/
export function httpBaseCreateSystemUserAuthorize(data: Omix) {
    return request({ url: `/api/system/user/token/authorize`, method: 'POST', data })
}

/**获取账号基本信息**/
export function httpBaseSystemUserResolver() {
    return request({ url: `/api/system/user/token/resolver`, method: 'GET' })
}
