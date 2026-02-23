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
            immediate: true
        })
        /**表格实例**/
        const { formRef, formState, state, instState, instOptions, setForm, fetchRequest, fetchRestore, fetchRefresh } = useColumnService({
            request: (base, payload) => Service.httpBaseSystemColumnAccount(payload),
            keyName: 'chatbok:deploy:system:account',
            formState: {
                name: undefined, //名称工号
                phone: undefined, //手机号
                email: undefined, //邮箱
                status: undefined, //状态
                depts: [] //归属部门
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
        /**编辑账号**/
        async function fetchDeployAccountUpdate() {
            return await feedback.fetchDeploySystemAccount({
                title: '编辑账号',
                command: 'UPDATE',
                node: state.select[0],
                async onSubmit() {
                    return await fetchRefresh()
                }
            })
        }

        return () => (
            <layout-common-container initialize={state.initialize}>
                <common-database-search
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
                            新增
                        </common-element-button>
                        <common-element-button dashed type="primary" disabled={instState.value.isUpdate} onClick={fetchDeployAccountUpdate}>
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
                    <common-database-search-column prop="depts" label="归属部门">
                        <form-common-column-cascader
                            multiple
                            clearable
                            placeholder="请选择归属部门"
                            v-model:value={formState.value.depts}
                            options={deptOptions.dataSource.value}
                        ></form-common-column-cascader>
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
                <common-database-table
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
            </layout-common-container>
        )
    }
})
</script>
