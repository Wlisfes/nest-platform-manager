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

/**编辑账号**/
export function httpBaseSystemUpdateAccount(data: Omix) {
    return request({
        url: `/api/windows/system/account/update`,
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

/**编辑账号状态**/
export function httpBaseSystemUpdateSwitchAccount(data: Omix) {
    return request({
        url: `/api/windows/system/account/update/switch`,
        method: 'POST',
        data
    })
}

/**删除账号**/
export function httpBaseSystemDeleteAccount(data: Omix) {
    return request({
        url: `/api/windows/system/account/delete`,
        method: 'POST',
        data
    })
}
