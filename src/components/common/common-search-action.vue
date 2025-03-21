<script lang="tsx">
import { defineComponent, ref, PropType } from 'vue'
import { FormProps, GridProps, PopoverInst } from 'naive-ui'
import { useVModels } from '@vueuse/core'
import { useState } from '@/hooks/hook-state'
import { fetchWhere, enter, stop } from '@/utils/utils-common'

export default defineComponent({
    name: 'CommonSearchAction',
    emits: ['submit', 'update:keyword'],
    props: {
        keyword: { type: String },
        scale: { type: Number, default: 0.8 },
        distance: { type: Number, default: 200 },
        maxWidth: { type: Number, default: 450 },
        itemWidth: { type: Number, default: 456 },
        multiple: { type: Boolean, default: false },
        placeholder: { type: String },
        form: { type: Object as PropType<Omix>, default: () => ({}) },
        formProps: { type: Object as PropType<FormProps>, default: () => ({}) },
        gridProps: { type: Object as PropType<GridProps>, default: () => ({}) }
    },
    setup(props, { emit, slots }) {
        const instance = ref<PopoverInst>()
        const { keyword } = useVModels(props, emit)
        const { state, setState } = useState({
            pattern: undefined,
            cols: 1,
            width: `${props.itemWidth}px`,
            height: (window.innerHeight - props.distance) * fetchWhere(props.scale > 0.8, 0.8, props.scale) + 'px'
        })

        /**弹出层开启计算**/
        async function fetchUpdate(value: boolean) {
            if (props.multiple && window.innerWidth > props.itemWidth * 2 + 68) {
                return await setState({ cols: 2, width: `${props.itemWidth * 2 + 12}px` })
            }
            return await setState({ cols: 1, width: `${props.itemWidth}px` })
        }

        async function fetchKeyup(evt: KeyboardEvent) {
            return enter(evt, async () => {
                return await fetchEvent('input-submit')
            })
        }

        async function fetchClick(evt: MouseEvent) {
            return stop(evt, async () => {
                return await fetchEvent('input-submit')
            })
        }

        async function fetchEvent(eventName: 'input-submit' | 'submit' | 'refresh') {
            return await emit('submit', { event: eventName, pattern: state.pattern, form: props.form })
        }

        async function fetchSubmit(evt: MouseEvent) {
            return await fetchEvent('submit').then(() => {
                return instance.value!.setShow(false)
            })
        }

        return () => (
            <div class="common-search-action w-full flex gap-10" style={{ maxWidth: props.maxWidth + 'px' }}>
                <n-input class="flex-1" v-model:value={keyword.value} placeholder={props.placeholder} onKeyup={fetchKeyup}>
                    {{
                        prefix: () => (
                            <n-icon
                                class="cursor-pointer hover:text-[var(--n-text-color)]"
                                size={18}
                                component={<local-naive-search />}
                                onClick={fetchClick}
                            ></n-icon>
                        )
                    }}
                </n-input>
                <n-popover
                    ref={instance}
                    placement="bottom"
                    trigger="click"
                    arrow-point-to-center
                    style={{ padding: 0 }}
                    on-update:show={fetchUpdate}
                >
                    {{
                        trigger: () => (
                            <common-state-button icon={<local-naive-filter />}>
                                <span>筛选</span>
                            </common-state-button>
                        ),
                        default: () => (
                            <n-element class="flex flex-col">
                                <n-h1 class="m-0 text-16 line-height-24 p-inline-16 p-block-10">高级筛选</n-h1>
                                <n-scrollbar style={{ maxHeight: state.height }}>
                                    <n-form
                                        class="p-inline-16"
                                        {...{ labelWidth: 'auto', labelPlacement: 'left', showFeedback: false, ...props.formProps }}
                                    >
                                        <n-grid
                                            style={{ width: state.width }}
                                            {...{ xGap: 12, yGap: 12, cols: state.cols, ...props.gridProps }}
                                        >
                                            {slots.default && slots.default()}
                                        </n-grid>
                                    </n-form>
                                </n-scrollbar>
                                <n-flex justify="center" class="p-inline-16 p-block-14">
                                    <n-button class="min-w-80">重置</n-button>
                                    <n-button class="min-w-80" type="primary" onClick={fetchSubmit}>
                                        确定
                                    </n-button>
                                </n-flex>
                            </n-element>
                        )
                    }}
                </n-popover>
                {/* <common-state-button circle icon={<local-naive-refresh />} onClick={fetchRefresh}></common-state-button> */}
            </div>
        )
    }
})
</script>
