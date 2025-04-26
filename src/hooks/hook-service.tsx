import { ref, toRefs, Ref, onBeforeMount } from 'vue'
import { DataTableColumn } from 'naive-ui'
import { useFullscreen } from '@vueuse/core'
import { useState } from '@/hooks/hook-state'
import { useKinesService } from '@/hooks/hook-chunk'
import { ResultResolver, ResultColumn } from '@/interface/instance.resolver'
import * as utils from '@/utils/utils-common'

/**列表缓存对象**/
export type ColumnState<T> = Omix & {
    /**事件类型**/
    event: 'input-submit' | 'submit'
    /**控制器**/
    visible: boolean
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
/**列表包装配置**/
export type ColumnOptions<T, U, R> = Partial<ColumnState<T>> & {
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

/**表格列初始化配置**/
export function fetchKineColumns(data: boolean | Partial<Omix<DataTableColumn>>, columns: Array<Omix<DataTableColumn>> = []) {
    function concat(items: Array<Omix<DataTableColumn>>): Array<Omix<DataTableColumn>> {
        return items.map(item => ({ ...item, check: Boolean(item.check), checked: Boolean(item.check) }))
    }
    if (utils.isEmpty(data) || (utils.isBoolean(data) && !data)) {
        return concat(columns)
    } else {
        const node = utils.fetchWhere(utils.isObject(data), data, Object.assign({}))
        return utils.concat(concat(columns), {
            title: node.title ?? '操作',
            key: node.key ?? 'command',
            align: node.align ?? 'center',
            width: node.width ?? 134,
            maxWidth: node.width ?? 134,
            fixed: node.fixed ?? 'right',
            checked: node.checked ?? true
        })
    }
}

/**表格列动态json格式化**/
export async function fetchKineDynamic<T extends Omix<DataTableColumn>>(data: Array<T>, json: Array<T> = []): Promise<Array<T>> {
    if (json.length === 0) {
        return data
    } else {
        const keys = json.map(k => k.key)
        const columns = data.map(item => {
            const node = (json.find((k: Omix) => k.key === item.key) ?? {}) as Omix
            return Object.assign(item, { checked: node.checked ?? item.checked })
        })
        return columns.sort((a, b) => keys.indexOf(a.key) - keys.indexOf(b.key))
    }
}

/**列表包装hook**/
export function useColumnService<T extends Omix, U extends Omix, R extends Omix>(options: ColumnOptions<T, U, R>) {
    const root = ref<HTMLElement>()
    const form = ref<typeof options.form>(options.form)
    const { isFullscreen, toggle } = useFullscreen(root)
    const { faseNode, fetchKinesCompiler, fetchKinesUpdater } = useKinesService<Omix>({
        type: options.dynamic ?? '',
        document: options.document
    })
    const { state, setState } = useState({
        event: 'input-submit',
        visible: options.visible ?? false,
        initialize: options.initialize ?? true,
        loading: options.loading ?? true,
        page: options.page ?? 1,
        size: options.size ?? 20,
        total: options.total ?? 0,
        rowKeys: options.rowKeys ?? [],
        rowNodes: options.rowNodes ?? [],
        columns: options.columns ?? [],
        dataSource: [] as Array<T>,
        ...(options.option ?? {})
    } as ColumnState<T> & typeof options.option)

    /**初始化**/
    onBeforeMount(fetchInitialize)
    async function fetchInitialize() {
        if (options.immediate ?? true) {
            await fetchCheckboxsCompiler()
            return await fetchRequest().then(() => {
                return options.callback?.(form.value, state as ColumnState<T & Omix<R>>)
            })
        }
        return await fetchCheckboxsCompiler().then(async () => {
            return await setState({ initialize: false, loading: false } as ColumnState<T> & typeof options.option)
        })
    }

    /**表头配置更新**/
    async function fetchCheckboxs(data: Array<Omix>) {
        return await fetchKinesUpdater({ json: { columns: data } })
    }

    /**表头配置查询**/
    async function fetchCheckboxsCompiler() {
        return await fetchKinesCompiler().then(async data => {
            const columns = await fetchKineDynamic(state.columns, data.columns)
            return await setState({ columns } as ColumnState<T> & typeof options.option)
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
        return options.exclude ?? true ? utils.fetchExclude(form.value) : form.value
    }

    /**修改表单筛选**/
    async function setForm(value: Partial<Omix<typeof options.form>> = {}): Promise<Omix<typeof options.form>> {
        return Object.assign(form.value, value)
    }

    /**刷新**/
    async function fetchRefresh(data: Partial<ColumnState<T> & typeof options.option> = {}, opt: Omix = {}) {
        return await setState(data).then(async () => {
            return await fetchRequest(opt).then(async response => {
                await setState({ rowKeys: [], rowNodes: [] } as never)
                return response
            })
        })
    }

    /**列表接口请求**/
    async function fetchRequest(opt: Omix = {}) {
        return await setState({ loading: true } as ColumnState<T> & typeof options.option).then(async () => {
            try {
                const body = await fetchParameter()
                return await options.request(body, state as never, { opt, body: fetchWhere(body, state) }).then(async ({ data }) => {
                    if (options.transform && typeof options.transform === 'function') {
                        data.list = ((await options.transform(data)) ?? []) as Array<Omix<T>>
                    }
                    return await setState({
                        initialize: false,
                        loading: false,
                        total: data.total ?? 0,
                        dataSource: data.list
                    } as ColumnState<T> & typeof options.option)
                })
            } catch (err) {
                return await setState({
                    initialize: false,
                    loading: false,
                    total: 0,
                    dataSource: [] as Array<T>
                } as ColumnState<T> & typeof options.option)
            }
        })
    }

    return {
        root,
        form,
        state,
        faseNode,
        full: isFullscreen,
        toggle,
        ...toRefs(state),
        setState,
        setForm,
        fetchCheckboxs,
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
