<script lang="tsx">
import { defineComponent, computed, CSSProperties, Fragment } from 'vue'

export default defineComponent({
    name: 'LayoutCommonContainer',
    props: {
        /**初始化**/
        initialize: { type: Boolean, default: true },
        /**开启容器过渡**/
        transition: { type: Boolean, default: false },
        /**容器透明度**/
        opacity: { type: Number, default: 0 },
        /**开启双重容器**/
        abstract: { type: Boolean, default: false },
        /**容器样式**/
        className: { type: String, default: '' }
    },
    setup(props, { slots }) {
        const elementStyles = computed<CSSProperties>(() => ({
            '--layout-common-full-opacity': props.opacity,
            transition: 'background-color 0.3s var(--n-bezier)'
        }))

        return () => (
            <n-element class="layout-common-container flex flex-col bg-[var(--common-body-color)]" style={elementStyles.value}>
                {props.abstract ? (
                    <div class={`flex flex-col flex-1 relative bg-[var(--card-color)] ${props.className}`} style={elementStyles.value}>
                        {props.transition ? (
                            <n-spin size={54} show={props.initialize}>
                                {slots.default && slots.default()}
                            </n-spin>
                        ) : (
                            <Fragment>{slots.default && slots.default()}</Fragment>
                        )}
                    </div>
                ) : props.transition ? (
                    <n-spin size={54} show={props.initialize}>
                        {slots.default && slots.default()}
                    </n-spin>
                ) : (
                    <Fragment>{slots.default && slots.default()}</Fragment>
                )}
            </n-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.layout-common-container {
    :deep(.n-spin-container),
    :deep(.n-spin-content) {
        --n-opacity-spinning: var(--layout-common-full-opacity);
        display: flex;
        flex-direction: column;
        flex: 1;
        overflow: hidden;
    }
}
</style>
