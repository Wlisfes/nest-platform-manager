<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CommonDatabaseButton',
    emits: ['click'],
    props: {
        /**操作指令**/
        command: { type: String },
        /**节点数据**/
        node: { type: Object, default: () => ({}) },
        /**按钮内容**/
        content: { type: [String, Number] }
    },
    setup(props, { emit, slots }) {
        async function fetchClick(event: MouseEvent) {
            return emit('click', { node: props.node, event, content: props.content, comman: props.command })
        }

        return () => (
            <common-element-button
                class="common-database-button"
                icon-size={16}
                content={props.content}
                style={{ '--n-icon-margin': '3px' }}
                onClick={fetchClick}
            >
                {slots}
            </common-element-button>
        )
    }
})
</script>
