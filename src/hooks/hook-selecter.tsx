import { toRefs } from 'vue'
import { isNotEmpty } from 'class-validator'
import { cloneDeep } from 'lodash-es'
import { useState } from '@/hooks/hook-state'
import { ResultResolver } from '@/interface/instance.resolver'

export interface BaseState {
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
export interface BaseOptions<T> extends Partial<BaseState> {
    /**立即执行**/
    immediate?: boolean
    /**数据转换**/
    transform?: (data: Array<Omix<T>>) => Array<Omix> | Promise<Array<Omix>>
    /**初始化回调事件**/
    callback?: (data: BaseState) => void | any
}

/**下拉通用查询接口hook**/
export function useSelectService<T>(request: (state: BaseState) => Promise<ResultResolver<Array<Omix>>>, options: BaseOptions<T> = {}) {
    const { state, setState } = useState<BaseState>({
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
