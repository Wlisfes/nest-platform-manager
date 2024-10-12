import { request } from '@/utils/utils-request'
import * as env from '@/interface/instance.resolver'

/**员工账号登录**/
export function httpAuthMember(data: env.BodyAuthMember) {
    return request<env.RestAuthMember>({
        url: `/api/account/member/login`,
        method: 'POST',
        data
    })
}
