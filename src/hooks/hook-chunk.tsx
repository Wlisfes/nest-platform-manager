import { toRefs, ref } from 'vue'
import { cloneDeep } from 'lodash-es'
import { useState } from '@/hooks/hook-state'
import { COMMON_CHUNK_OPTIONS, ChunkName, ChunkCommonOptions, ChunkColumnOptions } from '@/interface/instance.resolver'
import { ResultResolver } from '@/interface/instance.resolver'
import { pick, isEmpty, isNotEmpty } from '@/utils/utils-common'
import * as Service from '@/api/instance.service'

/**枚举数枚举通用hooks配置**/
export interface ChunkOptions extends Partial<ChunkCommonOptions<boolean>> {
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
export function fetchInitState(options: ChunkOptions) {
    const obs = Array.from(new Set([...(options.type ?? []), ...Object.keys(pick(options, Object.keys(COMMON_CHUNK_OPTIONS)))])).reduce(
        (o: Omix, key: string) => ({ ...o, [key]: [] }),
        {}
    )
    return useState({
        ...obs,
        type: Array.from(new Set([...(options.type ?? []), ...Object.keys(obs)])),
        loading: options.loading ?? options.immediate ?? false,
        initialize: options.initialize ?? options.immediate ?? false
    } as Required<Pick<ChunkOptions, 'loading' | 'initialize' | 'type'> & ChunkCommonOptions<Array<ChunkColumnOptions>>>)
}

/**枚举数枚举通用hooks**/
export function useChunkService(options: ChunkOptions) {
    const { state, setState } = fetchInitState(options)

    if (options.immediate ?? true) {
        fetchRequest()
    }

    async function fetchRequest() {
        return await setState({ loading: true }).then(async () => {
            try {
                const { data } = await Service.httpBaseChunkSelect({ type: state.type })
                const s = options.transform ? options.transform(cloneDeep(data.data)) ?? {} : data
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
        ...toRefs(state),
        chunk: state,
        setState,
        fetchRequest
    }
}

/**缓存对象**********************************************************************************************/
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

export function useKinesService<T extends Omix>(options: KinesOptions) {
    const faseNode = ref<Omix<T>>({} as T)
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

/**缓存对象**********************************************************************************************/
export interface BaseSelectState {
    /**搜索关键字**/
    keyword: string
    /**初始化状态**/
    initialize?: boolean
    /**加载状态**/
    loading?: boolean
    /**缓存列表数据**/
    dataColumn: Array<Omix>
    /**全量列表数据**/
    dataSource: Array<Omix>
}
/**hooks基本配置**/
export interface BaseSelectOptions<T> extends Partial<BaseSelectState> {
    /**立即执行**/
    immediate?: boolean
    /**数据转换**/
    transform?: (data: Array<Omix<T>>) => Array<Omix> | Promise<Array<Omix>>
    /**初始化回调事件**/
    callback?: (data: BaseSelectState) => void | any
}

/**下拉通用查询接口hook**/
export function useSelectService<T>(
    request: (state: BaseSelectState) => Promise<ResultResolver<Array<Omix>>>,
    options: BaseSelectOptions<T> = {}
) {
    const { state, setState } = useState<BaseSelectState>({
        keyword: options.keyword ?? '',
        loading: options.loading ?? true,
        initialize: options.initialize ?? true,
        dataColumn: [],
        dataSource: []
    })

    if (options.immediate ?? true) {
        fetchRequest()
    }

    /**远程搜索下拉**/
    async function fetchRemote(keyword: string) {
        await setState({ keyword: keyword ?? '' })
        if (isNotEmpty(keyword)) {
            return await fetchRequest()
        } else {
            return await setState({ dataSource: [], dataColumn: [] })
        }
    }

    /**本地搜索过滤**/
    async function fetchCacheRemote(keyword: string, fieldName: string = 'name') {
        if (isNotEmpty(keyword)) {
            const newArr = state.dataSource.filter(item => {
                return item[fieldName].toLowerCase().includes(keyword.toLowerCase())
            })
            return await setState({ dataColumn: newArr.slice(0, 100) })
        } else {
            return await setState({ dataColumn: state.dataSource.slice(0, 100) })
        }
    }

    /**数据转换**/
    async function fetchTransform(data: Array<Omix>): Promise<Array<Omix<T>>> {
        if (options.transform) {
            const cloneData = cloneDeep(data) as Array<Omix<T>>
            return (await options.transform(cloneData)) as Array<Omix<T>>
        }
        return data as Array<Omix<T>>
    }

    async function fetchRequest() {
        try {
            await setState({ loading: true })
            const list = await request(state).then(({ data }) => fetchTransform(data ?? []))
            return await setState({ loading: false, initialize: false, dataSource: list, dataColumn: list.slice(0, 100) }).then(() => {
                options.callback?.(state)
                return state
            })
        } catch (err) {
            return await setState({ loading: false, initialize: false, dataSource: [], dataColumn: [] }).then(() => {
                options.callback?.(state)
                return state
            })
        }
    }

    return {
        ...toRefs(state),
        state,
        setState,
        fetchRequest,
        fetchRemote,
        fetchCacheRemote
    }
}
