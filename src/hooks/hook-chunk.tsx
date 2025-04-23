import { toRefs, ref, Ref } from 'vue'
import { cloneDeep } from 'lodash-es'
import { useState } from '@/hooks/hook-state'
import { SCHEMA_CHUNK_OPTIONS } from '@/interface/instance.resolver'
import { pick, isEmpty, fetchHandler } from '@/utils/utils-common'
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
                const chunkData = await Service.httpBaseDeployEnumsCompiler({
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

/**缓存对象**/
export interface KinesState extends Omix {
    /**初始化状态**/
    initialize?: boolean
    /**加载状态**/
    loading?: boolean
    /**json类型**/
    type: string
    /**json描述**/
    document?: string
}
/**hooks默认配置**/
export interface KinesOptions extends KinesState {
    /**立即执行**/
    immediate?: boolean
}

export function useKinesService<T>(options: KinesOptions) {
    const faseNode = ref<T>(options.value as never) as Ref<T>
    const { state, setState } = useState<KinesState>({
        initialize: options.initialize ?? true,
        loading: options.loading ?? true,
        type: options.type,
        document: options.document
    })

    if (options.immediate && state.type) {
        fetchKinesCompiler()
    }

    /**更新自定义json**/
    async function fetchKinesUpdater(opts: Omix<{ type?: string; document?: string; json: Omix }>) {
        if ((isEmpty(opts.type) && isEmpty(state.type)) || (isEmpty(opts.document) && isEmpty(state.document))) {
            return faseNode.value
        }
        return await setState({ loading: true }).then(async () => {
            try {
                return await Service.httpBaseDeployKinesUpdate({
                    type: opts.type ?? String(state.type),
                    document: opts.document ?? String(state.document),
                    json: opts.json
                }).then(async ({ message }) => {})
            } catch (err) {
                return await setState({ loading: false })
            }
        })
    }

    /**查询自定义json**/
    async function fetchKinesCompiler(opts: Omix<{ type?: string }> = {}) {
        if (isEmpty(opts.type) && isEmpty(state.type)) {
            return faseNode.value
        }
        return await setState({ loading: true }).then(async () => {
            try {
                return await Service.httpBaseDeployKinesCompiler({ type: opts.type ?? String(state.type) }).then(async ({ data }) => {
                    return await setState({ initialize: false, loading: false }).then(() => {
                        return (faseNode.value = (data?.json ?? {}) as T)
                    })
                })
            } catch (err) {
                return await setState({ initialize: false, loading: false }).then(() => {
                    return (faseNode.value = {} as T)
                })
            }
        })
    }

    /**刷新**/
    async function fetchRefresh(data: Partial<KinesState> = {}) {
        return await setState(data).then(async () => {
            return await fetchKinesCompiler(data)
        })
    }

    return {
        faseNode,
        state,
        ...toRefs(state),
        setState,
        fetchRefresh,
        fetchKinesUpdater,
        fetchKinesCompiler
    }
}
