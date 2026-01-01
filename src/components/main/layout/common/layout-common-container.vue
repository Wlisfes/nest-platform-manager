<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import { useVModels } from '@vueuse/core'

export default defineComponent({
    name: 'LayoutCommonContainer',
    emits: ['update:faseWhen'],
    props: {
        /**表单边界配置**/
        faseWhen: { type: Object as PropType<Omix>, default: () => ({ when: true, delay: 0, min: 60, max: 60 }) },
        /**边距值**/
        limit: { type: Number, default: 14 },
        /**根节点样式**/
        className: { type: String, default: '' }
    },
    setup(props, { emit, slots }) {
        const { faseWhen } = useVModels(props, emit)

        return () => (
            <n-element
                class={{ 'layout-common-container flex flex-col flex-1': true, 'absolute inset-0': faseWhen.value.delay > 0 }}
                style={{ padding: `${props.limit}px` }}
            >
                {slots.default && slots.default()}
            </n-element>
        )
    }
})
</script>
