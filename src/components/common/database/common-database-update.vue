<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import { ButtonProps } from 'naive-ui'

export default defineComponent({
    name: 'CommonDatabaseUpdate',
    emits: ['click'],
    props: {
        /**操作指令**/
        command: { type: String, default: 'UPDATE' },
        /**节点数据**/
        data: { type: Object, default: () => ({}) },
        /**编辑按钮内容**/
        content: { type: [String, Number], default: '编辑' },
        /**按钮类型**/
        type: { type: String as PropType<ButtonProps['type']>, default: 'primary' }
    },
    setup(props, { emit, slots }) {
        async function fetchClick(event: MouseEvent) {
            return emit('click', {
                event,
                data: props.data,
                type: props.type,
                content: props.content,
                command: props.command
            })
        }

        return () => (
            <common-element-button text content={props.content} type={props.type} onClick={fetchClick}>
                {slots}
            </common-element-button>
        )
    }
})
</script>
