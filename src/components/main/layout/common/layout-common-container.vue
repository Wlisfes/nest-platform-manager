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
        return () => <n-element class="layout-common-container flex flex-col"></n-element>
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
