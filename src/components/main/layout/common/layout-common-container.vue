<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'LayoutCommonContainer',
    setup(props, { slots }) {
        return () => <n-element class="layout-common-container h-full flex flex-col">{slots.default && slots.default()}</n-element>
    }
})
</script>
