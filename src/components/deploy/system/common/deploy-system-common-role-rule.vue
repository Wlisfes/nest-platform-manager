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
        return () => <div></div>
    }
})
</script>
