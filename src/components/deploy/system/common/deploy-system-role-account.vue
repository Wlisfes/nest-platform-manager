<script lang="tsx">
import { defineComponent, PropType, watch } from 'vue'
import { useColumnService } from '@/hooks'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'DeploySystemRoleAccount',
    props: {
        /****/
        active: { type: String, required: true },
        /**角色ID**/
        roleId: { type: Number as PropType<number> }
    },
    setup(props, ctx) {
        /**表格实例**/
        const { formRef, formState, state, instState, instOptions, setForm, fetchRequest, fetchRestore, fetchRefresh } = useColumnService({
            request: (base, payload) => Service.httpBaseSystemColumnAccountRole(payload),
            keyName: 'chatbok:deploy:system:role:account',
            immediate: true,
            formState: {
                roleId: props.roleId //角色ID
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

        return () => (
            <n-element class="deploy-system-role-account h-full flex flex-col overflow-hidden">
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
            </n-element>
        )
    }
})
</script>
