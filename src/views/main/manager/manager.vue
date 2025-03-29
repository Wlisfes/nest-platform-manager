<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'BaseManager',
    setup(props, ctx) {
        return () => (
            <layout-common-container class="absolute inset-0 p-12" class-name="p-12 gap-12 overflow-hidden">
                <main-manager-summary></main-manager-summary>
            </layout-common-container>
        )
    }
})
</script>
