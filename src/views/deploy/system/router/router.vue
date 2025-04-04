<script lang="tsx">
import { defineComponent } from 'vue'
import { useColumnService } from '@/hooks/hook-service'
import { fetchDialogService, fetchNotifyService } from '@/plugins'
import * as feedback from '@/components/deploy/hooks'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'DeploySystemRouter',
    setup(props, ctx) {
        const { state, form, setState, fetchRefresh } = useColumnService({
            request: (data, base, opts) => Service.httpBaseColumnSystemRouter(opts.body),
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
            columns: [
                { type: 'selection' },
                { title: '菜单名称', key: 'name', width: 180 },
                { title: '图标', key: 'iconName', width: 80, align: 'center' },
                { title: '类型', key: 'typeChunk', width: 90, align: 'center' },
                { title: '路由地址', key: 'router', minWidth: 240 },
                { title: '权限标识', key: 'key', minWidth: 240 },
                { title: '排序号', key: 'sort', width: 80, align: 'center' },
                { title: '状态', key: 'statusChunk', width: 90, align: 'center' },
                { title: '更新人', key: 'user', width: 100, align: 'center' },
                { title: '更新时间', key: 'modifyTime', width: 200, align: 'center' }
            ]
        })

        /**新增菜单**/
        async function fetchCreateDeploySystemFeedbackRouter() {
            return await feedback.fetchDeploySystemFeedbackRouter({
                title: '新增菜单',
                command: 'CREATE',
                onSubmit: () => fetchRefresh()
            })
        }

        /**编辑菜单**/
        async function fetchUpdateDeploySystemFeedbackRouter(data: Omix = {}) {
            return await feedback.fetchDeploySystemFeedbackRouter({
                title: '编辑菜单',
                command: 'UPDATE',
                node: data,
                onSubmit: () => fetchRefresh()
            })
        }

        /**删除菜单**/
        async function httpBaseDeleteSystemRouter(data: Omix) {
            return await fetchDialogService({
                title: '提示',
                type: 'warning',
                content: (
                    <n-element>
                        <common-content-text depth={2}>此操作将删除</common-content-text>
                        <common-content-text class="m-inline-5" type="error" text={`"${data.name}"`}></common-content-text>
                        <common-content-text depth={2}>是否继续？</common-content-text>
                    </n-element>
                ),
                async onSubmit(done: Function) {
                    try {
                        await done({ loading: true })
                        return await Service.httpBaseDeleteSystemRouter({ keyId: data.keyId }).then(async ({ message }) => {
                            await done({ visible: false })
                            await fetchNotifyService({ title: message })
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

        /**编辑菜单状态**/
        async function fetchBaseUpdateStateSystemRouter(data: Omix) {
            return await fetchDialogService({
                title: '提示',
                type: data.type,
                content: (
                    <n-element>
                        <common-content-text depth={2}>{`此操作将${data.name}选中`}</common-content-text>
                        <common-content-text class="m-inline-5" type={data.type} text={state.rowKeys.length}></common-content-text>
                        <common-content-text depth={2}>条数据，是否继续？</common-content-text>
                    </n-element>
                ),
                async onSubmit(done: Function) {
                    try {
                        await done({ loading: true })
                        return await Service.httpBaseUpdateStateSystemRouter({
                            status: data.status,
                            keys: state.rowKeys
                        }).then(async ({ message }) => {
                            await done({ visible: false })
                            await fetchNotifyService({ title: message })
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

        return () => (
            <layout-common-container class="absolute inset-0 p-12" class-name="p-12 gap-12 overflow-hidden">
                <n-element class="flex flex-row-reverse justify-between gap-10">
                    <n-flex size={[10, 10]}>
                        <common-element-button
                            content="新增"
                            type="primary"
                            icon="nest-plus"
                            secondary
                            onClick={fetchCreateDeploySystemFeedbackRouter}
                        ></common-element-button>
                        <common-element-button
                            content="启用"
                            type="success"
                            secondary
                            disabled={state.rowKeys.length === 0}
                            onClick={() => fetchBaseUpdateStateSystemRouter({ type: 'success', status: 'enable', name: '启用' })}
                        ></common-element-button>
                        <common-element-button
                            content="禁用"
                            type="error"
                            secondary
                            disabled={state.rowKeys.length === 0}
                            onClick={() => fetchBaseUpdateStateSystemRouter({ type: 'warning', status: 'disable', name: '禁用' })}
                        ></common-element-button>
                    </n-flex>
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
                </n-element>
                <common-element-resize element-table>
                    <common-database-table
                        command
                        remote
                        fixed-center
                        flex-height
                        fixed="right"
                        scroll-x={1480}
                        loading={state.loading}
                        columns={state.columns}
                        data={state.dataSource}
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
                            command: (data: Omix, base: Omix<{ center: boolean }>) => (
                                <n-element class="flex items-center gap-10 justify-center">
                                    <common-element-button type="primary" text onClick={() => fetchUpdateDeploySystemFeedbackRouter(data)}>
                                        编辑
                                    </common-element-button>
                                    <common-element-button type="error" text onClick={() => httpBaseDeleteSystemRouter(data)}>
                                        删除
                                    </common-element-button>
                                </n-element>
                            )
                        }}
                    </common-database-table>
                </common-element-resize>
            </layout-common-container>
        )
    }
})
</script>
