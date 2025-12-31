import { ref, toRefs, Ref } from 'vue'
import { useState } from '@/hooks/modules/hook-state'
import { ResultResolver } from '@/interface/instance.resolver'
interface BaseServiceState extends Omix {
    /**初始化状态**/
    initialize: boolean
    /**加载状态**/
    loading: boolean
    /**错误描述**/
    message: string
}
interface BaseServiceOptions<T, U> extends Partial<BaseServiceState> {
    /**立即执行**/
    immediate?: boolean
    /**额外配置**/
    options?: Omix<U>
    /**字段转换**/
    transform?: (data: T) => Omix | Promise<Omix>
    /**回调函数**/
    callback?: (data: T, base: BaseServiceState & Omix<U>) => void | any | Promise<any>
    /**请求接口**/
    request: (data: T, base: BaseServiceState & Omix<U>, opt: Omix) => Promise<ResultResolver<T>>
}

/**详情包装hook**/
export function useBaseService<T extends Omix, U extends Omix>(options: BaseServiceOptions<T, U>) {
    const faseNode = ref<T>({} as T) as Ref<T>
    const { state, setState } = useState({
        initialize: options.initialize ?? true,
        loading: options.loading ?? true,
        message: '',
        ...(options.options ?? {})
    } as BaseServiceState & typeof options.options)

    if (options.immediate) {
        fetchInitialize()
    }

    /**初始化**/
    async function fetchInitialize() {
        return await fetchRequest().then(() => {
            return options.callback?.(faseNode.value, state as never)
        })
    }

    /**更新结果对象**/
    async function fetchUpdate(data: T) {
        return (faseNode.value = data)
    }

    /**刷新**/
    async function fetchRefresh(data: Partial<BaseServiceState & typeof options.options> = {}, opt: Omix = {}) {
        return await setState(data).then(async () => {
            return await fetchRequest(opt)
        })
    }

    /**接口请求**/
    async function fetchRequest(opt: Omix = {}) {
        return await setState({ loading: true } as never).then(async () => {
            try {
                const { data } = await options.request(faseNode.value, state as never, opt)
                return await fetchUpdate(data ?? {}).then(async () => {
                    return await setState({
                        initialize: false,
                        loading: false,
                        message: ''
                    } as never)
                })
            } catch (err) {
                return await fetchUpdate({} as T).then(async () => {
                    return await setState({
                        initialize: false,
                        loading: false,
                        message: err.message
                    } as never)
                })
            }
        })
    }

    return { faseNode, state, ...toRefs(state), setState, fetchUpdate, fetchInitialize, fetchRequest, fetchRefresh }
}
