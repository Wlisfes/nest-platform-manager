import { ref, Ref, toRefs, provide, onMounted } from 'vue'
import { FormInst, DataTableColumn } from 'naive-ui'
import { ResultResolver, ResultColumn } from '@/interface/instance.resolver'
import { Observer, fetchExclude } from '@/utils'
import { useState } from '@/hooks'

/**列表缓存对象**/
interface BaseServiceState<T> extends Omix {
    /**边距值**/
    limit: number
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
    /**表头数据**/
    columns: Array<Omix<DataTableColumn>>
    /**列表勾选对象数组**/
    items: Array<T>
    /**列表数据**/
    dataSource: Array<T>
}
/**列表包装配置**/
interface BaseServiceOptions<T, U, R> extends Partial<BaseServiceState<T>> {
    /**立即执行**/
    immediate?: boolean
    /**额外字段**/
    options?: Omix<R>
    /**筛选条件表单**/
    formState: Omix<U>
    /**列表接口**/
    request: (formState: Omix<U>, base: BaseServiceState<T & Omix<R>>, options: Omix) => Promise<ResultResolver<ResultColumn<T>>>
    /**列表数据转换函数**/
    transform?: (data: ResultColumn<T>) => Array<Omix> | Promise<Array<Omix>>
    /**初始化回调函数**/
    callback?: (formState: Omix<U>, base: BaseServiceState<T & Omix<R>>) => void | any | Promise<any>
}

/**列表包装hook**/
export function useColumnService<T extends Omix, U extends Omix, R extends Omix>(options: BaseServiceOptions<T, U, R>) {
    const formRef = ref<FormInst>() as Ref<FormInst & Omix<{ $el: HTMLFormElement }>>
    const formState = ref<typeof options.formState>(options.formState)
    const faseWhen = ref({ when: true, delay: 0, min: 34 + (options.limit ?? 14) * 2, max: 34 + (options.limit ?? 14) * 2 })
    const observer = ref(Observer<Record<string, Omix>>())
    const { state, setState } = useState({
        limit: options.limit ?? 14,
        visible: options.visible ?? false,
        initialize: options.initialize ?? true,
        loading: options.loading ?? true,
        page: options.page ?? 1,
        size: options.size ?? 50,
        total: options.total ?? 0,
        columns: options.columns ?? [],
        items: options.items ?? [],
        dataSource: [] as Array<T>,
        ...(options.options ?? {})
    } as BaseServiceState<T> & typeof options.options)
    /**注入订阅发布实例**/
    provide('COMMON_DATABASE_FORMREF', formRef)
    /**注入订阅发布实例**/
    provide('COMMON_DATABASE_FASEWHEN', faseWhen)

    /**初始化**/
    onMounted(fetchInitialize)
    async function fetchInitialize() {
        if (options.immediate ?? true) {
            // await fetchCheckboxsCompiler()
            return await fetchRequest().then(() => {
                return options.callback?.(formState.value, state as never)
            })
        }
        // return await fetchCheckboxsCompiler().then(async () => {
        //     return await setState({ initialize: false, loading: false } as ColumnState<T> & typeof options.option)
        // })
    }

    /**修改表单筛选**/
    async function setForm(value: Partial<Omix<typeof options.formState>> = {}): Promise<Omix<typeof options.formState>> {
        return Object.assign(formState.value, value)
    }

    /**刷新**/
    async function fetchRefresh(data: Partial<BaseServiceState<T> & typeof options.options> = {}, opt: Omix = {}) {
        return await setState(data).then(async () => {
            const response = await fetchRequest(opt)
            return await setState({ items: [] } as never).then(() => {
                return response
            })
        })
    }

    /**列表接口请求**/
    async function fetchRequest(opts: Omix = {}) {
        return await setState({ loading: true } as never).then(async () => {
            try {
                const body = fetchExclude(formState.value, { page: state.page, size: state.size })
                return await options.request(formState.value, state as never, { body, opts }).then(async ({ data }) => {
                    if (options.transform && typeof options.transform === 'function') {
                        data.list = ((await options.transform(data)) ?? []) as Array<Omix<T>>
                    }
                    return await setState({ initialize: false, loading: false, total: data.total ?? 0, dataSource: data.list } as never)
                })
            } catch (err) {
                return await setState({ initialize: false, loading: false, total: 0, dataSource: [] } as never)
            }
        })
    }

    return {
        state,
        formRef,
        formState,
        faseWhen,
        observer,
        ...toRefs(state),
        setState,
        setForm,
        fetchInitialize,
        fetchRequest,
        fetchRefresh
    }
}
