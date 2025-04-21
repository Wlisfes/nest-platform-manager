import { request } from '@/utils/utils-request'

/**获取枚举来源类型**/
export function httpBaseDeployEnumsColumnTypes() {
    return request<Array<Omix<{ value: string; name: string }>>>({
        url: `/api/system/deploy/enums/column/types`,
        method: 'POST'
    })
}

/**批量获取枚举分类列表**/
export function httpBaseDeployEnumsCompiler(data: Omix<{ type: Array<string> }>) {
    return request<Array<Omix<{ value: string; name: string }>>>({
        url: `/api/system/deploy/enums/column/select`,
        method: 'POST',
        data
    })
}
