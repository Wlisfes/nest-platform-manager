import { toRefs } from 'vue'
import { isNotEmpty } from 'class-validator'
import { cloneDeep } from 'lodash-es'
import { useState } from '@/hooks/hook-state'
import { RestResolver, RestColumn } from '@/interface/instance.resolver'

export interface SetNode extends Omix {
    sid: string
    name: string
    label: string
    value: string
}
export interface SetState {
    keywords: string
    loading: boolean
    initialize: boolean
    dataColumn: Array<SetNode>
    dataSource: Array<SetNode>
}
export type httpRequest = (state: SetState) => Promise<RestResolver<RestColumn<Omix>>>
export interface SetOption<T> extends Partial<SetState> {
    immediate?: boolean
    transform?: (data: Array<SetNode & T>) => Array<Omix> | Promise<Array<Omix>>
    callback?: (state: SetState) => void | any
}

/**下拉通用查询接口hook**/
export function useSelecter<T>(request: httpRequest, options: SetOption<T> = {}) {
    const { state, setState } = useState<SetState>({
        keywords: options.keywords ?? '',
        loading: options.loading ?? false,
        initialize: options.initialize ?? false,
        dataColumn: [],
        dataSource: []
    })

    if (options.immediate ?? true) {
        fetchRequest()
    }

    /**远程搜索下拉**/
    async function fetchRemote(keywords: string) {
        await setState({ keywords: keywords ?? '' })
        if (isNotEmpty(keywords)) {
            return await fetchRequest()
        } else {
            return await setState({ dataSource: [], dataColumn: [] })
        }
    }

    /**本地搜索过滤**/
    async function fetchCacheRemote(keywords: string, fieldName: string = 'name') {
        if (isNotEmpty(keywords)) {
            const newArr = state.dataSource.filter(item => {
                return item[fieldName].toLowerCase().includes(keywords.toLowerCase())
            })
            return await setState({ dataColumn: newArr.slice(0, 100) })
        } else {
            return await setState({ dataColumn: state.dataSource.slice(0, 100) })
        }
    }

    /**移除空数据children字段**/
    function fetchTreeNodeChilder(data: Array<Omix>) {
        data.forEach((node: Omix) => {
            if (node.children && node.children.length > 0) {
                return fetchTreeNodeChilder(node.children)
            }
            return delete node.children
        })
        return data
    }

    /**数据转换**/
    async function fetchTransform(data: Array<Omix>): Promise<Array<SetNode & T>> {
        if (options.transform) {
            const cloneData = cloneDeep(data) as Array<SetNode & T>
            return (await options.transform(cloneData)) as Array<SetNode & T>
        }
        return data as Array<SetNode & T>
    }

    async function fetchRequest() {
        try {
            await setState({ loading: true })
            const { data } = await request(state)
            const list = await fetchTransform(data.list ?? [])
            return await setState({
                loading: false,
                initialize: true,
                dataSource: list,
                dataColumn: list.slice(0, 100)
            }).then(() => {
                options.callback?.(state)
                return state
            })
        } catch (err) {
            return await setState({
                loading: false,
                initialize: false,
                dataSource: [],
                dataColumn: []
            }).then(() => {
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
        fetchCacheRemote,
        fetchTreeNodeChilder
    }
}
