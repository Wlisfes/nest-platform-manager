<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'DeploySystemUser',
    setup(props, ctx) {
        return () => (
            <layout-common-container class="absolute inset-0 p-12" class-name="p-12 gap-12 overflow-hidden">
                <common-element class="flex-1">用户管理</common-element>
            </layout-common-container>
        )
    }
})
</script>
