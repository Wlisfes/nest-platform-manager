<script lang="tsx">
import { defineComponent } from 'vue'
import { useColumnService } from '@/hooks/hook-service'
import * as utils from '@/utils/utils-common'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'DeploySystemResource',
    setup(props, ctx) {
        const { state, form, fetchRefresh } = useColumnService({
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
                { title: '菜单名称', key: 'name', width: 180 },
                { title: '图标', key: 'iconName', width: 60, align: 'center' },
                { title: '类型', key: 'type', width: 80, align: 'center' },
                { title: '路由地址', key: 'router', minWidth: 240 },
                { title: '权限标识', key: 'key', minWidth: 240 },
                { title: '排序号', key: 'sort', width: 80, align: 'center' },
                { title: '状态', key: 'status', width: 90, align: 'center' },
                { title: '更新时间', key: 'modifyTime', width: 200, align: 'center' },
                { title: '更新人', key: 'user', width: 100, align: 'center' }
                // { title: '操作', key: 'command', width: 100, align: 'center', colSpan: () => 2 },
                // {
                //     title: () => <common-element-chunk element="icon" icon-size={22} content="nest-settings"></common-element-chunk>,
                //     key: 'settings',
                //     width: 46
                // }
            ]
        })

        return () => (
            <layout-common-container class="absolute inset-0 p-12" class-name="p-12 gap-12 overflow-hidden">
                <n-element class="flex gap-12 overflow-hidden justify-between">
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
                        flex-height
                        scroll-x={1440}
                        loading={state.loading}
                        columns={state.columns}
                        data={state.dataSource}
                        v-model:page={state.page}
                        v-model:size={state.size}
                        v-model:total={state.total}
                        onUpdate:page={(page: number) => fetchRefresh()}
                        onUpdate:size={(size: number) => fetchRefresh({ page: 1 })}
                    >
                        {{
                            iconName: (name: string) => {
                                return <common-element-chunk element="icon" icon-size={28} content={name}></common-element-chunk>
                            },
                            user: (data: Omix) => {
                                return <common-element-chunk element="text" content={data.name}></common-element-chunk>
                            },
                            type: (data: Omix) => {
                                return <common-element-chunk bordered content={data.name} json={data.json}></common-element-chunk>
                            },
                            status: (data: Omix) => {
                                return <common-element-chunk content={data.name} json={data.json}></common-element-chunk>
                            },
                            command: (data: Omix) => <common-element-command></common-element-command>
                        }}
                    </common-database-table>
                </common-element-resize>
            </layout-common-container>
        )
    }
})
</script>
