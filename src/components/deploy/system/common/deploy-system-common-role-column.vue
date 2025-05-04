<script lang="tsx">
import { defineComponent, computed, PropType } from 'vue'
import { useVModels } from '@vueuse/core'
import * as feedback from '@/components/deploy/hooks'

export default defineComponent({
    name: 'DeploySystemCommonRoleColumn',
    emits: ['selecter', 'update:node'],
    props: {
        /**节点数据**/
        node: { type: Object as PropType<Omix>, default: () => ({}) }
    },
    setup(props, { emit }) {
        const { node } = useVModels(props, emit)

        async function fetchSelecter(keyId: string) {
            return emit('selecter', keyId)
        }

        return () => (
            <n-button
                quaternary
                type="primary"
                class="deploy-system-common-role-column [&>span]:flex-1"
                key={node.value.keyId}
                onClick={() => emit('selecter', node.value.keyId)}
            >
                <n-text class="flex-1 text-start">{node.value.name}</n-text>
                <common-element-button text icon="nest-settings" icon-size={18}></common-element-button>
            </n-button>
        )
    }
})
</script>
