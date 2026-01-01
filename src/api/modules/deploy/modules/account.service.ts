import { request } from '@/utils/utils-request'

/**账号列表**/
export function httpBaseSystemColumnAccount(data: Omix) {
    return request({
        url: `/api/windows/system/account/column`,
        method: 'POST',
        data
    })
}
