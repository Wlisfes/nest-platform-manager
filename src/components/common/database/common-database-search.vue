<script lang="tsx">
import { defineComponent, onMounted, nextTick, PropType } from 'vue'
import { Search, Settings, DownToBottom, UpToTop } from '@vicons/carbon'
import { useVModels, useCurrentElement, useElementSize } from '@vueuse/core'
import { fetchDelay } from '@/utils'

export default defineComponent({
    name: 'CommonDatabaseSearch',
    emits: ['update:faseWhen', 'update:loading', 'update:formState', 'submit', 'reset'],
    props: {
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
        const { width } = useElementSize(element)
        const { faseWhen, loading, formState } = useVModels(props, emit)
        async function fetchWhenUpdate(e: Omix) {
            return nextTick(() => Object.assign(faseWhen.value, e))
        }
        /**初始化**/
        onMounted(fetchInitialize)
        async function fetchInitialize() {
            return await fetchDelay(faseWhen.value.delay).then(async () => {
                return await fetchWhenUpdate({ max: element.value.clientHeight })
            })
        }

        /**展开、收起**/
        async function fetchClickUpdate() {
            return await fetchWhenUpdate({ delay: 300, when: !faseWhen.value.when }).then(async () => {
                return await fetchDelay(faseWhen.value.delay).then(async () => {
                    return await fetchWhenUpdate({ delay: 0 })
                })
            })
        }

        return () => (
            <n-card
                class="common-database-search flex flex-col b-rd-8"
                content-style={{ padding: `${props.limit}px` }}
                bordered={props.bordered}
            >
                <n-collapse-transition show={faseWhen.value.when}>
                    <n-form
                        class={{ 'common-database-formstate': true, 'formstate-collapse': width.value < 674 }}
                        label-placement="left"
                        model={formState.value}
                        label-width={props.labelWidth}
                    >
                        {slots.default && slots.default()}
                    </n-form>
                </n-collapse-transition>
                <div class={{ 'flex items-center justify-end gap-10': true, 'p-bs-10': faseWhen.value.when }}>
                    <n-element class="flex items-center gap-10">
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
                        <common-element-button class="min-w-80" onClick={(e: MouseEvent) => emit('reset', formState.value)}>
                            重置
                        </common-element-button>
                        <common-element-button
                            class="min-w-80"
                            icon={faseWhen.value.when ? UpToTop : DownToBottom}
                            onClick={fetchClickUpdate}
                        >
                            {faseWhen.value.when ? '收起' : '展开'}
                        </common-element-button>
                        <common-element-button class="min-w-80" icon={Settings}>
                            设置
                        </common-element-button>
                    </n-element>
                </div>
            </n-card>
        )
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
