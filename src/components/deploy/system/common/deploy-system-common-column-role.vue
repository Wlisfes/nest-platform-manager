<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import { useVModels } from '@vueuse/core'

export default defineComponent({
    name: 'DeploySystemCommonColumnRole',
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
    setup(props, { slots }) {
        const { keyId, dataColumn } = useVModels(props)

        return () => (
            <common-element
                class="deploy-system-common-column-role h-full flex flex-col gap-20 overflow-hidden"
                radius="var(--border-radius)"
            >
                <div class="flex flex-col overflow-hidden">
                    <n-h4 class="m-0 p-inline-12 p-be-5">岗位角色</n-h4>
                    <common-element-draggable class="p-inline-5" animation={150} v-model={dataColumn.value}>
                        {dataColumn.value.map(item => (
                            <div class="flex flex-col p-block-3" key={item.keyId}>
                                <n-button class="justify-start p-inline-10" type="primary" quaternary focusable={false}>
                                    {item.name}
                                </n-button>
                            </div>
                        ))}
                    </common-element-draggable>
                </div>
                <div class="flex flex-col overflow-hidden">
                    <n-h4 class="m-0 p-inline-12 p-be-5">部门角色</n-h4>
                    <div class="p-inline-5">
                        <n-tree
                            block-line
                            show-line
                            data={props.dataSource}
                            key-field="keyId"
                            label-field="name"
                            children-field="children"
                            cancelable={false}
                            expand-on-click
                            selectable
                            style={{ '--n-node-content-height': '34px' }}
                        />
                    </div>
                </div>
            </common-element>
        )
    }
})
</script>
