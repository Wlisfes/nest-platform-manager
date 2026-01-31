<script lang="tsx">
import { defineComponent, Fragment } from 'vue'
import { useProvider, useColumnService } from '@/hooks'
import { fetchDialogService, fetchNotifyService } from '@/plugins'
import * as feedback from '@/components/deploy/hooks'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'DeploySystemResource',
    setup(props, ctx) {
        const { inverted } = useProvider()
        const { formRef, formState, state, fetchRequest, fetchRestore, fetchRefresh, fetchUpdateDatabase } = useColumnService({
            request: (base, payload) => Service.httpBaseSystemColumnSheetResource(payload),
            columns: [
                { title: '菜单名称', key: 'name', width: 180, check: true },
                { title: '图标', key: 'iconName', className: 'p-block-0!', width: 100, align: 'center', check: true },
                { title: '类型', key: 'chunk', width: 100, check: true },
                { title: '权限标识', key: 'keyName', minWidth: 240, check: true },
                { title: '路由地址', key: 'router', minWidth: 240, check: true },
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
                version: undefined, //版本号
                chunk: undefined, //类型
                status: undefined //状态
            }
        })

        /**新增、编辑菜单**/
        async function fetchDeploySheetResource(command: 'CREATE' | 'UPDATE', data: Omix = {}) {
            if (['CREATE'].includes(command)) {
                return await feedback.fetchDeploySystemResource({
                    node: data,
                    title: '新增菜单',
                    command: 'CREATE',
                    onSubmit: fetchRefresh
                })
            }
            return await feedback.fetchDeploySystemResource({
                node: data,
                title: '编辑菜单',
                command: 'UPDATE',
                onSubmit: fetchRefresh
            })
        }

        /**新增、编辑权限按钮**/
        async function fetchDeploySheetAuthorize(command: 'CREATE' | 'UPDATE', data: Omix = {}) {
            if (['CREATE'].includes(command)) {
                return await feedback.fetchDeploySystemSheet({
                    node: data,
                    title: '添加按钮',
                    command: 'CREATE',
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
            <layout-common-container>
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
                            onClick={(event: MouseEvent) => fetchDeploySheetResource('CREATE')}
                        ></common-element-button>
                        <common-element-button
                            content="添加按钮"
                            type="primary"
                            onClick={(event: MouseEvent) => fetchDeploySheetAuthorize('CREATE')}
                        ></common-element-button>
                    </common-database-search-function>
                    <common-database-search-column prop="name" label="菜单名称">
                        <n-input placeholder="请输入菜单名称" v-model:value={formState.value.name} />
                    </common-database-search-column>
                    <common-database-search-column prop="keyName" label="权限标识">
                        <n-input placeholder="请输入权限标识" v-model:value={formState.value.keyName} />
                    </common-database-search-column>
                    <common-database-search-column prop="router" label="菜单地址">
                        <n-input placeholder="请输入菜单地址" v-model:value={formState.value.router} />
                    </common-database-search-column>
                    <common-database-search-column prop="version" label="版本号">
                        <n-input placeholder="请输入版本号" v-model:value={formState.value.version} />
                    </common-database-search-column>
                    <common-database-search-column prop="status" label="状态">
                        <n-input placeholder="请输入状态" v-model:value={formState.value.status} />
                    </common-database-search-column>
                </common-database-search>
                <common-database-table
                    //show-select
                    //show-command
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

        // return () => (
        //     <layout-common-container ref={root} abstract class-name="p-12 gap-12 overflow-hidden">
        //         <common-database-compute
        //             title="菜单管理"
        //             element-class="flex-row-reverse justify-start"
        //             keys={['refresh', 'settings', 'size', 'full']}
        //             v-model:full={full.value}
        //             v-model:loading={state.loading}
        //             v-model:columns={state.columns}
        //             toggle={toggle}
        //             onRefresh={fetchRefresh}
        //             onCheckboxs={fetchCheckboxs}
        //         >
        //             <n-element class="flex gap-10 items-center">
        //                 <common-element-button
        //                     content="新增"
        //                     type="primary"
        //                     icon="nest-plus"
        //                     onClick={() => fetchCommand({ command: 'CREATE' })}
        //                 ></common-element-button>
        //                 <common-element-button
        //                     content="启用"
        //                     type="success"
        //                     disabled={state.rowKeys.length === 0}
        //                     onClick={() => fetchCommand({ command: 'SWITCH', status: 'enable', type: 'success', title: '启用' })}
        //                 ></common-element-button>
        //                 <common-element-button
        //                     content="禁用"
        //                     type="error"
        //                     disabled={state.rowKeys.length === 0}
        //                     onClick={() => fetchCommand({ command: 'SWITCH', status: 'disable', type: 'error', title: '禁用' })}
        //                 ></common-element-button>
        //             </n-element>
        //             <common-element-action
        //                 cols={2}
        //                 label-width="7.2em"
        //                 placeholder="请输入菜单名称、权限标识、路由地址"
        //                 v-model:initialize={state.initialize}
        //                 v-model:loading={state.loading}
        //                 v-model:event={state.event}
        //                 v-model:vague={form.value.vague}
        //                 onSubmit={() => fetchRefresh()}
        //             >
        //                 <common-database-search-column label="菜单名称">
        //                     <n-input v-model:value={form.value.name} placeholder="请输入菜单名称" clearable />
        //                 </common-database-search-column>
        //                 <common-database-search-column label="权限标识">
        //                     <n-input v-model:value={form.value.key} placeholder="请输入权限标识" clearable />
        //                 </common-database-search-column>
        //                 <common-database-search-column label="路由地址">
        //                     <n-input v-model:value={form.value.router} placeholder="请输入路由地址" clearable />
        //                 </common-database-search-column>
        //                 <common-database-search-column label="版本号">
        //                     <n-input v-model:value={form.value.version} placeholder="请输入版本号" clearable />
        //                 </common-database-search-column>
        //                 <common-database-search-column label="上级菜单">
        //                     <n-input v-model:value={form.value.pid} placeholder="请输入上级菜单" />
        //                 </common-database-search-column>
        //                 <common-database-search-column label="菜单状态">
        //                     <n-input v-model:value={form.value.status} placeholder="请输入状态" />
        //                 </common-database-search-column>
        //                 <common-database-search-column label="操作人">
        //                     <n-input v-model:value={form.value.uid} placeholder="请输入操作人" />
        //                 </common-database-search-column>
        //                 <common-database-search-column label="更新时间" style={{ 'grid-column': 'span 2 / span 2' }}>
        //                     <n-date-picker type="datetimerange" clearable default-time="13:22:11" class="w-full" />
        //                 </common-database-search-column>
        //             </common-element-action>
        //         </common-database-compute>
        //         <common-database-container element-table v-model:initialize={state.initialize} v-model:loading={state.loading}>
        //             <common-database-table
        //                 loading={state.loading}
        //                 data={state.dataSource}
        //                 v-model:columns={state.columns}
        //                 v-model:page={state.page}
        //                 v-model:size={state.size}
        //                 v-model:total={state.total}
        //                 v-model:row-keys={state.rowKeys}
        //                 v-model:row-nodes={state.rowNodes}
        //                 onUpdate:page={(page: number) => fetchRefresh()}
        //                 onUpdate:size={(size: number) => fetchRefresh({ page: 1 })}
        //             >
        //                 {{
        //                     iconName: (iconName: string) => {
        //                         return <common-database-chunk element="icon" icon-size={28} content={iconName}></common-database-chunk>
        //                     },
        //                     user: (data: Omix) => {
        //                         return <common-database-chunk element="text" content={data.name}></common-database-chunk>
        //                     },
        //                     typeChunk: (data: Omix) => {
        //                         return <common-database-chunk bordered content={data.name} json={data.json}></common-database-chunk>
        //                     },
        //                     statusChunk: (data: Omix) => {
        //                         return <common-database-chunk content={data.name} json={data.json}></common-database-chunk>
        //                     },
        //                     command: (node: Omix, base: Omix<{ center: boolean }>) => (
        //                         <n-element class="flex items-center gap-10 justify-center">
        //                             <common-element-button
        //                                 database
        //                                 text
        //                                 content="编辑"
        //                                 type="primary"
        //                                 icon="nest-edit"
        //                                 icon-size={16}
        //                                 onClick={() => fetchCommand({ node, command: 'UPDATE' })}
        //                             ></common-element-button>
        //                             <common-element-button
        //                                 database
        //                                 text
        //                                 content="删除"
        //                                 type="error"
        //                                 icon="nest-delete"
        //                                 icon-size={16}
        //                                 onClick={() => fetchCommand({ node, command: 'DELETE', type: 'error', title: '删除' })}
        //                             ></common-element-button>
        //                         </n-element>
        //                     )
        //                 }}
        //             </common-database-table>
        //         </common-database-container>
        //     </layout-common-container>
        // )
    }
})
</script>
