<script lang="tsx">
import { defineComponent, PropType, watch } from 'vue'
import { useColumnService } from '@/hooks'
import { stop } from '@/utils'
import * as feedback from '@/components/deploy/hooks'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'DeploySystemRoleAccount',
    props: {
        /**激活标识**/
        active: { type: String, required: true },
        /**角色ID**/
        roleId: { type: Number as PropType<number> }
    },
    setup(props, ctx) {
        /**表格实例**/
        const { formRef, formState, state, instState, instOptions, setForm, fetchRequest, fetchRestore, fetchRefresh } = useColumnService({
            request: (base, payload) => Service.httpBaseSystemColumnAccountRole({ ...payload, roleId: props.roleId }),
            keyName: 'chatbok:deploy:system:role:account',
            immediate: true,
            formState: { vague: undefined, phone: undefined, email: undefined },
            columns: [
                { title: '姓名', key: 'name', width: 120, disabled: true },
                { title: '工号', key: 'number', width: 100, check: true },
                { title: '手机号', key: 'phone', minWidth: 140, check: true },
                { title: '邮箱', key: 'email', minWidth: 200, check: true },
                { title: '创建人', key: 'createBy', width: 120, check: true },
                { title: '创建时间', key: 'createTime', width: 160, check: true },
                { title: '更新人', key: 'modifyBy', width: 120, check: true },
                { title: '更新时间', key: 'modifyTime', width: 160, check: true },
                { title: '操作', key: 'action', width: 80, align: 'center' }
            ]
        })

        /**添加关联用户弹窗**/
        async function fetchDeployRoleAccount(event: MouseEvent) {
            return await feedback.fetchDeploySystemRoleAccount({
                title: '添加关联用户',
                roleId: props.roleId,
                onSubmit: fetchRefresh
            })
        }

        /**移除关联用户**/
        async function fetchDeleteAccountRole(event: MouseEvent, uids: Array<string>) {
            return await stop(event).then(async () => {
                return await Service.httpBaseSystemDeleteAccountRole({ roleId: props.roleId, uids }).then(() => {
                    return fetchRefresh({ page: 1 })
                })
            })
        }

        return () => (
            <n-element class="deploy-system-role-account h-full flex flex-col gap-14 overflow-hidden">
                <common-database-search
                    class="p-0!"
                    bordered={false}
                    function-class="justify-end"
                    function={['search', 'restore', 'collapse', 'abstract']}
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
                        <common-element-button dashed type="primary" onClick={fetchDeployRoleAccount}>
                            关联员工
                        </common-element-button>
                    </common-database-search-function>
                    <common-database-search-column prop="vague" label="姓名/工号">
                        <form-common-column-input
                            clearable
                            placeholder="请输入姓名/工号"
                            v-model:value={formState.value.vague}
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
                </common-database-search>
                <common-database-table
                    class="p-0!"
                    show-select
                    show-settings
                    bordered={false}
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
                        ),
                        col_action: (data: Omix) => (
                            <common-element-button
                                {...{ text: true, iconSize: 14, icon: 'nest-delete', type: 'error' }}
                                onClick={(e: MouseEvent) => fetchDeleteAccountRole(e, [data.uid])}
                            ></common-element-button>
                        )
                    }}
                </common-database-table>
            </n-element>
        )
    }
})
</script>
