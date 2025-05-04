<script lang="tsx">
import { defineComponent, onBeforeMount } from 'vue'
import { useVModels } from '@vueuse/core'
import { useState } from '@/hooks/hook-state'
import { isNotEmpty } from '@/utils/utils-common'
import * as feedback from '@/components/deploy/hooks'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'DeploySystemCommonRoleSider',
    emits: ['update:keyId', 'update:initialize'],
    props: {
        /**选中ID**/
        keyId: { type: String },
        /**初始化**/
        initialize: { type: Boolean, default: true }
    },
    setup(props, { emit }) {
        const { keyId, initialize } = useVModels(props, emit)
        const { state, setState } = useState({ list: [] as Array<Omix>, items: [] as Array<Omix> })

        /**所有角色配置**/
        onBeforeMount(fetchBaseSystemColumnRoleWhole)
        async function fetchBaseSystemColumnRoleWhole() {
            try {
                return await Service.httpBaseSystemColumnRoleWhole().then(async ({ data }) => {
                    return await setState({ list: data.list, items: data.items }).then(() => {
                        if (isNotEmpty(data.list.at(0))) {
                            keyId.value = data.list.at(0).keyId
                        }
                        initialize.value = false
                    })
                })
            } catch (err) {
                return await setState({ list: [], items: [] }).then(() => {
                    keyId.value = ''
                    initialize.value = false
                })
            }
        }

        /**操作指令回调函数**/
        async function fetchCommand(event: Omix) {
            return await feedback.fetchDeploySystemFeedbackRole({
                title: '新增角色',
                command: event.command,
                onSubmit: fetchBaseSystemColumnRoleWhole
            })
        }

        return () => (
            <common-element class="deploy-system-common-role-sider h-full flex flex-col overflow-hidden" radius="var(--border-radius)">
                <div class="flex items-center justify-between p-inline-12 p-bs-12 p-be-12">
                    <n-h4 prefix="bar" class="m-0 line-height-20">
                        部门角色
                    </n-h4>
                    <common-element-button
                        content="新增"
                        type="primary"
                        icon="nest-plus"
                        onClick={() => fetchCommand({ command: 'CREATE' })}
                    ></common-element-button>
                </div>
                <div class="flex flex-col flex-1 overflow-hidden">
                    <n-scrollbar class="flex-1 overflow-hidden">
                        <common-element-draggable class="flex flex-col gap-6 p-inline-5" animation={150} v-model={state.list}>
                            {state.list.map(item => (
                                <deploy-system-common-role-column
                                    key={item.keyId}
                                    v-model:key-id={props.keyId}
                                    v-model:node={item}
                                    onSelecter={(id: string) => (keyId.value = id)}
                                    onRefresh={fetchBaseSystemColumnRoleWhole}
                                ></deploy-system-common-role-column>
                            ))}
                        </common-element-draggable>
                        <div class="flex flex-col overflow-hidden">
                            <div class="flex items-center p-inline-12 p-bs-16 p-be-8">
                                <n-h4 prefix="bar" class="m-0 line-height-20">
                                    部门角色
                                </n-h4>
                            </div>
                            <div class="p-inline-5">
                                <n-tree
                                    selectable
                                    block-line
                                    expand-on-click
                                    cancelable={false}
                                    selected-keys={[props.keyId].filter(Boolean)}
                                    data={state.items}
                                    key-field="keyId"
                                    label-field="name"
                                    children-field="children"
                                    on-update:selected-keys={(keys: Array<string>) => (keyId.value = keys[0])}
                                />
                            </div>
                        </div>
                    </n-scrollbar>
                </div>
            </common-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.deploy-system-common-role-sider {
    position: relative;
    :deep(.deploy-system-common-role-column) {
        justify-content: flex-start;
        padding: 0 10px;
    }
    .n-tree.n-tree--block-node {
        --n-node-content-height: 34px;
        --n-node-color-active: var(--n-node-color-pressed);
    }
}
</style>
