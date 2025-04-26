<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import { ButtonProps } from 'naive-ui'
import { useState } from '@/hooks/hook-state'

export default defineComponent({
    name: 'CommonDatabaseCommand',
    emits: ['click'],
    props: {
        /**节点数据**/
        data: { type: Object, default: () => ({}) },
        /**按钮内容**/
        content: { type: [String, Number], default: '更多' },
        /**按钮类型**/
        type: { type: String as PropType<ButtonProps['type']>, default: 'primary' },
        /**弹出层容器样式**/
        className: { type: String, default: '' }
    },
    setup(props, { emit, slots }) {
        const { state, setState } = useState({ visible: false, checked: false })

        async function fetchClick(event: MouseEvent) {
            return emit('click', {
                event,
                data: props.data,
                type: props.type,
                content: props.content
            })
        }

        return () => (
            <common-element-popover
                placement="bottom-end"
                style={{ padding: '8px' }}
                v-model:visible={state.visible}
                arrow-point-to-center={false}
                on-update:show={(visible: boolean) => setState({ visible })}
            >
                {{
                    trigger: () => (
                        <common-element-button
                            text
                            content="更多"
                            icon="nest-settings"
                            icon-size={16}
                            type={props.type}
                            onClick={() => setState({ visible: true })}
                        ></common-element-button>
                    ),
                    default: () => (
                        <n-element
                            class={`flex flex-col overflow-hidden [&>.n-button]:justify-start [&>.n-button]:p-inline-6 ${props.className}`}
                        >
                            {slots.default && slots.default()}
                        </n-element>
                    )
                }}
            </common-element-popover>
        )
    }
})
</script>
