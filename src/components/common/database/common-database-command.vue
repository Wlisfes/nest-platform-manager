<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import { ButtonProps } from 'naive-ui'
import { useVModels } from '@vueuse/core'

export default defineComponent({
    name: 'CommonDatabaseCommand',
    emits: ['update:visible'],
    props: {
        /**是否展示**/
        visible: { type: Boolean, default: false },
        /**按钮内容**/
        content: { type: [String, Number], default: '更多' },
        /**按钮类型**/
        type: { type: String as PropType<ButtonProps['type']>, default: 'primary' },
        /**弹出层容器样式**/
        className: { type: String, default: '' }
    },
    setup(props, { slots, emit }) {
        const { visible } = useVModels(props, emit)

        return () => (
            <common-element-popover
                placement="bottom-end"
                style={{ padding: '8px' }}
                v-model:visible={visible.value}
                on-update:show={(show: boolean) => (visible.value = show)}
            >
                {{
                    trigger: () => (
                        <common-element-button
                            database
                            text
                            content="更多"
                            icon="nest-settings"
                            icon-size={16}
                            type={props.type}
                        ></common-element-button>
                    ),
                    default: () => (
                        <n-element
                            class={`min-w-80 flex flex-col overflow-hidden [&>.n-button]:justify-start [&>.n-button]:p-inline-6 ${props.className}`}
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
