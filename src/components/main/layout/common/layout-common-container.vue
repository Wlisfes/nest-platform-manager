<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'LayoutCommonContainer',
    props: {
        /**根节点样式**/
        className: { type: String, default: '' }
    },
    setup(props, { slots }) {
        return () => (
            <n-element class="layout-common-container flex flex-col flex-1 overflow-hidden">{slots.default && slots.default()}</n-element>
        )
    }
})
</script>
