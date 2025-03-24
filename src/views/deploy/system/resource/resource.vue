<script lang="tsx">
import { defineComponent } from 'vue'
import { useColumnService } from '@/hooks/hook-service'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'DeploySystemResource',
    setup(props, ctx) {
        const { state } = useColumnService({
            form: {},
            columns: [
                { title: '菜单名称', key: 'name', width: 200, fixed: 'left' },
                { title: '图标', key: 'iconName', width: 100, align: 'center' },
                { title: '类型', key: 'type', width: 120, align: 'center' },
                { title: '路由地址', key: 'router', minWidth: 300 },
                { title: '权限标识', key: 'key', minWidth: 300 },
                { title: '排序号', key: 'sort', width: 100, align: 'center' },
                { title: '状态', key: 'status', width: 120, align: 'center' },
                { title: '更新时间', key: 'modifyTime', width: 200, align: 'center' },
                { title: '更新人', key: 'user', width: 140, align: 'center' },
                { title: '操作', key: 'command', width: 180, align: 'center', fixed: 'right' }
            ],
            request: (data, base) => Service.httpBaseColumnSystemRouter({ page: base.page, size: base.size })
        })

        return () => (
            <layout-common-container class="flex flex-col flex-1 p-inline-12 p-bs-12" class-name="p-inline-12 p-bs-12 gap-10">
                <div class="flex items-center justify-end">
                    <common-search-action></common-search-action>
                </div>
                <common-data-table bordered striped single-line={false} scroll-x={1800} columns={state.columns} data={state.dataSource}>
                    {{
                        iconName: (data: Omix) => (
                            <div class="flex items-center justify-center">
                                <common-icon class="flex-inline" size={28} name={data.iconName}></common-icon>
                            </div>
                        ),
                        type: (data: Omix) => (
                            <n-tag bordered={false} type="success">
                                312
                            </n-tag>
                        ),
                        user: (data: Omix) => data.user.nickname
                    }}
                </common-data-table>
            </layout-common-container>
        )
    }
})
</script>
