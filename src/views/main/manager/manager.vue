<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'BaseManager',
    setup(props, ctx) {
        return () => (
            <common-container class="p-inline-24 p-block-24">
                <main-manager-summary></main-manager-summary>
            </common-container>
        )
    }
})
</script>
