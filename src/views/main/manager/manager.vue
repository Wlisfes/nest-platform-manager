<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'BaseManager',
    setup(props, ctx) {
        return () => (
            <common-container class="flex flex-col flex-1 p-inline-16 p-block-16">
                <main-manager-summary></main-manager-summary>
            </common-container>
        )
    }
})
</script>
