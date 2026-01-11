<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'LayoutCommonContainer',
    emits: ['update:faseWhen'],
    props: {
        /**边距值**/
        limit: { type: Number, default: 14 },
        /**根节点样式**/
        className: { type: String, default: '' }
    },
    setup(props, { emit, slots }) {
        return () => (
            <n-element
                class="layout-common-container flex flex-col flex-1 overflow-hidden"
                style={{ '--common-limit-number': `${props.limit}px` }}
            >
                {slots.default && slots.default()}
            </n-element>
        )
    }
})
</script>
