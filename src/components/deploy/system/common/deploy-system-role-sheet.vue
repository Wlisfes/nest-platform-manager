<script lang="tsx">
import { defineComponent, PropType, ref, watch, h } from 'vue'
import { useBaseService } from '@/hooks'
import { fetchNotifyService } from '@/plugins'
import { SendFilled } from '@vicons/carbon'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'DeploySystemRoleSheet',
    props: {
        /**/
        active: { type: String, required: true },
        /**角色ID**/
        roleId: { type: Number as PropType<number> }
    },
    setup(props, ctx) {
        const loading = ref(false)
        const checkedKeys = ref<Array<number>>([])
        const expandedKeys = ref<Array<number>>([])

        /**菜单树数据**/
        const treeData = useBaseService(() => Service.httpBaseSystemSheetTreeStructure(), {
            immediate: true,
            options: {}
        })

        /**角色关联菜单数据**/
        const sheetData = useBaseService(() => Service.httpBaseSystemColumnRoleSheet({ roleId: props.roleId }), {
            immediate: true,
            callback: fetchSheetCallback,
            options: {}
        })

        /**回显已选中菜单**/
        async function fetchSheetCallback(data: Omix) {
            checkedKeys.value = (data.list ?? []).map((item: Omix) => item.sheetId)
        }

        /**监听角色ID变化**/
        watch(
            () => props.roleId,
            () => sheetData.fetchRefresh()
        )

        /**保存角色菜单权限**/
        async function fetchSubmit() {
            try {
                loading.value = true
                await Service.httpBaseSystemUpdateRoleSheet({
                    roleId: props.roleId,
                    sheetIds: checkedKeys.value
                })
                return await fetchNotifyService({ title: '操作成功' })
            } catch (err: any) {
                return await fetchNotifyService({ type: 'error', title: err.message })
            } finally {
                loading.value = false
            }
        }

        return () => (
            <common-element is-white class="deploy-system-role-sheet h-full flex flex-col p-14 overflow-hidden">
                <n-tree
                    cascade
                    checkable
                    show-line
                    block-line
                    expand-on-click
                    key-field="keyId"
                    label-field="name"
                    children-field="children"
                    //selected-keys={faseState.selectedKeys}
                    //expanded-keys={faseState.expandedKeys}
                    data={treeData.faseNode.value.list}
                    render-switcher-icon={() => h(SendFilled)}
                    //on-update:selected-keys={fetchUpdateSelected}
                    //on-update:expanded-keys={fetchUpdateExpanded}
                />
            </common-element>
        )

        // return () => (
        //     <n-element class="deploy-system-role-sheet h-full flex flex-col overflow-hidden">
        //         <div class="flex items-center justify-end p-inline-14 p-block-10 border-b border-divider">
        //             <common-element-button type="primary" loading={loading.value} onClick={fetchSubmit}>
        //                 保存
        //             </common-element-button>
        //         </div>
        //         <n-scrollbar trigger="none" class="flex-1 overflow-hidden">
        //             <div class="p-14">
        //                 <n-tree
        //                     checkable
        //                     selectable={false}
        //                     cascade
        //                     block-line
        //                     key-field="keyId"
        //                     label-field="name"
        //                     children-field="children"
        //                     data={treeData.faseNode.value ?? []}
        //                     checked-keys={checkedKeys.value}
        //                     expanded-keys={expandedKeys.value}
        //                     on-update:checked-keys={(keys: Array<number>) => (checkedKeys.value = keys)}
        //                     on-update:expanded-keys={(keys: Array<number>) => (expandedKeys.value = keys)}
        //                 />
        //             </div>
        //         </n-scrollbar>
        //     </n-element>
        // )
    }
})
</script>
