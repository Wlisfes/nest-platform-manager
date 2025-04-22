import { toRefs, ref, Ref } from 'vue'
import { useState } from '@/hooks/hook-state'
import * as Service from '@/api/instance.service'

/**缓存对象**/
export interface KinesState extends Omix {
    /**初始化状态**/
    initialize: boolean
    /**加载状态**/
    loading: boolean
    /**json类型**/
    type: string
    /**json描述**/
    document: string
}
/**hooks默认配置**/
export interface KinesOptions extends KinesState {
    /**自定义json默认值**/
    value: Array<Omix> | Omix
    /**立即执行**/
    immediate?: boolean
}

export function useKinesService<T>(options: KinesOptions) {
    const flowNode = ref<T>() as Ref<T>
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
    async function fetchKinesUpdater(opts: Omix<{ type?: string; document?: string; json: Array<Omix> | Omix }>) {
        return await setState({ loading: true }).then(async () => {
            try {
                return await Service.httpBaseDeployKinesUpdate({
                    type: opts.type ?? state.type,
                    document: opts.document ?? state.document,
                    json: opts.json
                }).then(async ({ message }) => {})
            } catch (err) {
                return await setState({ loading: false })
            }
        })
    }

    /**查询自定义json**/
    async function fetchKinesCompiler(opts: Omix<{ type?: string }> = {}) {
        return await setState({ loading: true }).then(async () => {
            try {
                return await Service.httpBaseDeployKinesCompiler({ type: opts.type ?? state.type }).then(async ({ data }) => {
                    console.log(data)
                })
            } catch (err) {
                return await setState({ initialize: false, loading: false })
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
        flowNode,
        state,
        ...toRefs(state),
        setState,
        fetchRefresh,
        fetchKinesUpdater,
        fetchKinesCompiler
    }
}
