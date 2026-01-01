import { request } from '@/utils'

/**账号列表**/
export function httpBaseSystemColumnAccount(data: Omix) {
    return request({
        url: `/api/windows/system/account/column`,
        method: 'POST',
        data
    })
}
