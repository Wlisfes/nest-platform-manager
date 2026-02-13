<script lang="tsx">
import { defineComponent, Fragment } from 'vue'

export default defineComponent({
    name: 'LayoutCommonContainer',
    setup(props, { slots }) {
        return () => (
            <n-element class="layout-common-container flex flex-col flex-1 overflow-hidden">
                <Fragment>{slots.default && slots.default()}</Fragment>
            </n-element>
        )
    }
})
</script>
