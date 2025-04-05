<script lang="tsx">
import { defineComponent, computed, CSSProperties, Fragment } from 'vue'

export default defineComponent({
    name: 'LayoutCommonContainer',
    props: {
        /**开启双重容器**/
        abstract: { type: Boolean, default: true },
        /**容器样式**/
        className: { type: String, default: '' }
    },
    setup(props, { slots }) {
        const elementStyles = computed<CSSProperties>(() => ({
            transition: 'background-color 0.3s var(--n-bezier)'
        }))

        return () => (
            <n-element class="layout-common-container flex flex-col bg-[var(--common-body-color)]" style={elementStyles.value}>
                {props.abstract ? (
                    <div class={`flex flex-col flex-1 relative bg-[var(--card-color)] ${props.className}`} style={elementStyles.value}>
                        {slots.default && slots.default()}
                    </div>
                ) : (
                    <Fragment>{slots.default && slots.default()}</Fragment>
                )}
            </n-element>
        )
    }
})
</script>
