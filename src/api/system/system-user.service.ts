import { request } from '@/utils/utils-request'
import { BodyColumn, ResultColumn } from '@/interface/instance.resolver'

/**新增用户账号**/
export function httpBaseSystemUserCreate(data: Omix) {
    return request({
        url: `/api/system/user/create`,
        method: 'POST',
        data
    })
}

/**用户账号登录**/
export function httpBaseSystemUserTokenAuthorize(data: Omix) {
    return request({
        url: `/api/system/user/token/authorize`,
        method: 'POST',
        data
    })
}

/**获取账号基本信息**/
export function httpBaseSystemUserResolver() {
    return request({
        url: `/api/system/user/token/resolver`,
        method: 'GET'
    })
}

/**用户账号列表**/
export function httpBaseSystemColumnUser(data: BodyColumn<Omix>) {
    return request<ResultColumn<Omix>>({
        url: `/api/system/user/column`,
        method: 'POST',
        data
    })
}

/**通用用户账号列表**/
export function httpBaseSystemColumnChunkUser() {
    return request<Array<Omix>>({
        url: `/api/system/user/column/chunk`,
        method: 'POST'
    })
}

/**编辑账号状态**/
export function httpBaseSystemSwitchUser(data: Omix) {
    return request({
        url: `/api/system/user/update/state`,
        method: 'POST',
        data
    })
}
