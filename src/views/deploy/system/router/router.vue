<script lang="tsx">
import { defineComponent } from 'vue'
import { useColumnService, fetchKineColumns } from '@/hooks/hook-service'
import { fetchDialogService, fetchNotifyService } from '@/plugins'
import * as feedback from '@/components/deploy/hooks'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'DeploySystemRouter',
    setup(props, ctx) {
        const { root, state, form, full, setState, toggle, fetchCheckboxs, fetchRefresh } = useColumnService({
            request: (data, base, opts) => Service.httpBaseSystemColumnRouter(opts.body),
            document: '菜单管理自定义表头',
            dynamic: 'base:deploy:system:router',
            form: {
                vague: undefined,
                name: undefined,
                key: undefined,
                router: undefined,
                version: undefined,
                pid: undefined,
                status: undefined,
                uid: undefined,
                startTime: undefined,
                endTime: undefined
            },
            columns: fetchKineColumns(true, [
                { title: '选择框', key: 'selection', type: 'selection', check: true },
                { title: '菜单名称', key: 'name', width: 180, check: true },
                { title: '图标', key: 'iconName', width: 100, align: 'center', check: true },
                { title: '类型', key: 'typeChunk', width: 100, align: 'center', check: true },
                { title: '权限标识', key: 'key', width: 240, check: true },
                { title: '路由地址', key: 'router', width: 240, check: true },
                { title: '排序号', key: 'sort', width: 100, align: 'center', check: true },
                { title: '状态', key: 'statusChunk', width: 100, align: 'center', check: true },
                { title: '更新人', key: 'user', width: 100, align: 'center', check: true },
                { title: '更新时间', key: 'modifyTime', width: 200, align: 'center', check: false }
            ])
        })

        /**操作指令回调函数**/
        async function fetchCommand(event: Omix) {
            if (event.command === 'CREATE') {
                return await feedback.fetchDeploySystemFeedbackRouter({
                    command: event.command,
                    title: '新增菜单',
                    onSubmit: () => fetchRefresh()
                })
            }
            if (event.command === 'UPDATE') {
                return await feedback.fetchDeploySystemFeedbackRouter({
                    command: event.command,
                    node: event.node,
                    title: '编辑菜单',
                    onSubmit: () => fetchRefresh()
                })
            }
            if (event.command === 'DELETE') {
                return await fetchDialogService({
                    type: event.type,
                    title: `${event.title}提示`,
                    content: `确定${event.title}当前所选菜单？`,
                    async onSubmit(done: Function) {
                        try {
                            await done({ loading: true })
                            return await Service.httpBaseSystemRouterDelete({ keyId: event.node.keyId }).then(async response => {
                                await done({ visible: false })
                                await fetchNotifyService({ title: response.message })
                                return await fetchRefresh()
                            })
                        } catch (err) {
                            return await done({ loading: false }).then(async () => {
                                return await fetchNotifyService({ type: 'error', title: err.message })
                            })
                        }
                    }
                })
            }
            if (event.command === 'SWITCH') {
                return await fetchDialogService({
                    type: event.type,
                    title: `${event.title}提示`,
                    content: `确定${event.title}当前所选菜单？`,
                    async onSubmit(done: Function) {
                        try {
                            await done({ loading: true })
                            return await Service.httpBaseSystemSwitchRouter({ status: event.status, keys: state.rowKeys }).then(
                                async response => {
                                    await done({ visible: false })
                                    await fetchNotifyService({ title: response.message })
                                    return await fetchRefresh()
                                }
                            )
                        } catch (err) {
                            return await done({ loading: false }).then(async () => {
                                return await fetchNotifyService({ type: 'error', title: err.message })
                            })
                        }
                    }
                })
            }
        }

        return () => (
            <layout-common-container ref={root} abstract class="absolute inset-0 p-12" class-name="p-12 gap-12 overflow-hidden">
                <common-database-compute
                    element-class="flex-row-reverse justify-between"
                    keys={['refresh', 'settings', 'size', 'full']}
                    v-model:full={full.value}
                    v-model:loading={state.loading}
                    v-model:columns={state.columns}
                    toggle={toggle}
                    onRefresh={fetchRefresh}
                    onCheckboxs={fetchCheckboxs}
                >
                    <n-element class="flex gap-10 items-center">
                        <common-element-button
                            content="新增"
                            type="primary"
                            icon="nest-plus"
                            onClick={() => fetchCommand({ command: 'CREATE' })}
                        ></common-element-button>
                        <common-element-button
                            content="启用"
                            type="success"
                            disabled={state.rowKeys.length === 0}
                            onClick={() => fetchCommand({ command: 'SWITCH', status: 'enable', type: 'success', title: '启用' })}
                        ></common-element-button>
                        <common-element-button
                            content="禁用"
                            type="error"
                            disabled={state.rowKeys.length === 0}
                            onClick={() => fetchCommand({ command: 'SWITCH', status: 'disable', type: 'error', title: '禁用' })}
                        ></common-element-button>
                    </n-element>
                    <common-element-action
                        label-width="7.2em"
                        cols={2}
                        v-model:initialize={state.initialize}
                        v-model:loading={state.loading}
                        v-model:event={state.event}
                        v-model:vague={form.value.vague}
                        onSubmit={() => fetchRefresh()}
                    >
                        <n-form-item label="菜单名称">
                            <n-input v-model:value={form.value.name} placeholder="请输入菜单名称" clearable />
                        </n-form-item>
                        <n-form-item label="权限标识">
                            <n-input v-model:value={form.value.key} placeholder="请输入权限标识" clearable />
                        </n-form-item>
                        <n-form-item label="路由地址">
                            <n-input v-model:value={form.value.router} placeholder="请输入路由地址" clearable />
                        </n-form-item>
                        <n-form-item label="版本号">
                            <n-input v-model:value={form.value.version} placeholder="请输入版本号" clearable />
                        </n-form-item>
                        <n-form-item label="上级菜单">
                            <n-input v-model:value={form.value.pid} placeholder="请输入上级菜单" />
                        </n-form-item>
                        <n-form-item label="菜单状态">
                            <n-input v-model:value={form.value.status} placeholder="请输入状态" />
                        </n-form-item>
                        <n-form-item label="操作人">
                            <n-input v-model:value={form.value.uid} placeholder="请输入操作人" />
                        </n-form-item>
                        <n-form-item label="更新时间" style={{ 'grid-column': 'span 2 / span 2' }}>
                            <n-date-picker type="datetimerange" clearable default-time="13:22:11" class="w-full" />
                        </n-form-item>
                    </common-element-action>
                </common-database-compute>
                <common-database-container element-table v-model:initialize={state.initialize} v-model:loading={state.loading}>
                    <common-database-table
                        loading={state.loading}
                        data={state.dataSource}
                        v-model:columns={state.columns}
                        v-model:page={state.page}
                        v-model:size={state.size}
                        v-model:total={state.total}
                        v-model:row-keys={state.rowKeys}
                        v-model:row-nodes={state.rowNodes}
                        onUpdate:page={(page: number) => fetchRefresh()}
                        onUpdate:size={(size: number) => fetchRefresh({ page: 1 })}
                    >
                        {{
                            iconName: (iconName: string) => {
                                return <common-database-chunk element="icon" icon-size={28} content={iconName}></common-database-chunk>
                            },
                            user: (data: Omix) => {
                                return <common-database-chunk element="text" content={data.name}></common-database-chunk>
                            },
                            typeChunk: (data: Omix) => {
                                return <common-database-chunk bordered content={data.name} json={data.json}></common-database-chunk>
                            },
                            statusChunk: (data: Omix) => {
                                return <common-database-chunk content={data.name} json={data.json}></common-database-chunk>
                            },
                            command: (node: Omix, base: Omix<{ center: boolean }>) => (
                                <n-element class="flex items-center gap-10 justify-center">
                                    <common-element-button
                                        database
                                        text
                                        content="编辑"
                                        type="primary"
                                        icon="nest-edit"
                                        icon-size={16}
                                        onClick={() => fetchCommand({ node, command: 'UPDATE' })}
                                    ></common-element-button>
                                    <common-element-button
                                        database
                                        text
                                        content="删除"
                                        type="error"
                                        icon="nest-delete"
                                        icon-size={16}
                                        onClick={() => fetchCommand({ node, command: 'DELETE', type: 'error', title: '删除' })}
                                    ></common-element-button>
                                </n-element>
                            )
                        }}
                    </common-database-table>
                </common-database-container>
            </layout-common-container>
        )
    }
})
</script>
