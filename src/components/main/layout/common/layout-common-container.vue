<script lang="tsx">
import { defineComponent, Fragment } from 'vue'

export default defineComponent({
    name: 'LayoutCommonContainer',
    props: {
        /**根节点样式**/
        className: { type: String, default: 'flex-col' }
    },
    setup(props, { slots }) {
        return () => (
            <n-element class={`layout-common-container flex flex-1 overflow-hidden ${props.className}`}>
                <Fragment>{slots.default && slots.default()}</Fragment>
            </n-element>
        )
    }
})
</script>
