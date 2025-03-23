<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'DeploySystemResource',
    setup(props, ctx) {
        return () => (
            <layout-common-container class="flex flex-col flex-1 p-inline-12 p-bs-12" class-name="p-inline-12 p-bs-12">
                <div class="flex items-center">
                    <common-search-action></common-search-action>
                </div>
                {/* <common-element class="flex flex-col flex-1">
                    <div class="flex items-center p-inline-10">
                        <n-page-header title="资源管理"></n-page-header>
                        <common-search-action></common-search-action>
                    </div>
                </common-element> */}
                {Array.from({ length: 10 }, (x, index) => (
                    <n-h2>{index}</n-h2>
                ))}
            </layout-common-container>
        )
    }
})
</script>
