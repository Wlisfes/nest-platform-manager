import { ref, toRefs, Ref } from 'vue'
import { DataTableColumn } from 'naive-ui'
import { useState } from '@/hooks/hook-state'
import { useKinesService } from '@/hooks/hook-chunk'
import { ResultResolver, ResultColumn } from '@/interface/instance.resolver'
import * as utils from '@/utils/utils-common'

export type ColumnState<T> = Omix & {
    /**事件类型**/
    event: 'input-submit' | 'submit'
    /**初始化状态**/
    initialize: boolean
    /**加载状态**/
    loading: boolean
    /**当前页**/
    page: number
    /**当前页数量**/
    size: number
    /**列表总数**/
    total: number
    /**列表勾选ID数组**/
    rowKeys: Array<string>
    /**列表勾选对象数组**/
    rowNodes: Array<T>
    /**表头数据**/
    columns: Array<Omix<DataTableColumn>>
    /**列表数据**/
    dataSource: Array<T>
}
export type ColumnOption<T, U, R> = Partial<ColumnState<T>> & {
    /**自定义json类型**/
    dynamic?: string
    /**自定义json描述**/
    document?: string
    /**是否排除空字段**/
    exclude?: boolean
    /**立即执行**/
    immediate?: boolean
    /**额外字段**/
    option?: Omix<R>
    /**表头**/
    columns?: Array<Omix<DataTableColumn>>
    /**筛选条件表单**/
    form: Omix<U>
    /**列表接口**/
    request: (forms: U, base: ColumnState<T & Omix<R>>, opts: Omix<{ body: Omix; opt: Omix }>) => Promise<ResultResolver<ResultColumn<T>>>
    /**列表数据转换函数**/
    transform?: (data: ResultColumn<T>) => Array<Omix> | Promise<Array<Omix>>
    /**初始化回调函数**/
    callback?: (forms: U, base: ColumnState<T & Omix<R>>) => void | any | Promise<any>
}

/**列表包装hook**/
export function useColumnService<T extends Omix, U extends Omix, R extends Omix>(option: ColumnOption<T, U, R>) {
    const form = ref<typeof option.form>(option.form)
    const { faseNode, fetchKinesCompiler, fetchKinesUpdater } = useKinesService<Array<Omix>>({
        type: String(option.dynamic),
        document: option.document,
        value: []
    })
    const { state, setState } = useState({
        event: 'input-submit',
        initialize: option.initialize ?? true,
        loading: option.loading ?? true,
        page: option.page ?? 1,
        size: option.size ?? 20,
        total: option.total ?? 0,
        rowKeys: option.rowKeys ?? [],
        rowNodes: option.rowNodes ?? [],
        columns: option.columns ?? [],
        dataSource: [] as Array<T>,
        ...(option.option ?? {})
    } as ColumnState<T> & typeof option.option)

    if (option.immediate ?? true) {
        fetchInitialize()
    } else {
        fetchKinesCompiler()
    }

    /**初始化**/
    async function fetchInitialize() {
        await fetchKinesCompiler()
        return await fetchRequest().then(() => {
            return option.callback?.(form.value, state as ColumnState<T & Omix<R>>)
        })
    }

    /**类型参数聚合**/
    function fetchWhere(data: Omix = {}, base: Omix = {}) {
        if (base.event === 'input-submit') {
            return { page: base.page, size: base.size, vague: data.vague }
        }
        return Object.assign({ page: base.page, size: base.size, ...utils.omit(data, ['vague']) }) as T
    }

    /**参数转换**/
    async function fetchParameter() {
        return option.exclude ?? true ? utils.fetchExclude(form.value) : form.value
    }

    /**修改表单筛选**/
    async function setForm(value: Partial<Omix<typeof option.form>> = {}): Promise<Omix<typeof option.form>> {
        return Object.assign(form.value, value)
    }

    /**刷新**/
    async function fetchRefresh(data: Partial<ColumnState<T> & typeof option.option> = {}, opt: Omix = {}) {
        return await setState(data).then(async () => {
            return await fetchRequest(opt).then(async response => {
                await setState({ rowKeys: [], rowNodes: [] } as never)
                return response
            })
        })
    }

    /**列表接口请求**/
    async function fetchRequest(opt: Omix = {}) {
        return await setState({ loading: true } as ColumnState<T> & typeof option.option).then(async () => {
            try {
                const body = await fetchParameter()
                return await option.request(body, state as never, { opt, body: fetchWhere(body, state) }).then(async ({ data }) => {
                    if (option.transform && typeof option.transform === 'function') {
                        data.list = ((await option.transform(data)) ?? []) as Array<Omix<T>>
                    }
                    return await setState({
                        initialize: false,
                        loading: false,
                        total: data.total ?? 0,
                        dataSource: data.list
                    } as ColumnState<T> & typeof option.option)
                })
            } catch (err) {
                return await setState({
                    initialize: false,
                    loading: false,
                    total: 0,
                    dataSource: [] as Array<T>
                } as ColumnState<T> & typeof option.option)
            }
        })
    }

    return {
        form,
        state,
        faseNode,
        ...toRefs(state),
        setState,
        setForm,
        fetchKinesCompiler,
        fetchKinesUpdater,
        fetchInitialize,
        fetchRequest,
        fetchRefresh
    }
}

export type BaseState = Omix & {
    initialize: boolean
    loading: boolean
    message: string
}
export type BaseOption<T, U> = Partial<BaseState> & {
    immediate?: boolean
    option?: Omix<U>
    request: (data: T, base: BaseState & Omix<U>, opt: Omix) => Promise<ResultResolver<T>>
    transform?: (data: T) => Omix | Promise<Omix>
    callback?: (data: T, base: BaseState & Omix<U>) => void | any | Promise<any>
}

/**详情包装hook**/
export function useBaseService<T extends Omix, U extends Omix>(option: BaseOption<T, U>) {
    const faseNode = ref<T>({} as T) as Ref<T>
    const { state, setState } = useState({
        initialize: option.initialize ?? true,
        loading: option.loading ?? true,
        message: '',
        ...(option.option ?? {})
    } as BaseState & typeof option.option)

    if (option.immediate) {
        fetchInitialize()
    }

    /**初始化**/
    async function fetchInitialize() {
        return await fetchRequest().then(() => {
            return option.callback?.(faseNode.value, state as BaseState & typeof option.option)
        })
    }

    /**更新结果对象**/
    async function fetchUpdate(data: T) {
        return (faseNode.value = data)
    }

    /**刷新**/
    async function fetchRefresh(data: Partial<ColumnState<T> & typeof option.option> = {}, opt: Omix = {}) {
        return await setState(data).then(async () => {
            return await fetchRequest(opt)
        })
    }

    /**接口请求**/
    async function fetchRequest(opt: Omix = {}) {
        return await setState({ loading: true } as BaseState & typeof option.option).then(async () => {
            try {
                return await option.request(faseNode.value, state as BaseState & typeof option.option, opt).then(async ({ data }) => {
                    await fetchUpdate(data ?? {})
                    return await setState({
                        initialize: false,
                        loading: false,
                        message: ''
                    } as BaseState & typeof option.option)
                })
            } catch (err) {
                await fetchUpdate({} as T)
                return await setState({
                    initialize: false,
                    loading: false,
                    message: ''
                } as BaseState & typeof option.option)
            }
        })
    }

    return { faseNode, state, ...toRefs(state), setState, fetchUpdate, fetchInitialize, fetchRequest, fetchRefresh }
}
