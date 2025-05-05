<script lang="tsx">
import { defineComponent, computed, Fragment, CSSProperties } from 'vue'

export default defineComponent({
    name: 'CommonElement',
    props: {
        /**开启loading容器**/
        spin: { type: Boolean, default: false },
        /**loading状态**/
        loading: { type: Boolean, default: false },
        /**spin容器透明都**/
        opacity: { type: Number, default: 0 },
        /**spin容器样式**/
        className: { type: String, default: '' },
        /**开启边框**/
        border: { type: Boolean, default: false },
        /**圆角值**/
        radius: { type: String, default: '0px' },
        /**开启悬浮阴影**/
        hover: { type: Boolean, default: false }
    },
    setup(props, { slots }) {
        const className = computed(() => ({
            'common-element': true,
            'flex flex-col flex-1': props.spin,
            'is-border': props.border,
            'is-hover': props.hover
        }))
        const style = computed<CSSProperties>(() => ({
            '--common-element-opacity': props.opacity,
            '--common-element-border-radius': props.radius
        }))

        return () => (
            <n-element class={className.value} style={{ '--n-element-border-radius': props.radius }}>
                {props.spin ? (
                    <n-spin size={54} show={props.loading} content-class={props.className}>
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
.common-element {
    --n-element-border-radius: var(--common-element-border-radius);
    --n-opacity-spinning: var(--common-element-opacity);
    position: relative;
    word-break: break-word;
    font-size: var(--font-size);
    line-height: var(--line-height);
    color: var(--text-color-2);
    background-color: var(--card-color);
    transition: color 0.3s var(--n-bezier), background-color 0.3s var(--n-bezier), box-shadow 0.3s var(--n-bezier),
        border-color 0.3s var(--n-bezier);
    border-radius: var(--n-element-border-radius);
    &.is-border {
        border: 1px solid var(--divider-color);
    }
    &.is-hover {
        box-shadow: var(--box-shadow-1);
    }
    > :deep(.n-spin-container),
    > :deep(.n-spin-content) {
        display: flex;
        flex-direction: column;
        flex: 1;
    }
}
</style>
