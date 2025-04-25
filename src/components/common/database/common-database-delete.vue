<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import { ButtonProps } from 'naive-ui'

export default defineComponent({
    name: 'CommonDatabaseDelete',
    emits: ['click'],
    props: {
        /**节点数据**/
        data: { type: Object, default: () => ({}) },
        /**删除按钮内容**/
        content: { type: [String, Number], default: '删除' },
        /**按钮类型**/
        type: { type: String as PropType<ButtonProps['type']>, default: 'error' }
    },
    setup(props, { emit, slots }) {
        async function fetchClick(event: MouseEvent) {
            return emit('click', props.data, { event, type: props.type, content: props.content, status: 'delete' })
        }

        return () => (
            <common-element-button text content={props.content} type={props.type} onClick={fetchClick}>
                {slots}
            </common-element-button>
        )
    }
})
</script>
