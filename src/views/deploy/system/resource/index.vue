<script lang="tsx">
import { defineComponent } from 'vue'
import { useProvider, useColumnService } from '@/hooks'
import { fetchDialogService, fetchNotifyService } from '@/plugins'
import * as feedback from '@/components/deploy/hooks'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'DeploySystemResource',
    setup(props, ctx) {
        const { inverted } = useProvider()
        const { formRef, formState, state, fetchRequest, fetchRestore, fetchRefresh, fetchUpdateDatabase } = useColumnService({
            request: (data, base, e) => Service.httpBaseSystemColumnResource(e.body),
            formState: {
                withStartTime: undefined,
                withEndTime: undefined,
                startTime: undefined,
                endTime: undefined,
                supplierCode: undefined,
                supplierName: undefined,
                email: undefined,
                alias: undefined,
                staffId: undefined,
                deptId: undefined
            },
            columns: [
                { title: '选择框', key: 'selection', type: 'selection', width: 40, check: true },
                { title: '菜单名称', key: 'name', width: 180, check: true },
                { title: '图标', key: 'icon', width: 100, align: 'center', check: true },
                { title: '权限标识', key: 'key', width: 200, check: true },
                { title: '路由地址', key: 'router', minWidth: 200, check: true },
                { title: '排序号', key: 'sort', width: 100, align: 'center', check: true },
                { title: '状态', key: 'statusChunk', width: 100, align: 'center', check: true },
                { title: '更新人', key: 'user', width: 130, align: 'center', check: true },
                {
                    title: '更新时间',
                    key: 'modifyTime',
                    width: 180,
                    check: false

                    //colSpan: () => 2
                }
                // {
                //     key: 'show-settings',
                //     fixed: 'right',
                //     colSpan: () => 0,
                //     width: 38,
                //     title: () => <common-database-table-settings></common-database-table-settings>
                // }
            ]
            // database: [
            //     { uid: 174, prop: 'withStartTime', label: '最近跟进时间', check: true },
            //     { uid: 193, prop: 'startTime', label: '创建时间', check: true },
            //     { uid: 212, prop: 'supplierCode', label: '供应商编码', check: false },
            //     { uid: 216, prop: 'supplierName', label: '供应商名称', check: false },
            //     { uid: 220, prop: 'email', label: '邮箱', check: false },
            //     { uid: 224, prop: 'alias', label: '账号别名', check: true },
            //     { uid: 228, prop: 'staffId', label: '归属人', check: true },
            //     { uid: 232, prop: 'deptId', label: '归属人部门', check: true }
            // ]
        })

        /**新增菜单**/
        async function fetchDeployCreateResource() {
            return await feedback.fetchDeploySystemResource({
                title: '新增菜单',
                command: 'CREATE',
                onSubmit: fetchRefresh
            })
        }

        // const { root, state, form, full, toggle, fetchCheckboxs, fetchRefresh } = useColumnService({
        //     request: (data, base, options) => Service.httpBaseSystemColumnResource(options.body),
        //     document: '菜单管理自定义表头',
        //     dynamic: 'base:deploy:system:router',
        //     form: {
        //         vague: undefined,
        //         name: undefined,
        //         key: undefined,
        //         router: undefined,
        //         version: undefined,
        //         pid: undefined,
        //         status: undefined,
        //         uid: undefined,
        //         startTime: undefined,
        //         endTime: undefined
        //     },
        //     columns: fetchKineColumns(true, [
        //         { title: '选择框', key: 'selection', type: 'selection', check: true },
        //         { title: '菜单名称', key: 'name', width: 180, check: true },
        //         { title: '图标', key: 'icon', width: 100, align: 'center', check: true },
        //         { title: '权限标识', key: 'key', width: 200, check: true },
        //         { title: '路由地址', key: 'router', width: 200, check: true },
        //         { title: '排序号', key: 'sort', width: 100, align: 'center', check: true },
        //         { title: '状态', key: 'statusChunk', width: 100, align: 'center', check: true },
        //         { title: '更新人', key: 'user', width: 130, align: 'center', check: true },
        //         { title: '更新时间', key: 'modifyTime', width: 180, check: false }
        //     ])
        // })

        // /**操作指令回调函数**/
        // async function fetchCommand(event: Omix) {
        //     if (event.command === 'CREATE') {
        //         return await feedback.fetchDeploySystemFeedbackRouter({
        //             command: event.command,
        //             title: '新增菜单',
        //             onSubmit: () => fetchRefresh()
        //         })
        //     }
        //     if (event.command === 'UPDATE') {
        //         return await feedback.fetchDeploySystemFeedbackRouter({
        //             command: event.command,
        //             node: event.node,
        //             title: '编辑菜单',
        //             onSubmit: () => fetchRefresh()
        //         })
        //     }
        //     if (event.command === 'DELETE') {
        //         return await fetchDialogService({
        //             type: event.type,
        //             title: `${event.title}提示`,
        //             content: `确定${event.title}当前所选菜单？`,
        //             async onSubmit(done: Function) {
        //                 try {
        //                     await done({ loading: true })
        //                     return await Service.httpBaseSystemRouterDelete({ keyId: event.node.keyId }).then(async response => {
        //                         await done({ visible: false })
        //                         await fetchNotifyService({ title: response.message })
        //                         return await fetchRefresh()
        //                     })
        //                 } catch (err) {
        //                     return await done({ loading: false }).then(async () => {
        //                         return await fetchNotifyService({ type: 'error', title: err.message })
        //                     })
        //                 }
        //             }
        //         })
        //     }
        //     if (event.command === 'SWITCH') {
        //         return await fetchDialogService({
        //             type: event.type,
        //             title: `${event.title}提示`,
        //             content: `确定${event.title}当前所选菜单？`,
        //             async onSubmit(done: Function) {
        //                 try {
        //                     await done({ loading: true })
        //                     return await Service.httpBaseSystemSwitchRouter({ status: event.status, keys: state.rowKeys }).then(
        //                         async response => {
        //                             await done({ visible: false })
        //                             await fetchNotifyService({ title: response.message })
        //                             return await fetchRefresh()
        //                         }
        //                     )
        //                 } catch (err) {
        //                     return await done({ loading: false }).then(async () => {
        //                         return await fetchNotifyService({ type: 'error', title: err.message })
        //                     })
        //                 }
        //             }
        //         })class="p-16 gap-16 overflow-hidden"
        //     }
        // }

        // <common-database-search-column label="对接方式">
        //     <n-input placeholder="Input" v-model:value={formState.value.name} />
        // </common-database-search-column>
        // <common-database-search-column label="R端签约主体">
        //     <n-input placeholder="Input" v-model:value={formState.value.name} />
        // </common-database-search-column>
        // <common-database-search-column label="国家/地区">
        //     <n-input placeholder="Input" v-model:value={formState.value.name} />
        // </common-database-search-column>
        // <common-database-search-column label="区域">
        //     <n-input placeholder="Input" v-model:value={formState.value.name} />
        // </common-database-search-column>
        // <common-database-search-column label="来源">
        //     <n-input placeholder="Input" v-model:value={formState.value.name} />
        // </common-database-search-column>
        // <common-database-search-column label="来源标签">
        //     <n-input placeholder="Input" v-model:value={formState.value.name} />
        // </common-database-search-column>
        // <common-database-search-column label="等级">
        //     <n-input placeholder="Input" v-model:value={formState.value.name} />
        // </common-database-search-column>
        // <common-database-search-column label="标签">
        //     <n-input placeholder="Input" v-model:value={formState.value.name} />
        // </common-database-search-column>

        return () => (
            <layout-common-container>
                <common-database-search
                    function-class="justify-end"
                    function={['search', 'restore', 'collapse', 'deploy']}
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
                    <common-database-search-function>
                        <common-element-button
                            content="新增"
                            type="primary"
                            icon="nest-plus"
                            onClick={fetchDeployCreateResource}
                        ></common-element-button>
                    </common-database-search-function>
                    <common-database-search-column prop="withStartTime" label="最近跟进时间" span={2}>
                        <n-date-picker class="w-full" type="datetimerange" clearable default-time={['13:22:11', '16:00:00']} />
                    </common-database-search-column>
                    <common-database-search-column prop="startTime" label="创建时间" span={2}>
                        <n-date-picker class="w-full" type="datetimerange" clearable default-time={['13:22:11', '16:00:00']} />
                    </common-database-search-column>
                    <common-database-search-column prop="supplierCode" label="供应商编码">
                        <n-input placeholder="Input" v-model:value={formState.value.supplierCode} />
                    </common-database-search-column>
                    <common-database-search-column prop="supplierName" label="供应商名称" v-model:value={formState.value.supplierName}>
                        <n-input placeholder="Input" v-model:value={formState.value.supplierName} />
                    </common-database-search-column>
                    <common-database-search-column prop="email" label="邮箱" v-model:value={formState.value.email}>
                        <n-input placeholder="Input" v-model:value={formState.value.name} />
                    </common-database-search-column>
                    <common-database-search-column prop="alias" label="账号别名" v-model:value={formState.value.alias}>
                        <n-input placeholder="Input" v-model:value={formState.value.alias} />
                    </common-database-search-column>
                    <common-database-search-column prop="staffId" label="归属人" v-model:value={formState.value.staffId}>
                        <n-input placeholder="Input" v-model:value={formState.value.staffId} />
                    </common-database-search-column>
                    <common-database-search-column prop="deptId" label="归属人部门" v-model:value={formState.value.deptId}>
                        <n-input placeholder="Input" v-model:value={formState.value.deptId} />
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
                        col_command: (e: Omix) => {
                            return (
                                <div class="flex items-center gap-col-10 overflow-hidden">
                                    {e.keyId > 1 && (
                                        <common-element-button
                                            text
                                            content="编辑"
                                            type="primary"
                                            onClick={fetchDeployCreateResource}
                                        ></common-element-button>
                                    )}
                                    {e.keyId > 2 && (
                                        <common-element-button
                                            text
                                            content="编辑菜单"
                                            type="primary"
                                            onClick={fetchDeployCreateResource}
                                        ></common-element-button>
                                    )}
                                    {e.keyId > 3 && (
                                        <common-element-button
                                            text
                                            content="编辑菜单状态"
                                            type="primary"
                                            onClick={fetchDeployCreateResource}
                                        ></common-element-button>
                                    )}
                                    {e.keyId > 4 && (
                                        <common-element-button
                                            text
                                            content="编辑菜单显示状态"
                                            type="primary"
                                            onClick={fetchDeployCreateResource}
                                        ></common-element-button>
                                    )}
                                </div>
                            )
                        }
                    }}
                </common-database-table>
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
