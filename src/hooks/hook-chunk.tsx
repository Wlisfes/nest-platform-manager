import { toRefs } from 'vue'
import { cloneDeep } from 'lodash-es'
import { useState } from '@/hooks/hook-state'
import { SCHEMA_CHUNK_OPTIONS } from '@/interface/instance.resolver'
import { pick, fetchHandler } from '@/utils/utils-common'
import * as Service from '@/api/instance.service'
/**字典数据格式**/
export interface BaseChunkOption extends Omix {
    keyId: string
    name: string
    value: string
    type: string
    json: Omix
}
/**字典类数据格式转换**/
export interface BaseChunk<T> extends Record<keyof typeof SCHEMA_CHUNK_OPTIONS, T> {}
/**字典枚举通用hooks配置**/
export interface ChunkOption extends Partial<BaseChunk<boolean>> {
    immediate?: boolean
    initialize?: boolean
    loading?: boolean
    callback?: (data: ChunkState) => void
    transform?: (data: Record<keyof typeof SCHEMA_CHUNK_OPTIONS, Array<BaseChunkOption>>) => Omix
}
/**字典枚举通用hooks字段配置**/
export interface ChunkState extends BaseChunk<Array<BaseChunkOption>>, Pick<ChunkOption, 'initialize' | 'loading'> {}
/**初始化字段**/
export function initState(data: Omix = {}) {
    const ChunkOmix = Object.keys(SCHEMA_CHUNK_OPTIONS).reduce((ocs: Omix, key: string) => {
        return { ...ocs, [key]: data[key] ?? [] }
    }, {})
    return { ...ChunkOmix, ...data } as ChunkState
}
/**字典枚举通用hooks**/
export function useChunkService(options: ChunkOption) {
    const { state, setState } = useState<ChunkState>(
        initState({
            loading: options.loading ?? true,
            initialize: options.initialize ?? options.immediate ?? true
        })
    )

    if (options.immediate ?? true) {
        fetchRequest()
    }

    /**数据转换**/
    async function fetchTransform(data: Omix): Promise<BaseChunk<Array<Omix>>> {
        if (options.transform) {
            return ((await options.transform(cloneDeep(data))) ?? {}) as BaseChunk<Array<Omix>>
        }
        return (data ?? {}) as BaseChunk<Array<Omix>>
    }

    /**回调事件**/
    async function fetchCallback() {
        return await fetchHandler(!!options.callback, () => {
            return options.callback!(state)
        }).then(() => state)
    }

    async function fetchRequest() {
        return await setState({ loading: true }).then(async () => {
            try {
                const chunkData = await Service.httpBaseSelectSystemChunk({
                    type: Object.keys(pick(options, Object.keys(SCHEMA_CHUNK_OPTIONS)))
                }).then(async ({ data }) => {
                    return await fetchTransform(data ?? {})
                })
                return await setState(initState({ loading: false, initialize: false, ...chunkData })).then(async () => {
                    return await fetchCallback()
                })
            } catch (err) {
                return await setState(initState({ loading: false, initialize: false })).then(async () => {
                    return await fetchCallback()
                })
            }
        })
    }

    return {
        ...toRefs(state),
        state,
        setState,
        fetchRequest
    }
}
