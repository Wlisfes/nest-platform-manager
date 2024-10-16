import { toRefs } from 'vue'
import { DataTableColumn } from 'naive-ui'
import { useState } from '@/hooks/hook-state'
import { RestResolver, RestColumn } from '@/interface/instance.resolver'

export interface SerState<T, U> extends Omix {
    initialize: boolean
    loading: boolean
    columns: Array<DataTableColumn>
    dataSource: Array<T>
    select: Array<T>
    total: number
    form: Omix<U>
}

export interface SerOption<T, U> extends Omix {
    immediate?: boolean
    loading?: boolean
    initialize?: boolean
    form: Omix<U>
    columns: Array<DataTableColumn>
    request: (data: SerState<T, U>) => Promise<RestResolver<RestColumn<T>>>
    transform?: (data: RestColumn<T>) => RestColumn<T> | Promise<RestColumn<T>>
    callback?: (data: SerState<T, U>) => void | any | Promise<any>
}

export function useService<T extends Omix, U extends Omix>(option: SerOption<T, U>) {
    const { state, setState } = useState<SerState<T, U>>({
        initialize: option.initialize ?? true,
        loading: option.loading ?? true,
        columns: option.columns,
        dataSource: [],
        select: [],
        total: 0,
        form: option.form
    })

    if (option.immediate ?? true) {
        fetchRequest()
    }

    /**接口请求**/
    async function fetchRequest() {
        try {
            await setState({ loading: true })
            const { data } = await option.request(state as SerState<T, U>).then(async response => {
                if (Boolean(option.transform)) {
                    return { ...response, data: await option.transform!(response.data) }
                }
                return response
            })
            return await setState({ loading: false, initialize: false, dataSource: data.list ?? [], total: data.total ?? 0 }).then(() => {
                option.callback?.(state as SerState<T, U>)
                return state
            })
        } catch (err) {
            return await setState({ loading: false, initialize: false, dataSource: [], total: 0 }).then(async () => {
                option.callback?.(state as SerState<T, U>)
                return state
            })
        }
    }

    return {
        ...toRefs(state),
        state,
        setState
    }
}
