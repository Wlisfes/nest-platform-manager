import { toRefs } from 'vue'
import { cloneDeep } from 'lodash-es'
import { useState } from '@/hooks'
import { pick } from '@/utils'
import { COMMON_CHUNK_OPTIONS, ChunkName, ChunkCommonOptions, ChunkColumnOptions } from '@/interface/instance.resolver'
import * as Service from '@/api/instance.service'

/**枚举数枚举通用hooks配置**/
interface ChunkServiceOptions extends Partial<ChunkCommonOptions<boolean>> {
    type?: Array<ChunkName>
    /**立即执行**/
    immediate?: boolean
    /**初始化状态**/
    initialize?: boolean
    /**加载状态**/
    loading?: boolean
    /**初始化回调事件**/
    callback?: (data: Omix) => void
    /**数据转换**/
    transform?: (data: Record<keyof typeof COMMON_CHUNK_OPTIONS, Array<ChunkColumnOptions>>) => Omix<typeof data>
}

/**初始化字段**/
function fetchInitState(options: ChunkServiceOptions) {
    const obs = Array.from(new Set([...(options.type ?? []), ...Object.keys(pick(options, Object.keys(COMMON_CHUNK_OPTIONS)))])).reduce(
        (o: Omix, key: string) => ({ ...o, [key]: [] }),
        {}
    )
    return useState({
        ...obs,
        type: Array.from(new Set([...(options.type ?? []), ...Object.keys(obs)])),
        loading: options.loading ?? options.immediate ?? false,
        initialize: options.initialize ?? options.immediate ?? false
    } as Required<Pick<ChunkServiceOptions, 'loading' | 'initialize' | 'type'> & ChunkCommonOptions<Array<ChunkColumnOptions>>>)
}

/**枚举数枚举通用hooks**/
export function useChunkService(options: ChunkServiceOptions) {
    const { state, setState } = fetchInitState(options)

    if (options.immediate ?? true) {
        fetchRequest()
    }

    async function fetchRequest() {
        return await setState({ loading: true }).then(async () => {
            try {
                const { data } = await Service.httpBaseChunkSelect({ type: state.type })
                const s = options.transform ? (options.transform(cloneDeep(data.data)) ?? {}) : data
                return await setState({ ...s, loading: false, initialize: false }).then(async () => {
                    return options.callback?.(state)
                })
            } catch (err) {
                return await setState({ loading: false, initialize: false }).then(async () => {
                    return options.callback?.(state)
                })
            }
        })
    }

    return {
        chunkState: state,
        ...toRefs(state),
        setState,
        fetchRequest
    }
}
