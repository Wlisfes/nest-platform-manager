<script lang="tsx">
import { defineComponent, onBeforeMount } from 'vue'
import { useVModels } from '@vueuse/core'
import { useChunkService } from '@/hooks/hook-chunk'
import { useState } from '@/hooks/hook-state'

export default defineComponent({
    name: 'DeploySystemCommonRoleModel',
    props: {
        /**选中ID**/
        keyId: { type: String }
    },
    setup(props, ctx) {
        /**通用字典枚举**/
        const { chunk, fetchRequest } = useChunkService({ COMMON_SYSTEM_ROLE_MODEL: true })

        onBeforeMount(fetchBaseSystemRoleResolver)
        async function fetchBaseSystemRoleResolver() {
            try {
                await fetchRequest()
            } catch (err) {}
        }

        return () => <n-element class="deploy-system-common-role-model flex flex-col flex-1">到了卡刷道具卡撒谎的</n-element>
    }
})
</script>

<style lang="scss" scoped>
.deploy-system-common-role-model {
    position: relative;
    overflow: hidden;
    padding: 70px 12px 12px;
}
</style>
