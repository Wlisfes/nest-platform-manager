import { BodyColumn, ResultColumn } from '@/interface/instance.resolver'
import { request } from '@/utils'

/**新增字典**/
export function httpBaseCreateSystemChunk(data: Omix) {
    return request({
        url: `/api/system/chunk/create`,
        method: 'POST',
        data
    })
}

/**字典列表**/
export function httpBaseColumnSystemChunk(data: BodyColumn<Omix>) {
    return request<ResultColumn<Omix>>({
        url: `/api/system/chunk/column`,
        method: 'POST',
        data
    })
}

/**编辑字典**/
export function httpBaseUpdateSystemChunk(data: Omix) {
    return request({
        url: `/api/system/chunk/update`,
        method: 'POST',
        data
    })
}

/**编辑字典状态**/
export function httpBaseUpdateStateSystemChunk(data: Omix) {
    return request({
        url: `/api/system/chunk/update/state`,
        method: 'POST',
        data
    })
}
