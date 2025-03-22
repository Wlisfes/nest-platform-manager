<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'DeploySystemResource',
    setup(props, ctx) {
        return () => (
            <common-container class="flex flex-col flex-1 p-inline-8 p-block-8">
                <common-element class="flex-1">资源管理</common-element>
            </common-container>
        )
    }
})
</script>
