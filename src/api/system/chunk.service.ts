import { request } from '@/utils/utils-request'
import { SCHEMA_CHUNK_OPTIONS } from '@/interface/instance.resolver'

/**批量获取字典分类列表**/
export function httpBaseSelectSystemChunk(data: Omix<{ type: Array<string> }>) {
    return request({
        url: `/api/system/chunk/select`,
        method: 'POST',
        data
    })
}
