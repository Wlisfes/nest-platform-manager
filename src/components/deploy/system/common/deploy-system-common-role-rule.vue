<script lang="tsx">
import { defineComponent, Fragment } from 'vue'
import { useVModels } from '@vueuse/core'
import { useState } from '@/hooks/hook-state'

export default defineComponent({
    name: 'DeploySystemCommonRoleRule',
    props: {
        /**选中ID**/
        keyId: { type: String }
    },
    setup(props, ctx) {
        return () => (
            <n-element class="deploy-system-common-role-rule flex flex-col flex-1 p-bs-58">
                <common-element class="flex-1">都是垃圾的卡拉</common-element>
            </n-element>
        )
    }
})
</script>
