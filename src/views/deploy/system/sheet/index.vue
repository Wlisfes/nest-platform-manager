<script lang="tsx">
import { defineComponent } from 'vue'
import { useChunkService, useColumnService, useSelectService } from '@/hooks'
import { fetchDialogService, fetchNotifyService } from '@/plugins'
import { isEmpty } from '@/utils'
import * as feedback from '@/components/deploy/hooks'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'DeploySystemSheet',
    setup(props, ctx) {
        /**菜单树结构**/
        const sheetOptions = useSelectService(Service.httpBaseSystemTreeSheetResource)
        /**通用字典枚举**/
        const chunkOptions = useChunkService({ type: ['CHUNK_WINDOWS_RESOUREC_STATUS', 'CHUNK_WINDOWS_SHEET_CHUNK'] })
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
                name: undefined, //菜单名称
                keyName: undefined, //权限标识
                pid: undefined, //父级ID
                router: undefined, //菜单地址
                version: undefined //版本号
            }
        })

        /**添加菜单**/
        async function fetchDeploySheetCreateResource() {
            return await feedback.fetchDeploySystemSheetResource({
                title: '新增菜单',
                command: 'CREATE',
                onSubmit: fetchRefresh
            })
        }

        /**添加按钮**/
        async function fetchDeploySheetCreateAuthorize() {
            return await feedback.fetchDeploySystemSheetAuthorize({
                title: '添加按钮',
                command: 'CREATE',
                onSubmit: fetchRefresh
            })
        }

        /**编辑菜单、按钮**/
        async function fetchDeploySheetUpdate(data: Omix) {
            if (['resource'].includes(data.chunk)) {
                return await feedback.fetchDeploySystemSheetResource({
                    node: data,
                    title: '编辑菜单',
                    command: 'UPDATE',
                    onSubmit: fetchRefresh
                })
            }
            return await feedback.fetchDeploySystemSheetAuthorize({
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
                        col_iconName: (data: Omix) => (
                            <div class="flex items-center justify-center">
                                {isEmpty(data.iconName) ? (
                                    <span>-</span>
                                ) : (
                                    <common-element-icon size={26} name={data.iconName}></common-element-icon>
                                )}
                            </div>
                        ),
                        col_createBy: (data: Omix) => (
                            <common-database-table-user element="text" data={data.createBy}></common-database-table-user>
                        ),
                        col_modifyBy: (data: Omix) => (
                            <common-database-table-user element="text" data={data.modifyBy}></common-database-table-user>
                        ),
                        col_chunk: (data: Omix) => (
                            <common-database-table-chunk
                                element="chunk"
                                value={data.chunk}
                                options={chunkOptions.CHUNK_WINDOWS_SHEET_CHUNK.value}
                            ></common-database-table-chunk>
                        ),
                        col_status: (data: Omix) => (
                            <common-database-table-chunk
                                element="chunk"
                                value={data.status}
                                options={chunkOptions.CHUNK_WINDOWS_RESOUREC_STATUS.value}
                            ></common-database-table-chunk>
                        ),
                        col_command: (data: Omix) => (
                            <div class="flex items-center gap-col-8 overflow-hidden">
                                <common-element-button text type="primary" onClick={() => fetchDeploySheetUpdate(data)}>
                                    编辑
                                </common-element-button>
                                {/* <common-element-button text type="primary">
                                    {['enable'].includes(data.status) ? '禁用' : '启用'}
                                </common-element-button> */}
                                <common-element-button text type="error">
                                    删除
                                </common-element-button>
                            </div>
                        )
                    }}
                </common-database-table>
            </layout-common-container>
        )
    }
})
</script>
