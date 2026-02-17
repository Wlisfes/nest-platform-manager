<script lang="tsx">
import { defineComponent, h } from 'vue'
import { useSelectService } from '@/hooks'
import { useState } from '@/hooks'
import { SendFilled } from '@vicons/carbon'
import * as feedback from '@/components/deploy/hooks'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'DeploySystemRole',
    setup(props, ctx) {
        /**页面状态**/
        const { state, setState } = useState({
            activeTab: 'account' as 'account' | 'permission',
            selectedRole: undefined as Omix | undefined,
            accountLoading: false,
            accountList: [] as Array<Omix>,
            sheetLoading: false,
            sheetCheckedKeys: [] as Array<number>
        })

        /**通用角色列表**/
        const commonRoleOptions = useSelectService(e => Service.httpBaseSystemColumnCommonRole({ page: 1, size: 999 }), {
            callback: fetchCommonReadyCallback
        })
        /**部门角色列表**/
        const departmentRoleOptions = useSelectService(e => Service.httpBaseSystemColumnDepartmentRole({ page: 1, size: 999 }), {
            immediate: true
        })
        /**菜单树结构**/
        const sheetTreeOptions = useSelectService(e => Service.httpBaseSystemSheetTreeStructure(), {
            options: { expandedKeys: [] as Array<string> },
            immediate: true
        })

        /**通用角色初始化回调：默认选中第一个**/
        async function fetchCommonReadyCallback(data: Omix) {
            if (state.selectedRole) return false
            const first = data.dataSource?.[0]
            if (first) {
                return await fetchSelectRole(first)
            }
        }

        /**选中角色**/
        async function fetchSelectRole(role: Omix) {
            return await setState({ selectedRole: role }).then(async () => {
                return await fetchLoadTabData()
            })
        }

        /**加载当前tab数据**/
        async function fetchLoadTabData() {
            if (!state.selectedRole) return
            const roleId = state.selectedRole.keyId
            if (state.activeTab === 'account') {
                return await fetchLoadRoleAccount(roleId)
            } else {
                return await fetchLoadRoleSheet(roleId)
            }
        }

        /**加载角色关联账号**/
        async function fetchLoadRoleAccount(roleId: number) {
            await setState({ accountLoading: true })
            try {
                const { data } = await Service.httpBaseSystemColumnRoleAccount({ roleId })
                return await setState({ accountList: data.list ?? [], accountLoading: false })
            } catch (err) {
                return await setState({ accountList: [], accountLoading: false })
            }
        }

        /**加载角色菜单权限**/
        async function fetchLoadRoleSheet(roleId: number) {
            await setState({ sheetLoading: true })
            try {
                const { data } = await Service.httpBaseSystemColumnRoleSheet({ roleId })
                const checkedKeys = (data.list ?? []).map((item: Omix) => item.sheetId)
                return await setState({ sheetCheckedKeys: checkedKeys, sheetLoading: false })
            } catch (err) {
                return await setState({ sheetCheckedKeys: [], sheetLoading: false })
            }
        }

        /**切换tab**/
        async function fetchUpdateTab(tab: string) {
            return await setState({ activeTab: tab as typeof state.activeTab }).then(async () => {
                return await fetchLoadTabData()
            })
        }

        /**左侧树展开变更回调**/
        async function fetchUpdateSheetExpanded(keys: Array<string>) {
            return await sheetTreeOptions.setState({ expandedKeys: keys as never })
        }

        /**新增通用角色**/
        async function fetchCreateCommonRole() {
            return await feedback.fetchDeploySystemRole({
                title: '新增通用角色',
                command: 'CREATE',
                chunk: 'common',
                async onSubmit() {
                    return await commonRoleOptions.fetchRequest()
                }
            })
        }

        /**新增部门角色**/
        async function fetchCreateDepartmentRole() {
            return await feedback.fetchDeploySystemRole({
                title: '新增部门角色',
                command: 'CREATE',
                chunk: 'department',
                async onSubmit() {
                    return await departmentRoleOptions.fetchRequest()
                }
            })
        }

        /**编辑角色**/
        async function fetchUpdateRole() {
            if (!state.selectedRole) return
            const chunk = state.selectedRole.chunk as 'common' | 'department'
            const title = chunk === 'common' ? '编辑通用角色' : '编辑部门角色'
            return await feedback.fetchDeploySystemRole({
                title,
                command: 'UPDATE',
                chunk,
                node: state.selectedRole,
                async onSubmit() {
                    if (chunk === 'common') {
                        return await commonRoleOptions.fetchRequest()
                    }
                    return await departmentRoleOptions.fetchRequest()
                }
            })
        }

        /**渲染角色列表项**/
        function renderRoleItem(role: Omix) {
            const isSelected = state.selectedRole?.keyId === role.keyId
            return (
                <n-element
                    key={role.keyId}
                    class={[
                        'p-inline-14 p-block-10 cursor-pointer rounded-6 transition-colors',
                        isSelected ? 'bg-[var(--primary-color-hover)] text-white' : 'hover:bg-[var(--hover-color)]'
                    ]}
                    onClick={() => fetchSelectRole(role)}
                >
                    <n-text class={isSelected ? 'text-white!' : ''}>{role.name}</n-text>
                </n-element>
            )
        }

        return () => (
            <n-layout has-sider position="absolute" class="flex flex-col bg-transparent" content-class="flex-1 overflow-hidden">
                <n-layout-sider
                    width={300}
                    collapsed-width={0}
                    show-collapsed-content={false}
                    class="flex flex-col bg-transparent"
                    content-class="flex flex-col flex-1 overflow-hidden! p-block-14 p-is-14"
                >
                    <n-card class="flex-1 overflow-hidden" content-class="flex flex-col flex-1 p-inline-0! p-block-0! overflow-hidden">
                        <n-scrollbar trigger="none" class="flex-1 overflow-hidden">
                            <n-element class="p-inline-14 p-block-14">
                                <div class="flex items-center justify-between m-be-10">
                                    <n-text strong>通用角色</n-text>
                                    <common-element-button size="small" type="primary" onClick={fetchCreateCommonRole}>
                                        新增
                                    </common-element-button>
                                </div>
                                <common-element-spiner opacity={0} loading={commonRoleOptions.state.loading}>
                                    <div class="flex flex-col gap-4">
                                        {commonRoleOptions.dataSource.value.map((role: Omix) => renderRoleItem(role))}
                                        {!commonRoleOptions.state.loading && commonRoleOptions.dataSource.value.length === 0 && (
                                            <n-empty description="暂无通用角色" size="small" />
                                        )}
                                    </div>
                                </common-element-spiner>
                                <n-divider class="m-block-14!" />
                                <div class="flex items-center justify-between m-be-10">
                                    <n-text strong>部门角色</n-text>
                                    <common-element-button size="small" type="primary" onClick={fetchCreateDepartmentRole}>
                                        新增
                                    </common-element-button>
                                </div>
                                <common-element-spiner opacity={0} loading={departmentRoleOptions.state.loading}>
                                    <div class="flex flex-col gap-4">
                                        {departmentRoleOptions.dataSource.value.map((role: Omix) => renderRoleItem(role))}
                                        {!departmentRoleOptions.state.loading && departmentRoleOptions.dataSource.value.length === 0 && (
                                            <n-empty description="暂无部门角色" size="small" />
                                        )}
                                    </div>
                                </common-element-spiner>
                            </n-element>
                        </n-scrollbar>
                    </n-card>
                </n-layout-sider>
                <n-layout class="bg-transparent" content-class="flex flex-col flex-1 p-14 gap-14 overflow-hidden">
                    {state.selectedRole ? (
                        <n-card class="flex-1 overflow-hidden" content-class="flex flex-col flex-1 p-block-0! overflow-hidden">
                            <div class="flex items-center justify-between m-be-14">
                                <n-text strong class="text-16">
                                    {state.selectedRole.name}
                                </n-text>
                                <common-element-button dashed type="primary" onClick={fetchUpdateRole}>
                                    编辑角色
                                </common-element-button>
                            </div>
                            <n-tabs type="line" value={state.activeTab} on-update:value={fetchUpdateTab}>
                                <n-tab-pane name="account" tab="关联账号">
                                    <common-element-spiner opacity={0} loading={state.accountLoading}>
                                        <n-scrollbar trigger="none" style={{ maxHeight: '100%' }}>
                                            {state.accountList.length > 0 ? (
                                                <n-table bordered single-line size="small">
                                                    <thead>
                                                        <tr>
                                                            <th>账号UID</th>
                                                            <th>昵称</th>
                                                            <th>关联时间</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {state.accountList.map((item: Omix) => (
                                                            <tr key={item.keyId}>
                                                                <td>{item.uid?.uid ?? item.uid}</td>
                                                                <td>{item.uid?.nickname ?? '-'}</td>
                                                                <td>{item.createTime}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </n-table>
                                            ) : (
                                                <n-empty description="暂无关联账号" />
                                            )}
                                        </n-scrollbar>
                                    </common-element-spiner>
                                </n-tab-pane>
                                <n-tab-pane name="permission" tab="角色权限">
                                    <common-element-spiner opacity={0} loading={state.sheetLoading || sheetTreeOptions.state.loading}>
                                        <n-scrollbar trigger="none" style={{ maxHeight: '100%' }}>
                                            {sheetTreeOptions.dataSource.value.length > 0 ? (
                                                <n-tree
                                                    block-line
                                                    cascade
                                                    checkable
                                                    selectable={false}
                                                    key-field="keyId"
                                                    label-field="name"
                                                    children-field="children"
                                                    expanded-keys={sheetTreeOptions.state.expandedKeys}
                                                    checked-keys={state.sheetCheckedKeys}
                                                    data={sheetTreeOptions.dataSource.value}
                                                    render-switcher-icon={() => h(SendFilled)}
                                                    on-update:expanded-keys={fetchUpdateSheetExpanded}
                                                />
                                            ) : (
                                                <n-empty description="暂无菜单数据" />
                                            )}
                                        </n-scrollbar>
                                    </common-element-spiner>
                                </n-tab-pane>
                            </n-tabs>
                        </n-card>
                    ) : (
                        <n-card class="flex-1 overflow-hidden" content-class="flex flex-col flex-1 items-center justify-center">
                            <n-empty description="请在左侧选择一个角色" />
                        </n-card>
                    )}
                </n-layout>
            </n-layout>
        )
    }
})
</script>
