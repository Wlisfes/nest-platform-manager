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

/**更新自定义json**/
export function httpBaseDeployKinesUpdate(data: Omix<{ type: string; document: string; json: Array<Omix> | Omix }>) {
    return request({
        url: `/api/system/deploy/kines/update`,
        method: 'POST',
        data
    })
}

/**查询自定义json**/
export function httpBaseDeployKinesCompiler(data: Omix<{ type: string }>) {
    return request<Omix>({
        url: `/api/system/deploy/kines/resolver`,
        method: 'POST',
        data
    })
}
