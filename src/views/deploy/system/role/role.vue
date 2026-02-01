<script lang="tsx">
import { defineComponent } from 'vue'
import { useChunkService, useColumnService, useSelectService } from '@/hooks'
import { fetchDialogService, fetchNotifyService } from '@/plugins'
import { isEmpty } from '@/utils'
import * as feedback from '@/components/deploy/hooks'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'DeploySystemRole',
    setup(props, ctx) {
        /**表格实例**/
        const { formRef, formState, state, fetchRequest, fetchRestore, fetchRefresh, fetchUpdateDatabase } = useColumnService({
            request: (base, payload) => Service.httpBaseSystemColumnSheetResource(payload),
            columns: [
                { title: '菜单名称', key: 'name', width: 180, check: true },
                { title: '图标', key: 'iconName', align: 'center', className: 'p-block-0!', width: 100, check: true },
                { title: '类型', key: 'chunk', align: 'center', width: 100, check: true },
                { title: '权限标识', key: 'keyName', minWidth: 200, check: true },
                { title: '路由地址', key: 'router', minWidth: 200, check: true },
                { title: '版本号', key: 'version', align: 'center', width: 100, check: true },
                { title: '排序号', key: 'sort', align: 'center', width: 100, check: true },
                { title: '状态', key: 'status', align: 'center', width: 100, check: true },
                { title: '创建人', key: 'createBy', width: 120, check: true },
                { title: '创建时间', key: 'createTime', width: 160, check: true },
                { title: '更新人', key: 'modifyBy', width: 120, check: true },
                { title: '更新时间', key: 'modifyTime', width: 160, check: true }
            ],
            formState: {
                name: undefined, //角色名称
                keyName: undefined, //权限标识
                pid: undefined, //父级ID
                router: undefined, //菜单地址
                version: undefined //版本号
            }
        })

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
                    on-update:database={fetchUpdateDatabase}
                    onRestore={fetchRestore}
                    onSubmit={fetchRequest}
                >
                    <common-database-search-column prop="name" label="角色名称">
                        <form-common-column-input
                            clearable
                            placeholder="请输入角色名称"
                            v-model:value={formState.value.name}
                            on-submit={fetchRefresh}
                        />
                    </common-database-search-column>
                </common-database-search>
                <common-database-table
                    show-command
                    show-settings
                    total={state.total}
                    columns={state.columns}
                    v-model:data={state.dataSource}
                    v-model:page={state.page}
                    v-model:size={state.size}
                    v-model:items={state.items}
                    v-model:select={state.select}
                    v-model:loading={state.loading}
                    onUpdate:page={(page: number) => fetchRefresh()}
                    onUpdate:size={(size: number) => fetchRefresh({ page: 1 })}
                ></common-database-table>
            </layout-common-container>
        )
    }
})
</script>
