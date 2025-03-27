<script lang="tsx">
import { defineComponent, computed, CSSProperties } from 'vue'

export default defineComponent({
    name: 'LayoutCommonContainer',
    props: {
        /**容器样式**/
        className: { type: String, default: '' }
    },
    setup(props, { slots }) {
        const elementStyles = computed<CSSProperties>(() => ({
            transition: 'background-color 0.3s var(--n-bezier)'
        }))

        return () => (
            <n-element class="layout-common-container flex flex-col bg-[var(--common-body-color)]" style={elementStyles.value}>
                <div class={`flex flex-col flex-1 relative bg-[var(--card-color)] ${props.className}`} style={elementStyles.value}>
                    {slots.default && slots.default()}
                </div>
            </n-element>
        )
    }
})
</script>
