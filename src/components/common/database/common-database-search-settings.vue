<script lang="tsx">
import { defineComponent, cloneVNode, PropType, Fragment } from 'vue'
import { Settings } from '@vicons/carbon'
import { useState } from '@/hooks'

export default defineComponent({
    name: 'CommonDatabaseSearchSettings',
    props: {
        /**弹出层容器样式**/
        className: { type: String, default: '' },
        /**列数据**/
        columns: { type: Array as PropType<Array<Omix>>, default: () => [] }
    },
    setup(props, { slots }) {
        const { state, setState } = useState({ visible: false })

        console.log(props.columns)

        return () => {
            return (
                <common-element-popover
                    placement="bottom-end"
                    style={{ padding: '8px' }}
                    v-model:visible={state.visible}
                    on-update:show={(visible: boolean) => setState({ visible })}
                >
                    {{
                        trigger: () => (
                            <common-element-button
                                class="min-w-80"
                                icon={Settings}
                                onClick={(event: MouseEvent) => setState({ visible: true })}
                            >
                                设置
                            </common-element-button>
                        ),
                        default: () => (
                            <n-element
                                class={`min-w-80 flex flex-col overflow-hidden [&>.n-button]:justify-start [&>.n-button]:p-inline-6 ${props.className}`}
                            >
                                DSADA
                            </n-element>
                        )
                    }}
                </common-element-popover>
            )
        }
    }
})
</script>
