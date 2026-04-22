<script lang="tsx">
import { defineComponent, Fragment } from 'vue'

export default defineComponent({
    name: 'CommonElementSkeleton',
    props: {
        /**骨架屏组件样式**/
        className: { type: String, default: '' },
        /**线索骨架屏**/
        loading: { type: Boolean, default: false }
    },
    setup(props, { slots }) {
        return () => (
            <Fragment>
                {props.loading ? (
                    <n-element class={`common-element-skeleton ${props.className}`}>{slots.default && slots.default()}</n-element>
                ) : (
                    <Fragment>{slots.render && slots.render()}</Fragment>
                )}
            </Fragment>
        )
    }
})
</script>
