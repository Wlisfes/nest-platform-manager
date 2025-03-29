<script lang="tsx">
import { defineComponent, h, PropType, VNode } from 'vue'

export default defineComponent({
    name: 'FormCommonInput',
    props: {
        /**输入框头部内容**/
        prefix: { type: Object as PropType<VNode> },
        /**输入框尾部内容**/
        suffix: { type: Object as PropType<VNode> }
    },
    setup(props, { slots }) {
        function fetchPrefixRender() {
            if (slots.prefix) {
                return slots.prefix()
            }
            return h(props.prefix as VNode)
        }

        function fetchSuffixRender() {
            if (slots.suffix) {
                return slots.suffix()
            }
            return h(props.suffix as VNode)
        }

        return () => (
            <n-input class="form-common-input">
                {{
                    prefix: slots.prefix || props.prefix ? fetchPrefixRender : undefined,
                    suffix: slots.suffix || props.suffix ? fetchSuffixRender : undefined
                }}
            </n-input>
        )
    }
})
</script>
