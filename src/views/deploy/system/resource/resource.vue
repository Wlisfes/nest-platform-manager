<script lang="tsx">
import { defineComponent } from 'vue'
import { useColumnService } from '@/hooks/hook-service'
import * as utils from '@/utils/utils-common'
import * as Service from '@/api/instance.service'
import { UseElementSize } from '@vueuse/components'

export default defineComponent({
    name: 'DeploySystemResource',
    components: { UseElementSize },
    setup(props, ctx) {
        const { state, form, fetchRefresh } = useColumnService({
            request: (data, base) => Service.httpBaseColumnSystemRouter(utils.fetchBaseWhere(data, base)),
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
                { title: '菜单名称', key: 'name', width: 200 },
                { title: '图标', key: 'iconName', width: 80, align: 'center' },
                { title: '类型', key: 'type', width: 100, align: 'center' },
                { title: '路由地址', key: 'router', minWidth: 260 },
                { title: '权限标识', key: 'key', minWidth: 260 },
                { title: '排序号', key: 'sort', width: 80, align: 'center' },
                { title: '状态', key: 'status', width: 100, align: 'center' },
                { title: '更新时间', key: 'modifyTime', width: 200, align: 'center' },
                { title: '更新人', key: 'user', width: 120, align: 'center' },
                { title: '操作', key: 'command', width: 150, align: 'center' }
            ]
        })

        return () => (
            <layout-common-container class="flex flex-col flex-1 p-inline-12 p-block-12" class-name="p-inline-12 p-block-12 gap-10">
                <n-element class="flex gap-10">
                    <div class="flex-1">
                        <n-h1 class="m-0 text-16 line-height-34">资源管理</n-h1>
                    </div>
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
                <use-element-size
                    class="flex-1 overflow-hidden"
                    v-slots={{
                        default: ({ width, height }: Omix<{ width: number; height: number }>) => (
                            <common-data-table
                                bordered
                                bottom-bordered
                                remote
                                //max-height={200}
                                scroll-x={1600}
                                loading={state.loading}
                                columns={state.columns}
                                data={state.dataSource}
                            >
                                {{
                                    iconName: (data: Omix) => (
                                        <div class="flex items-center justify-center">
                                            <common-icon class="flex-inline" size={28} name={data.iconName}></common-icon>
                                        </div>
                                    ),
                                    type: (data: Omix) => (
                                        <n-tag bordered={false} type="success">
                                            的撒
                                        </n-tag>
                                    ),
                                    user: (data: Omix) => data.user.name
                                }}
                            </common-data-table>
                        )
                    }}
                ></use-element-size>
            </layout-common-container>
        )
    }
})
</script>
