<script lang="tsx">
import { defineComponent, ref, Ref, inject, onMounted, onUnmounted, nextTick, Fragment, PropType } from 'vue'
import { Search, Settings, DownToBottom, UpToTop } from '@vicons/carbon'
import { useVModels, useCurrentElement, useElementSize } from '@vueuse/core'
import { fetchDelay, fetchWherer, isObject, isEmpty } from '@/utils'
import { FormInst } from 'naive-ui'

export default defineComponent({
    name: 'CommonDatabaseSearch',
    emits: ['update:faseWhen', 'update:loading', 'update:formState', 'submit', 'restore'],
    props: {
        /**操作功能**/
        function: { type: Array as PropType<Array<'search' | 'restore' | 'collapse' | 'deploy'>>, default: () => [] },
        /**操作功能根节点样式**/
        functionClass: { type: String, default: '' },
        /**边距值**/
        limit: { type: Number, default: 14 },
        /**表单边界配置**/
        faseWhen: { type: Object as PropType<Omix>, default: () => ({ when: true, delay: 0, min: 60, max: 60 }) },
        /**开启边框**/
        bordered: { type: Boolean, default: true },
        /**开启边框**/
        loading: { type: Boolean, default: false },
        /**表单对象**/
        formState: { type: Object as PropType<Omix>, default: () => ({}) },
        /**文案描述宽度**/
        labelWidth: { type: Number, default: 100 }
    },
    setup(props, { emit, slots }) {
        const element = useCurrentElement<HTMLElement>()
        const formRef = inject('COMMON_DATABASE_FORMREF', ref({} as Ref<Omix<FormInst>>))
        const { width } = useElementSize(element)
        const { faseWhen, loading, formState } = useVModels(props, emit)
        async function fetchWhenUpdate(e: Omix) {
            return nextTick(() => Object.assign(faseWhen.value, e))
        }
        async function fetchInitialize() {
            return await fetchDelay(0).then(async () => {
                return await fetchWhenUpdate({ max: element.value.clientHeight })
            })
        }
        onUnmounted(async () => {
            return window.removeEventListener('resize', fetchInitialize)
        })
        onMounted(async () => {
            return await fetchInitialize().then(() => {
                return window.addEventListener('resize', fetchInitialize)
            })
        })
        /**重置**/
        async function fetchRestore() {
            return await formRef.value.restore().then(async (formState: Omix) => {
                console.log(formState)
                return emit('restore', formState.value)
            })
        }
        /**展开、收起**/
        async function fetchClickUpdate() {
            return await fetchWhenUpdate({ delay: 300, when: !faseWhen.value.when }).then(async () => {
                return await fetchDelay(faseWhen.value.delay).then(async () => {
                    return await fetchWhenUpdate({
                        delay: 0,
                        max: fetchWherer(faseWhen.value.when, element.value.clientHeight, faseWhen.value.max)
                    })
                })
            })
        }
        /**节点判断过滤**/
        function fetchColumnCheck(vnode: Array<Omix>, names: Array<string>) {
            return vnode.filter(node => {
                return isObject<Omix>(node.type) ? names.includes(node.type.name) : false
            })
        }
        /**节点判断过滤**/
        function fetchColumnCheckFunctions<T extends Omix>(vnode: Array<T>): Array<T> {
            if (isObject<Omix>(vnode[0]?.props) && vnode[0]?.props.abstract) {
                return (vnode[0]?.children?.default?.() ?? []).flat(1).map((node: Omix) => {
                    return node
                })
            }
            return vnode
        }
        /**子节点分类**/
        function fetchColumnTransaction(vnode: Array<Omix>) {
            return {
                vnode,
                columns: fetchColumnCheck(vnode, ['CommonDatabaseSearchColumn']),
                functions: fetchColumnCheckFunctions(fetchColumnCheck(vnode, ['CommonDatabaseSearchFunction']))
            }
        }

        return () => {
            const { columns, functions } = fetchColumnTransaction((slots.default?.() ?? []) as Array<Omix>)

            return (
                <n-card
                    class="common-database-search flex flex-col b-rd-8"
                    content-style={{ padding: `${props.limit}px` }}
                    bordered={props.bordered}
                >
                    <common-element-collapse v-model:when={faseWhen.value.when}>
                        <form-common-container
                            ref={formRef}
                            class={{ 'common-database-formstate': true, 'formstate-collapse': width.value < 674 }}
                            label-placement="left"
                            model={formState.value}
                            label-width={props.labelWidth}
                        >
                            {columns}
                        </form-common-container>
                    </common-element-collapse>
                    {props.function.length + functions.length > 0 && (
                        <n-element class={{ [`flex flex-wrap gap-10 ${props.functionClass}`]: true, 'p-bs-10': faseWhen.value.when }}>
                            {functions.length > 0 && <Fragment>{functions}</Fragment>}
                            {props.function.includes('search') && (
                                <common-element-button
                                    class="min-w-80"
                                    type="primary"
                                    secondary
                                    icon={Search}
                                    loading={loading.value}
                                    disabled={loading.value}
                                    onClick={(e: MouseEvent) => emit('submit', formState.value)}
                                >
                                    查询
                                </common-element-button>
                            )}
                            {props.function.includes('restore') && (
                                <common-element-button class="min-w-80" onClick={fetchRestore}>
                                    重置
                                </common-element-button>
                            )}
                            {props.function.includes('collapse') && (
                                <common-element-button
                                    class="min-w-80"
                                    icon={faseWhen.value.when ? UpToTop : DownToBottom}
                                    onClick={fetchClickUpdate}
                                >
                                    {faseWhen.value.when ? '收起' : '展开'}
                                </common-element-button>
                            )}
                            {props.function.includes('deploy') && (
                                <common-element-button class="min-w-80" icon={Settings}>
                                    设置
                                </common-element-button>
                            )}
                        </n-element>
                    )}
                </n-card>
            )
        }
    }
})
</script>

<style lang="scss" scoped>
.common-database-formstate {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    grid-auto-flow: row dense;
    display: grid;
    gap: 10px;
    &.formstate-collapse :deep(.common-database-search-column.grid-col-span-2) {
        grid-column: span 1 / span 1 !important;
    }
}
</style>
