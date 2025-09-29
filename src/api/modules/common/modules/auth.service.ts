import { request } from '@/utils/utils-request'

/**
 * 账号登录
 * @param data.number   工号,示例值(1234)
 * @param data.password 密码,示例值(MTIzNDU2)
 * @param data.code     验证码,示例值(495673)
 */
export function httpCommonAuthAccountToken(data: Omix) {
    return request({
        url: `/api/windows/auth/token/login`,
        method: 'POST',
        data
    })
}

/**登录续时**/
export function httpCommonAuthAccountTokenContinue() {
    return request({
        url: `/api/windows/auth/token/continue`,
        method: 'POST'
    })
}

/**登录账户信息**/
export function httpCommonAuthAccountTokenResolver() {
    return request({
        url: `/api/windows/auth/token/resolver`,
        method: 'GET'
    })
}

/**登录账户权限**/
export function httpCommonAuthAccountTokenResource() {
    return request({
        url: `/api/windows/auth/token/resource`,
        method: 'GET'
    })
}
