<script lang="tsx">
import { defineComponent, computed, CSSProperties, Fragment } from 'vue'

export default defineComponent({
    name: 'CommonElementScrollbar',
    setup(props, { slots }) {
        return () => (
            <n-scrollbar class="box-border" content-class="common-element-scrollbar">
                {slots.default && slots.default()}
            </n-scrollbar>
        )
    }
})
</script>

<style lang="scss" scoped>
:deep(.common-element-scrollbar) {
    position: relative;
    background-color: var(--card-color);
    transition: background-color 0.3s var(--n-bezier);
}
</style>
