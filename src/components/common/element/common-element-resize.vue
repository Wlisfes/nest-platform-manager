<script lang="tsx">
import { defineComponent, computed, CSSProperties, Fragment } from 'vue'
import { useCurrentElement, useElementSize, useVModels } from '@vueuse/core'

export default defineComponent({
    name: 'CommonElementResize',
    props: {
        /**是否为表格嵌入容器**/
        elementTable: { type: Boolean, default: false },
        /**loading状态**/
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
            <div
                class={{ 'common-element-resize flex flex-col flex-1 overflow-hidden': true, 'element-table': props.elementTable }}
                style={element.value}
            >
                {props.elementTable ? (
                    <Fragment>{slots.default && slots.default({ width, height })}</Fragment>
                ) : (
                    <n-spin size={54} show={loading.value}>
                        {slots.default && slots.default({ width, height })}
                    </n-spin>
                )}
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-element-resize {
    --n-opacity-spinning: 0.2;
    position: relative;
    :deep(.n-spin-container),
    :deep(.n-spin-content) {
        display: flex;
        flex-direction: column;
        flex: 1;
    }
    &.element-table > :deep(.n-data-table.common-database-table) {
        --n-opacity-loading: 0.2;
        --n-loading-size: 54px;
        width: var(--common-element-resize-width);
        height: var(--common-element-resize-height);
    }
}
</style>
