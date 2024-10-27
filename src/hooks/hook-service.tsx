import { toRefs, ref } from 'vue'
import { DataTableColumn } from 'naive-ui'
import { useState } from '@/hooks/hook-state'
import { RestResolver, RestColumn } from '@/interface/instance.resolver'

export interface SerState<T> extends Omix {
    cols: Omix<{ default: string; offset: string }>
    initialize: boolean
    loading: boolean
    columns: Array<DataTableColumn>
    offset: number
    limit: number
    dataSource: Array<T>
    checked: Array<T>
    total: number
}

export interface SerOption<T, U> extends Omix {
    immediate?: boolean
    loading?: boolean
    initialize?: boolean
    colsCount?: number
    offset?: number
    limit?: number
    form: Omix<U>
    columns: Array<DataTableColumn>
    request: (form: U, data: SerState<T>) => Promise<RestResolver<RestColumn<T>>>
    transform?: (data: RestColumn<T>) => RestColumn<T> | Promise<RestColumn<T>>
    callback?: (form: U, data: SerState<T>) => void | any | Promise<any>
}

export function fetchColsCompute(count: number) {
    const value = '1 570:2 860:3 1150:4 1440:5 1730:6'
    if ([1].includes(count)) {
        return { offset: '0 570:1 860:2 1150:3 1440:4 1730:5', default: value }
    } else if ([2].includes(count)) {
        return { offset: '0 570:0 860:1 1150:2 1440:3 1730:4', default: value }
    } else if ([3].includes(count)) {
        return { offset: '0 860:0 1150:1 1440:3 1730:3', default: value }
    } else if ([4].includes(count)) {
        return { offset: '0 1150:0 1440:1 1730:2', default: value }
    } else if ([5].includes(count)) {
        return { offset: '0 1440:0 1730:1', default: value }
    }
    return { offset: '0', default: value }
}

export function useService<T extends Omix, U extends Omix>(option: SerOption<T, U>) {
    const form = ref<U>(option.form)
    const { state, setState } = useState<SerState<T>>({
        cols: fetchColsCompute(option.colsCount ?? 0),
        initialize: option.initialize ?? true,
        loading: option.loading ?? true,
        columns: option.columns,
        offset: option.offset ?? 0,
        limit: option.limit ?? 10,
        dataSource: [],
        checked: [],
        total: 0
    })

    if (option.immediate ?? true) {
        fetchRequest()
    }

    async function setForm(value: Partial<Omix<U>> = {}): Promise<Omix<U>> {
        return (form.value = { ...form.value, ...value })
    }

    /**高级筛选提交事件**/
    async function fetchSubmit() {}

    /**接口请求**/
    async function fetchRequest() {
        try {
            await setState({ loading: true })
            const { data } = await option.request(form.value, state as SerState<T>).then(async response => {
                if (Boolean(option.transform)) {
                    return { ...response, data: await option.transform!(response.data) }
                }
                return response
            })
            return await setState({ loading: false, initialize: false, dataSource: data.list ?? [], total: data.total ?? 0 }).then(() => {
                option.callback?.(form.value, state as SerState<T>)
                return state
            })
        } catch (err) {
            return await setState({ loading: false, initialize: false, dataSource: [], total: 0 }).then(async () => {
                option.callback?.(form.value, state as SerState<T>)
                return state
            })
        }
    }

    /**表格列渲染**/
    function fetchColumnRender() {}

    return {
        form,
        state,
        ...toRefs(state),
        setState,
        setForm,
        fetchRequest,
        fetchColumnRender
    }
}
