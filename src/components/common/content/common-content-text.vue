<script lang="tsx">
import { defineComponent, PropType, VNode } from 'vue'

export default defineComponent({
    name: 'CommonContentText',
    props: {
        /**文本内容**/
        text: { type: [String, Number, Object] as PropType<string | VNode>, default: '' }
    },
    setup(props, { slots }) {
        return () => <n-text class="common-content-text">{slots.default ? slots.default() : props.text}</n-text>
    }
})
</script>
