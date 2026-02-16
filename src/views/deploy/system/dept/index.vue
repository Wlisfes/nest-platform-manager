<script lang="tsx">
import { defineComponent, h } from 'vue'
import { useColumnService, useSelectService } from '@/hooks'
import { SendFilled } from '@vicons/carbon'
import { TreeOption } from 'naive-ui'
import * as feedback from '@/components/deploy/hooks'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'DeploySystemDepartment',
    setup(props, ctx) {
        /**部门树结构**/
        const deptOptions = useSelectService(e => Service.httpBaseSystemDepartmentTreeStructure(), {
            options: { pattern: undefined, selectedKeys: [], expandedKeys: [] },
            callback: fetchReadyCallback
        })
        /**表格实例**/
        const { formRef, formState, state, instOptions, setForm, fetchRequest, fetchRestore, fetchRefresh } = useColumnService({
            request: (base, payload) => Service.httpBaseSystemColumnDepartment(payload),
            keyName: 'chatbok:deploy:system:dept',
            immediate: false,
            formState: {
                pid: undefined, //父级ID
                name: undefined //部门名称
            },
            columns: [
                { title: '部门名称', key: 'name', minWidth: 240, disabled: true },
                { title: '别名简称', key: 'alias', width: 120, check: true },
                { title: '创建人', key: 'createBy', width: 120, check: true },
                { title: '创建时间', key: 'createTime', width: 160, check: true },
                { title: '更新人', key: 'modifyBy', width: 120, check: true },
                { title: '更新时间', key: 'modifyTime', width: 160, check: true }
            ]
        })

        /**初始化回调**/
        async function fetchReadyCallback(data: Omix) {
            if (deptOptions.selectedKeys.value.length > 0) {
                return false
            }
            const items = data.dataSource.map((item: Omix) => item.keyId)
            const selecteds = items.filter((e: Omix, index: number) => index === 0)
            const expandeds = items.filter((e: Omix, index: number) => index === 0)
            return await deptOptions.setState({ selectedKeys: selecteds, expandedKeys: expandeds }).then(async () => {
                return await setForm({ pid: selecteds[0] ?? undefined }).then(async () => {
                    return await fetchRequest()
                })
            })
        }
        /**左侧树展开变更回调**/
        async function fetchUpdateExpanded(keys: Array<string>) {
            return await deptOptions.setState({ expandedKeys: keys as never })
        }
        /**左侧树选中变更回调**/
        async function fetchUpdateSelected(keys: Array<string>) {
            await deptOptions.setState({ selectedKeys: keys as never })
            return await setForm({ pid: keys[0] as never }).then(() => {
                return fetchRefresh({ page: 1, size: state.size })
            })
        }

        /**新增部门**/
        async function fetchDeployDepartmentCreate() {
            return await feedback.fetchDeploySystemDepartment({
                title: '新增部门',
                command: 'CREATE',
                async onSubmit() {
                    return await Promise.all([deptOptions.fetchRequest(), fetchRefresh()])
                }
            })
        }

        /**编辑部门**/
        async function fetchDeployDepartmentUpdate() {
            return await feedback.fetchDeploySystemDepartment({
                title: '编辑部门',
                command: 'UPDATE',
                node: state.select[0],
                async onSubmit() {
                    return await Promise.all([deptOptions.fetchRequest(), fetchRefresh()])
                }
            })
        }

        return () => (
            <n-layout has-sider position="absolute" class="flex flex-col bg-transparent" content-class="flex-1 overflow-hidden">
                <n-layout-sider
                    width={360}
                    collapsed-width={0}
                    show-collapsed-content={false}
                    class="flex flex-col bg-transparent"
                    content-class="flex flex-col flex-1 overflow-hidden! p-block-14 p-is-14"
                >
                    <n-card class="flex-1 overflow-hidden" content-class="flex flex-col flex-1 p-inline-0! p-block-14! overflow-hidden">
                        <common-element-spiner opacity={0} loading={deptOptions.state.loading}>
                            <n-scrollbar trigger="none" class="flex-1 overflow-hidden">
                                <n-element class="p-inline-14">
                                    <n-tree
                                        block-line
                                        cancelable={false}
                                        key-field="keyId"
                                        label-field="name"
                                        children-field="children"
                                        pattern={deptOptions.state.pattern}
                                        selected-keys={deptOptions.state.selectedKeys}
                                        expanded-keys={deptOptions.state.expandedKeys}
                                        data={deptOptions.dataSource.value}
                                        render-switcher-icon={() => h(SendFilled)}
                                        on-update:selected-keys={fetchUpdateSelected}
                                        on-update:expanded-keys={fetchUpdateExpanded}
                                        filter={(vague: string, node: Omix) => node.name.includes(vague)}
                                    />
                                </n-element>
                            </n-scrollbar>
                        </common-element-spiner>
                    </n-card>
                </n-layout-sider>
                <n-layout class="bg-transparent" content-class="flex flex-col flex-1 p-14 gap-14 overflow-hidden">
                    <n-layout-header class="bg-transparent">
                        <common-database-search
                            class="p-0!"
                            function-class="justify-end"
                            function={['search', 'restore', 'collapse', 'deploy', 'abstract']}
                            ref={formRef}
                            limit={state.limit}
                            v-model:loading={state.loading}
                            v-model:when={state.when}
                            v-model:database={state.database}
                            v-model:formState={formState.value}
                            on-update:database={instOptions.fetchUpdateDatabase}
                            on-restore={fetchRestore}
                            on-submit={fetchRequest}
                        >
                            <common-database-search-function abstract class="flex gap-col-10">
                                <common-element-button type="primary" onClick={fetchDeployDepartmentCreate}>
                                    新增
                                </common-element-button>
                                <common-element-button
                                    {...{ secondary: true, type: 'primary', disabled: state.select.length !== 1 }}
                                    onClick={fetchDeployDepartmentUpdate}
                                >
                                    编辑
                                </common-element-button>
                                <common-element-button {...{ secondary: true, type: 'error', disabled: state.select.length === 0 }}>
                                    删除
                                </common-element-button>
                            </common-database-search-function>
                            <common-database-search-column disabled prop="name" label="部门名称">
                                <form-common-column-input
                                    clearable
                                    placeholder="请输入部门名称"
                                    v-model:value={formState.value.name}
                                    on-submit={fetchRefresh}
                                />
                            </common-database-search-column>
                        </common-database-search>
                    </n-layout-header>
                    <n-layout-content class="flex flex-col flex-1 bg-transparent" content-class="flex flex-col flex-1">
                        <common-database-table
                            class="p-0!"
                            show-select
                            show-settings
                            limit={state.limit}
                            total={state.total}
                            columns={state.columns}
                            v-model:page={state.page}
                            v-model:size={state.size}
                            v-model:select={state.select}
                            v-model:data={state.dataSource}
                            v-model:loading={state.loading}
                            v-model:initialize={state.initialize}
                            v-model:customize={state.customize}
                            on-update:customize={instOptions.fetchUpdateCustomize}
                            on-update:page={(page: number) => fetchRefresh({ page })}
                            on-update:size={(size: number) => fetchRefresh({ page: 1, size })}
                        >
                            {{
                                col_createBy: (data: Omix) => (
                                    <common-database-table-user element="text" data={data.createBy}></common-database-table-user>
                                ),
                                col_modifyBy: (data: Omix) => (
                                    <common-database-table-user element="text" data={data.modifyBy}></common-database-table-user>
                                )
                            }}
                        </common-database-table>
                    </n-layout-content>
                </n-layout>
            </n-layout>
        )
    }
})
</script>
