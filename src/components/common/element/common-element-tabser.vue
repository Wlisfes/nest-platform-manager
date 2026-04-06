<script lang="tsx">
import { defineComponent, Fragment } from 'vue'

export default defineComponent({
    name: 'CommonElementTabser',
    setup(props, { slots }) {
        return () => (
            <n-tabs animated type="line" class="common-element-tabser">
                {slots}
            </n-tabs>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-element-tabser.n-tabs {
    :deep(.n-tabs-pane-wrapper) {
        position: relative;
        flex: 1;
    }
    :deep(.n-tab-pane) {
        position: absolute;
        inset: 0;
        padding: 0;
    }
}
</style>
