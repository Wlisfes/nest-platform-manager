import { request } from '@/utils/utils-request'
import { BodyColumn, ResultColumn, SCHEMA_CHUNK_OPTIONS } from '@/interface/instance.resolver'

/**字典类型**/
export function httpBaseColumnSystemChunkType() {
    return request({
        url: `/api/system/chunk/column/type`,
        method: 'GET'
    })
}

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

/**批量获取字典分类列表**/
export function httpBaseSelectSystemChunk(data: Omix<{ type: Array<string> }>) {
    return request({
        url: `/api/system/chunk/select`,
        method: 'POST',
        data
    })
}
