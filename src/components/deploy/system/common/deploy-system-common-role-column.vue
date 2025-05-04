<script lang="tsx">
import { defineComponent, computed, PropType } from 'vue'
import { useVModels } from '@vueuse/core'
import { useState } from '@/hooks/hook-state'
import { stop } from '@/utils/utils-common'
import * as feedback from '@/components/deploy/hooks'

export default defineComponent({
    name: 'DeploySystemCommonRoleColumn',
    emits: ['refresh', 'selecter', 'update:node'],
    props: {
        /**选中ID**/
        keyId: { type: String },
        /**节点数据**/
        node: { type: Object as PropType<Omix>, default: () => ({}) }
    },
    setup(props, { emit }) {
        const { keyId, node } = useVModels(props, emit)
        const { state, setState } = useState({ visible: false })
        const checked = computed(() => keyId.value === node.value.keyId)

        async function fetchTrigger(event: MouseEvent) {
            return await stop(event).then(async () => {
                return await setState({ visible: true })
            })
        }

        /**操作指令回调函数**/
        async function fetchCommand(event: Omix) {
            return await setState({ visible: false }).then(async () => {
                if (event.command === 'UPDATE') {
                    return await feedback.fetchDeploySystemFeedbackRole({
                        title: '编辑角色',
                        command: event.command,
                        node: node.value,
                        onSubmit: () => emit('refresh')
                    })
                }
                if (event.command === 'DELETE') {
                }
            })
        }

        return () => (
            <n-button
                quaternary
                type="primary"
                key={node.value.keyId}
                class={{ 'deploy-system-common-role-column': true, 'is-checked': checked.value }}
                onClick={() => emit('selecter', node.value.keyId)}
            >
                <n-text class="flex-1 text-start">{node.value.name}</n-text>
                <common-element-popover
                    placement="bottom-end"
                    style={{ padding: '8px', '--v-offset-left': '-5px' }}
                    v-model:visible={state.visible}
                    on-update:show={(show: boolean) => setState({ visible: show })}
                >
                    {{
                        trigger: () => (
                            <common-element-button text icon="nest-settings" icon-size={18} onClick={fetchTrigger}></common-element-button>
                        ),
                        default: () => (
                            <n-element class="min-w-80 flex flex-col overflow-hidden [&>.n-button]:justify-start [&>.n-button]:p-inline-8">
                                <common-element-button
                                    quaternary
                                    content="编辑"
                                    type="primary"
                                    icon="nest-edit"
                                    icon-size={16}
                                    onClick={() => fetchCommand({ command: 'UPDATE' })}
                                ></common-element-button>
                                <common-element-button
                                    quaternary
                                    content="删除"
                                    type="error"
                                    icon="nest-delete"
                                    icon-size={16}
                                    onClick={() => fetchCommand({ command: 'DELETE', type: 'error' })}
                                ></common-element-button>
                            </n-element>
                        )
                    }}
                </common-element-popover>
            </n-button>
        )
    }
})
</script>

<style lang="scss" scoped>
.deploy-system-common-role-column {
    position: relative;
    &.is-checked {
        background-color: var(--n-color-hover);
    }
    :deep(.n-button__content) {
        flex: 1;
    }
}
</style>
