<script lang="tsx">
import { defineComponent, Fragment } from 'vue'
import { useProvider, useColumnService, useSelectService } from '@/hooks'
import { fetchDialogService, fetchNotifyService } from '@/plugins'
import * as feedback from '@/components/deploy/hooks'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'DeploySystemSheet',
    setup(props, ctx) {
        /**菜单树结构**/
        const sheetOptions = useSelectService(Service.httpBaseSystemTreeSheetResource)
        /**表格实例**/
        const { formRef, formState, state, fetchRequest, fetchRestore, fetchRefresh, fetchUpdateDatabase } = useColumnService({
            request: (base, payload) => Service.httpBaseSystemColumnSheetResource(payload),
            columns: [
                { title: '菜单名称', key: 'name', width: 180, check: true },
                { title: '图标', key: 'iconName', className: 'p-block-0!', width: 100, align: 'center', check: true },
                { title: '类型', key: 'chunk', width: 100, check: true },
                { title: '权限标识', key: 'keyName', minWidth: 240, check: true },
                { title: '路由地址', key: 'router', minWidth: 240, check: true },
                { title: '版本号', key: 'version', width: 100, check: true },
                { title: '排序号', key: 'sort', width: 100, check: true },
                { title: '状态', key: 'statusChunk', width: 100, check: true },
                { title: '创建人', key: 'createBy', width: 130, check: true },
                { title: '创建时间', key: 'createTime', width: 160, check: true },
                { title: '更新人', key: 'modifyBy', width: 130, check: true },
                { title: '更新时间', key: 'modifyTime', width: 160, check: true }
            ],
            formState: {
                name: undefined, //菜单名称
                keyName: undefined, //权限标识
                pid: undefined, //父级ID
                router: undefined, //菜单地址
                version: undefined //版本号
            }
        })

        /**添加菜单**/
        async function fetchDeploySheetCreateResource() {
            return await feedback.fetchDeploySystemResource({
                title: '新增菜单',
                command: 'CREATE',
                onSubmit: fetchRefresh
            })
        }

        /**添加按钮**/
        async function fetchDeploySheetCreateAuthorize() {
            return await feedback.fetchDeploySystemSheet({
                title: '添加按钮',
                command: 'CREATE',
                onSubmit: fetchRefresh
            })
        }

        /**编辑菜单、按钮**/
        async function fetchDeploySheetUpdate(data: Omix) {
            if (['resource'].includes(data.chunk)) {
                return await feedback.fetchDeploySystemResource({
                    node: data,
                    title: '编辑菜单',
                    command: 'UPDATE',
                    onSubmit: fetchRefresh
                })
            }
            return await feedback.fetchDeploySystemSheet({
                node: data,
                title: '编辑按钮',
                command: 'UPDATE',
                onSubmit: fetchRefresh
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
                    on-update:database={fetchUpdateDatabase}
                    onRestore={fetchRestore}
                    onSubmit={fetchRequest}
                >
                    <common-database-search-function abstract class="flex gap-col-10">
                        <common-element-button
                            content="添加菜单"
                            type="primary"
                            onClick={fetchDeploySheetCreateResource}
                        ></common-element-button>
                        <common-element-button
                            content="添加按钮"
                            type="primary"
                            onClick={fetchDeploySheetCreateAuthorize}
                        ></common-element-button>
                    </common-database-search-function>
                    <common-database-search-column prop="name" label="菜单名称">
                        <form-common-column-input
                            clearable
                            placeholder="请输入菜单名称"
                            v-model:value={formState.value.name}
                            on-submit={fetchRefresh}
                        />
                    </common-database-search-column>
                    <common-database-search-column prop="keyName" label="权限标识">
                        <form-common-column-input
                            clearable
                            placeholder="请输入权限标识"
                            v-model:value={formState.value.keyName}
                            on-submit={fetchRefresh}
                        />
                    </common-database-search-column>
                    <common-database-search-column prop="pid" label="父级菜单">
                        <form-common-column-tree-select
                            clearable
                            options={sheetOptions.dataSource.value}
                            v-model:value={formState.value.pid}
                            on-change:value={fetchRefresh}
                        />
                    </common-database-search-column>
                    <common-database-search-column prop="router" label="菜单地址">
                        <form-common-column-input
                            clearable
                            placeholder="请输入菜单地址"
                            v-model:value={formState.value.router}
                            on-submit={fetchRefresh}
                        />
                    </common-database-search-column>
                    <common-database-search-column prop="version" label="版本号">
                        <form-common-column-input
                            clearable
                            placeholder="请输入版本号"
                            v-model:value={formState.value.version}
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
                >
                    {{
                        col_command: (data: Omix) => (
                            <div class="flex items-center gap-col-8 overflow-hidden">
                                <common-element-button
                                    text
                                    type="primary"
                                    content="编辑"
                                    onClick={() => fetchDeploySheetUpdate(data)}
                                ></common-element-button>
                                <common-element-button text type="error" content="删除"></common-element-button>
                            </div>
                        )
                    }}
                </common-database-table>
            </layout-common-container>
        )
    }
})
</script>
