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
                { title: '菜单名称', key: 'name', width: 200 },
                { title: '图标', key: 'iconName', width: 80, align: 'center' },
                { title: '类型', key: 'type', width: 100, align: 'center' },
                { title: '路由地址', key: 'router', minWidth: 300 },
                { title: '权限标识', key: 'key', minWidth: 300 },
                { title: '排序号', key: 'sort', width: 80, align: 'center' },
                { title: '状态', key: 'status', width: 100, align: 'center' },
                { title: '更新时间', key: 'modifyTime', width: 200, align: 'center' },
                { title: '更新人', key: 'user', width: 120, align: 'center' },
                { title: '操作', key: 'command', width: 150, align: 'center' }
            ],
            request: (data, base) => Service.httpBaseColumnSystemRouter({ page: base.page, size: base.size })
        })

        return () => (
            <layout-common-container class="flex flex-col flex-1 p-inline-12 p-bs-12" class-name="p-inline-12 p-bs-12 gap-10">
                <n-element class="flex gap-10">
                    <div class="flex-1"></div>
                    <common-element-action cols={2}>
                        <n-form-item label="菜单名称">
                            <n-input placeholder="请输入菜单名称" clearable />
                        </n-form-item>
                        <n-form-item label="权限标识">
                            <n-input placeholder="请输入权限标识" clearable />
                        </n-form-item>
                        <n-form-item label="路由地址">
                            <n-input placeholder="请输入路由地址" clearable />
                        </n-form-item>
                        <n-form-item label="版本号">
                            <n-input placeholder="请输入版本号" clearable />
                        </n-form-item>
                        <n-form-item label="上级菜单">
                            <n-input placeholder="请输入上级菜单" />
                        </n-form-item>
                        <n-form-item label="操作人">
                            <n-input placeholder="请输入操作人" />
                        </n-form-item>
                        <n-form-item label="更新时间" style={{ 'grid-column': 'span 2 / span 2' }}>
                            <n-date-picker type="datetimerange" clearable default-time="13:22:11" class="w-full" />
                        </n-form-item>
                    </common-element-action>
                </n-element>

                <div class="flex-1 overflow-hidden">
                    <common-data-table bordered striped single-line={false} scroll-x={1600} columns={state.columns} data={state.dataSource}>
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
                            user: (data: Omix) => data.user.name
                        }}
                    </common-data-table>
                </div>
            </layout-common-container>
        )
    }
})
</script>
