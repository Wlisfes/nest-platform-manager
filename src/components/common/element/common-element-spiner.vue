<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CommonElementSpiner',
    props: {
        /**容器样式**/
        className: { type: String, default: 'flex flex-col flex-1 overflow-hidden' },
        /**加载状态**/
        loading: { type: Boolean, default: false },
        /**加载大小**/
        size: { type: [String, Number], default: 48 },
        /**透明度**/
        opacity: { type: Number, default: 0.5 }
    },
    setup(props, { slots }) {
        return () => (
            <n-spin
                class={`common-element-spiner ${props.className}`}
                style={{ '--n-opacity-spinning': props.opacity }}
                size={props.size}
                show={props.loading}
            >
                {slots.default && slots.default()}
            </n-spin>
        )
    }
})
</script>
