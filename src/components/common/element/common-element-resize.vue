<script lang="tsx">
import { defineComponent, computed, CSSProperties } from 'vue'
import { useCurrentElement, useElementSize, useVModels } from '@vueuse/core'

export default defineComponent({
    name: 'CommonElementResize',
    props: {
        loading: { type: Boolean, default: true }
    },
    setup(props, { emit, slots }) {
        const { loading } = useVModels(props, emit)
        const { width, height } = useElementSize(useCurrentElement())
        const element = computed<CSSProperties>(() => ({
            '--common-element-resize-width': Math.floor(width.value) + 'px',
            '--common-element-resize-height': Math.floor(height.value) + 'px'
        }))

        return () => (
            <div class="common-element-resize flex flex-col flex-1 overflow-hidden" style={element.value}>
                {slots.default && slots.default({ width, height })}
                {/* <n-spin size={54} show={loading.value}>
                </n-spin> */}
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-element-resize {
    position: relative;
    :deep(.n-data-table) {
        width: var(--common-element-resize-width);
        height: var(--common-element-resize-height);
    }
}
</style>
