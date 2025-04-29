<script lang="tsx">
import { defineComponent, computed, PropType } from 'vue'
import { useVModels } from '@vueuse/core'

export default defineComponent({
    name: 'DeploySystemCommonColumnRole',
    emits: ['selecter'],
    props: {
        /**选中ID**/
        keyId: { type: String },
        /**初始化**/
        initialize: { type: Boolean, default: true },
        /**岗位角色**/
        dataColumn: { type: Array as PropType<Array<Omix>>, default: () => [] },
        /**部门角色**/
        dataSource: { type: Array as PropType<Array<Omix>>, default: () => [] }
    },
    setup(props, { emit }) {
        const { dataColumn } = useVModels(props)
        const treeNode = computed(() => ({
            keys: [props.keyId].filter(Boolean),
            style: { '--n-node-content-height': '34px', '--n-node-color-active': 'var(--n-node-color-pressed)' }
        }))

        async function fetchSelecter(keyId: string) {
            return emit('selecter', keyId)
        }

        return () => (
            <common-element
                class="deploy-system-common-column-role h-full flex flex-col gap-10 overflow-hidden"
                radius="var(--border-radius)"
            >
                <div class="flex flex-col overflow-hidden">
                    <n-h4 class="m-0 p-inline-12 p-bs-12 p-be-10">
                        <n-blockquote class="p-is-6 line-height-20">岗位角色</n-blockquote>
                    </n-h4>
                    <common-element-draggable class="p-inline-5" animation={150} v-model={dataColumn.value}>
                        {dataColumn.value.map(item => (
                            <div class="flex flex-col p-block-3" key={item.keyId}>
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
                </div>
                <div class="flex flex-col overflow-hidden">
                    <n-h4 class="m-0 p-inline-12 p-bs-12 p-be-10">
                        <n-blockquote class="p-is-6 line-height-20">部门角色</n-blockquote>
                    </n-h4>
                    <div class="p-inline-5">
                        <n-tree
                            selectable
                            block-line
                            expand-on-click
                            cancelable={false}
                            selected-keys={treeNode.value.keys}
                            data={props.dataSource}
                            style={treeNode.value.style}
                            key-field="keyId"
                            label-field="name"
                            children-field="children"
                            on-update:selected-keys={(keys: Array<string>) => fetchSelecter(keys[0])}
                        />
                    </div>
                </div>
            </common-element>
        )
    }
})
</script>
