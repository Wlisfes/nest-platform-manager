<script lang="tsx">
import { defineComponent, computed, PropType } from 'vue'
import { useVModels } from '@vueuse/core'
import * as feedback from '@/components/deploy/hooks'

export default defineComponent({
    name: 'DeploySystemCommonRoleSider',
    emits: ['refresh', 'selecter', 'update:list'],
    props: {
        /**选中ID**/
        keyId: { type: String },
        /**初始化**/
        initialize: { type: Boolean, default: true },
        /**岗位角色**/
        list: { type: Array as PropType<Array<Omix>>, default: () => [] },
        /**部门角色**/
        items: { type: Array as PropType<Array<Omix>>, default: () => [] },
        /**刷新回调事件**/
        fetchRefresh: { type: Function, required: true }
    },
    setup(props, { emit }) {
        const { list, items } = useVModels(props)

        /**操作指令回调函数**/
        async function fetchCommand(event: Omix) {
            return await feedback.fetchDeploySystemFeedbackRole({
                command: event.command,
                title: '新增角色',
                onSubmit: () => props.fetchRefresh()
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
                        <common-element-draggable class="flex flex-col gap-6 p-inline-5" animation={150} v-model={list.value}>
                            {list.value.map(item => (
                                <deploy-system-common-role-column
                                    key={item.keyId}
                                    v-model:node={item}
                                    onSelecter={(id: string) => emit('selecter', id)}
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
                                    data={items.value}
                                    key-field="keyId"
                                    label-field="name"
                                    children-field="children"
                                    on-update:selected-keys={(keys: Array<string>) => emit('selecter', keys[0])}
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
