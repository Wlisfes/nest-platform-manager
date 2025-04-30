<script lang="tsx">
import { defineComponent, computed, PropType } from 'vue'
import { useVModels } from '@vueuse/core'

export default defineComponent({
    name: 'DeploySystemCommonRoleSider',
    emits: ['selecter', 'update:list'],
    props: {
        /**选中ID**/
        keyId: { type: String },
        /**初始化**/
        initialize: { type: Boolean, default: true },
        /**岗位角色**/
        list: { type: Array as PropType<Array<Omix>>, default: () => [] },
        /**部门角色**/
        items: { type: Array as PropType<Array<Omix>>, default: () => [] }
    },
    setup(props, { emit }) {
        const { list, items } = useVModels(props)
        const treeNode = computed(() => ({
            keys: [props.keyId].filter(Boolean),
            style: { '--n-node-content-height': '34px', '--n-node-color-active': 'var(--n-node-color-pressed)' }
        }))

        async function fetchSelecter(keyId: string) {
            return emit('selecter', keyId)
        }

        return () => (
            <common-element class="deploy-system-common-role-sider h-full flex flex-col overflow-hidden" radius="var(--border-radius)">
                <div class="flex items-center justify-between p-inline-12 p-bs-12 p-be-12">
                    <n-h4 prefix="bar" class="m-0 line-height-20">
                        部门角色
                    </n-h4>
                    <common-element-button content="新增" type="primary" icon="nest-plus"></common-element-button>
                </div>
                <div class="flex flex-col flex-1 overflow-hidden">
                    <n-scrollbar class="flex-1 overflow-hidden">
                        <common-element-draggable class="p-inline-5" animation={150} v-model={list.value}>
                            {list.value.map(item => (
                                <div class="flex flex-col" key={item.keyId}>
                                    <n-button
                                        style={props.keyId === item.keyId ? { backgroundColor: 'var(--n-color-hover)' } : {}}
                                        class="justify-start p-inline-10"
                                        type="primary"
                                        quaternary
                                        onClick={() => fetchSelecter(item.keyId)}
                                    >
                                        <n-text>{item.name}</n-text>
                                    </n-button>
                                </div>
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
                                    selected-keys={treeNode.value.keys}
                                    data={items.value}
                                    style={treeNode.value.style}
                                    key-field="keyId"
                                    label-field="name"
                                    children-field="children"
                                    on-update:selected-keys={(keys: Array<string>) => fetchSelecter(keys[0])}
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
