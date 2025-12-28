import { request } from '@/utils/utils-request'
import { ChunkName, ChunkCommonOptions, ChunkColumnOptions } from '@/interface/instance.resolver'

/**通用下拉字典**/
export function httpBaseChunkSelect(data: Omix<{ type: Array<ChunkName> }>) {
    return request<ChunkCommonOptions<Array<ChunkColumnOptions>>>({
        url: `/api/windows/chunk/enums/select`,
        method: 'POST',
        data
    })
}
