import { toRefs, ref } from 'vue'
import { DataTableColumn } from 'naive-ui'
import { useState } from '@/hooks/hook-state'
import { RestResolver, RestColumn } from '@/interface/instance.resolver'

export interface SerCols extends Omix {
    default: string
    pattern: string
    search: string
    span: string
}

export interface SerState<T> extends Omix {
    cols: SerCols
    initialize: boolean
    loading: boolean
    columns: Array<DataTableColumn>
    dataSource: Array<T>
    checked: Array<T>
    total: number
}

export interface SerOption<T, U> extends Omix {
    immediate?: boolean
    loading?: boolean
    initialize?: boolean
    form: Omix<U>
    columns: Array<DataTableColumn>
    request: (form: U, data: SerState<T>) => Promise<RestResolver<RestColumn<T>>>
    transform?: (data: RestColumn<T>) => RestColumn<T> | Promise<RestColumn<T>>
    callback?: (form: U, data: SerState<T>) => void | any | Promise<any>
}

export function useService<T extends Omix, U extends Omix>(option: SerOption<T, U>) {
    const form = ref<U>(option.form)
    const { state, setState } = useState<SerState<T>>({
        cols: {
            default: '1 736:2 1110:3 1480:4 1860:5 2230:6',
            search: '4 840:8 1110:12 1590:18',
            span: '4',
            pattern: '4 840:4 1110:4'
        },
        initialize: option.initialize ?? true,
        loading: option.loading ?? true,
        columns: option.columns,
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

    return {
        form,
        state,
        ...toRefs(state),
        setState,
        setForm,
        fetchRequest
    }
}
