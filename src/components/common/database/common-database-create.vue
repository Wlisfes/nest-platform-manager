<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import { ButtonProps } from 'naive-ui'

export default defineComponent({
    name: 'CommonDatabaseCreate',
    emits: ['click'],
    props: {
        /**新增按钮内容**/
        content: { type: [String, Number], default: '新增' },
        /**按钮类型**/
        type: { type: String as PropType<ButtonProps['type']>, default: 'primary' },
        /**按钮图标**/
        icon: { type: String }
    },
    setup(props, { emit, slots }) {
        async function fetchClick(event: MouseEvent) {
            return emit('click', { event, type: props.type, content: props.content, status: 'create' })
        }

        return () => (
            <common-element-button content={props.content} type={props.type} icon={props.icon} onClick={fetchClick}>
                {slots}
            </common-element-button>
        )
    }
})
</script>
