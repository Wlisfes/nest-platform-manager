<script lang="tsx">
import { defineComponent, h } from 'vue'
import { useColumnService, useSelectService, useChunkService } from '@/hooks'
import { SendFilled } from '@vicons/carbon'
import * as feedback from '@/components/deploy/hooks'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'DeploySystemAccount',
    setup(props, ctx) {
        /**通用字典枚举**/
        const chunkOptions = useChunkService({ type: ['CHUNK_WINDOWS_ACCOUNT_STATUS'] })
        /**部门树结构**/
        const deptOptions = useSelectService(e => Service.httpBaseSystemDepartmentTreeStructure(), {
            options: { pattern: undefined, selectedKeys: [], expandedKeys: [] },
            callback: fetchReadyCallback
        })
        /**表格实例**/
        const { formRef, formState, state, instState, instOptions, setForm, fetchRequest, fetchRestore, fetchRefresh } = useColumnService({
            request: (base, payload) => Service.httpBaseSystemColumnAccount(payload),
            keyName: 'chatbok:deploy:system:account',
            immediate: false,
            formState: {
                name: undefined, //名称工号
                phone: undefined, //手机号
                email: undefined, //邮箱
                status: undefined //状态
            },
            columns: [
                { title: '头像', key: 'avatar', width: 100, align: 'center', disabled: true },
                { title: '名称', key: 'name', width: 100, disabled: true },
                { title: '工号', key: 'number', width: 100, disabled: true },
                { title: '状态', key: 'status', width: 100, align: 'center', check: true },
                { title: '手机号', key: 'phone', width: 160, check: true },
                { title: '邮箱', key: 'email', width: 220, check: true },
                { title: '归属部门', key: 'depts', minWidth: 160, check: true },
                { title: '已关联角色', key: 'roles', minWidth: 160, check: true },
                { title: '入职时间', key: 'createTime', width: 160, check: true }
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

        /**新增账号**/
        async function fetchDeployAccountCreate() {
            return await feedback.fetchDeploySystemAccount({
                title: '新增账号',
                command: 'CREATE',
                async onSubmit() {
                    return await fetchRefresh()
                }
            })
        }

        return () => (
            <n-layout has-sider position="absolute" class="flex flex-col bg-transparent" content-class="flex-1 overflow-hidden">
                <n-layout-sider
                    width={320}
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
                                <common-element-button type="primary" onClick={fetchDeployAccountCreate}>
                                    添加
                                </common-element-button>
                                <common-element-button dashed type="primary" disabled={instState.value.isUpdate}>
                                    编辑
                                </common-element-button>
                                <common-element-button dashed type="error" disabled={instState.value.isDelete}>
                                    删除
                                </common-element-button>
                            </common-database-search-function>
                            <common-database-search-column disabled prop="name" label="名称/工号">
                                <form-common-column-input
                                    clearable
                                    placeholder="请输入名称或工号"
                                    v-model:value={formState.value.name}
                                    on-submit={fetchRefresh}
                                ></form-common-column-input>
                            </common-database-search-column>
                            <common-database-search-column prop="phone" label="手机号">
                                <form-common-column-input
                                    clearable
                                    placeholder="请输入手机号"
                                    v-model:value={formState.value.phone}
                                    on-submit={fetchRefresh}
                                ></form-common-column-input>
                            </common-database-search-column>
                            <common-database-search-column prop="email" label="邮箱">
                                <form-common-column-input
                                    clearable
                                    placeholder="请输入邮箱"
                                    v-model:value={formState.value.email}
                                    on-submit={fetchRefresh}
                                ></form-common-column-input>
                            </common-database-search-column>
                            <common-database-search-column prop="status" label="状态">
                                <form-common-column-select
                                    clearable
                                    placeholder="请选择状态"
                                    options={chunkOptions.CHUNK_WINDOWS_ACCOUNT_STATUS.value}
                                    v-model:value={formState.value.status}
                                    on-change:value={fetchRefresh}
                                ></form-common-column-select>
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
                                col_avatar: (data: Omix) => {
                                    return <common-database-table-user element="avatar" data={data}></common-database-table-user>
                                },
                                col_status: (data: Omix) => (
                                    <common-database-table-chunk
                                        element="chunk"
                                        value={data.status}
                                        options={chunkOptions.CHUNK_WINDOWS_ACCOUNT_STATUS.value}
                                    ></common-database-table-chunk>
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
