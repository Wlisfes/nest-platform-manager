<script lang="tsx">
import { defineComponent, onMounted } from 'vue'
import { useState } from '@/hooks/hook-state'
import { fetchDialogSystemRouter } from '@/components/system/hooks'
import * as Service from '@/api/instance.service'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'BasicRouter',
    setup(props, ctx) {
        const { state, setState } = useState({
            pattern: '',
            total: 0,
            dataSource: [] as Array<env.BodySaveRouter>,
            columns: [
                { type: 'selection' },
                { title: '菜单ID', key: 'sid', width: 120 },
                { title: '父级ID', key: 'pid', width: 120 },
                { title: '图标', key: 'icon', width: 100 },
                { title: '菜单名称', key: 'name', minWidth: 200 },
                { title: '菜单路径', key: 'path', minWidth: 260 },
                { title: '菜单类型', key: 'type', minWidth: 100 },
                { title: '状态', key: 'state', width: 100 },
                { title: '排序', key: 'sort', width: 100 },
                { title: '是否显示', key: 'show', width: 120 },
                { title: '修改人', key: 'staffName', minWidth: 120 },
                { title: '修改时间', key: 'updateTime', width: 170 }
            ]
        })

        onMounted(() => {
            fetchColumnRouter()
        })

        /**菜单列表**/
        async function fetchColumnRouter() {
            try {
                const { data } = await Service.httpColumnRouter()
                return await setState({ dataSource: data.list, total: data.total })
            } catch (err) {}
        }

        /**新增菜单**/
        async function fetchCreateDialogSystemRouter() {
            return await fetchDialogSystemRouter({
                onClose: evt => evt.unmount(),
                onSubmit: async evt => {
                    console.log(evt)
                }
            })
        }

        return () => (
            <common-container class="flex p-12 gap-12" absolute>
                <n-card class="w-280 overflow-hidden" content-class="p-0! h-full flex flex-col overflow-hidden">
                    <n-h4 class="m-0 p-12 line-height-20">菜单结构</n-h4>
                    <div class="p-b-12 p-inline-12">
                        <n-input v-model:value={state.pattern} placeholder="搜索" />
                    </div>
                    <div class="flex-1 overflow-hidden p-be-12">
                        <n-scrollbar>
                            {Array.from({ length: 50 }, (x, index) => (
                                <n-h1>{index}</n-h1>
                            ))}
                        </n-scrollbar>
                    </div>
                </n-card>
                <div class="flex flex-col flex-1 gap-12 overflow-hidden">
                    <n-card content-class="p-12!">11</n-card>
                    <n-card class="flex-1" content-class="p-0! flex flex-col overflow-hidden">
                        <div class="flex items-center gap-12 p-inline-12 p-block-6">
                            <n-h4 class="m-0 flex-1 line-height-34">菜单列表</n-h4>
                            <n-button type="primary" focusable={false} onClick={fetchCreateDialogSystemRouter}>
                                新增
                            </n-button>
                        </div>
                        <n-divider class="m-0!"></n-divider>
                        <div class="flex-1 overflow-hidden p-12">
                            <n-data-table
                                size="small"
                                row-key={(row: Omix) => row.keyId}
                                columns={state.columns}
                                data={state.dataSource}
                            ></n-data-table>
                        </div>
                    </n-card>
                </div>
            </common-container>
        )
    }
})
</script>
