<script lang="tsx">
import { defineComponent } from 'vue'
import { useState } from '@/hooks/hook-state'
import { fetchDialogSystemMenu } from '@/components/system/hooks'

export default defineComponent({
    name: 'BasicMenu',
    setup(props, ctx) {
        const { state, setState } = useState({
            pattern: '',
            columns: [
                { title: '菜单ID', key: 'sid' },
                { title: '菜单名称', key: 'name' },
                { title: '图标', key: 'icon' },
                { title: '父级ID', key: 'pid' },
                { title: '菜单路径', key: 'path' },
                { title: '菜单类型', key: 'type' },
                { title: '状态', key: 'state' },
                { title: '排序', key: 'sort' },
                { title: '是否显示', key: 'show' },
                { title: '修改人', key: 'staffName' },
                { title: '修改时间', key: 'updateTime' }
            ]
        })

        /**新增菜单**/
        async function fetchCreateDialogSystemMenu() {
            return await fetchDialogSystemMenu({
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
                            <n-button type="primary" focusable={false} onClick={fetchCreateDialogSystemMenu}>
                                新增
                            </n-button>
                        </div>
                        <n-divider class="m-0!"></n-divider>
                        <div class="flex-1 overflow-hidden p-12">
                            <n-data-table size="small" columns={state.columns}></n-data-table>
                        </div>
                    </n-card>
                </div>
            </common-container>
        )
    }
})
</script>
