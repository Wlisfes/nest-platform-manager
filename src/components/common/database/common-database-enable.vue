<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import { ButtonProps } from 'naive-ui'

export default defineComponent({
    name: 'CommonDatabaseEnable',
    emits: ['click'],
    props: {
        /**启用按钮内容**/
        content: { type: [String, Number], default: '启用' },
        /**按钮图标**/
        icon: { type: String },
        /**按钮类型**/
        type: { type: String as PropType<ButtonProps['type']>, default: 'success' },
        /**最大选择数量**/
        max: { type: Number, default: 99 },
        /**选择数量**/
        keys: { type: Array as PropType<Array<string | number>>, default: () => [] }
    },
    setup(props, { emit, slots }) {
        async function fetchClick(event: MouseEvent) {
            return emit('click', { event, keys: props.keys, type: props.type, content: props.content, status: 'disable' })
        }

        return () => (
            <common-element-button
                content={props.content}
                type={props.type}
                icon={props.icon}
                disabled={props.keys.length === 0 || props.keys.length > props.max}
                onClick={fetchClick}
            >
                {slots}
            </common-element-button>
        )
    }
})
</script>
