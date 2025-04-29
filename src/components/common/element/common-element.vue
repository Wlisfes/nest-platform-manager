<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CommonElement',
    props: {
        /**卡片容器样式**/
        className: { type: String, default: '' },
        /**开启边框**/
        border: { type: Boolean, default: false },
        /**开启悬浮阴影**/
        hover: { type: Boolean, default: false }
    },
    setup(props, { slots }) {
        return () => <n-element class={{ 'common-element': true, 'is-border': props.border, 'is-hover': props.hover }}>{slots}</n-element>
    }
})
</script>

<style lang="scss" scoped>
.common-element {
    position: relative;
    word-break: break-word;
    font-size: var(--font-size);
    line-height: var(--line-height);
    color: var(--text-color-2);
    background-color: var(--card-color);
    transition: color 0.3s var(--n-bezier), background-color 0.3s var(--n-bezier), box-shadow 0.3s var(--n-bezier),
        border-color 0.3s var(--n-bezier);
    &.is-border {
        border: 1px solid var(--divider-color);
        border-radius: var(--border-radius);
    }
    &.is-hover {
        box-shadow: var(--box-shadow-1);
    }
}
</style>
