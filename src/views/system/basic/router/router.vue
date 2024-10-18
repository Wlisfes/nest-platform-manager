<script lang="tsx">
import { defineComponent } from 'vue'
import { useSelecter } from '@/hooks/hook-selecter'
import { useService } from '@/hooks/hook-service'
import { fetchTreeChildren, fetchTreeTransfor } from '@/utils/utils-common'
import { fetchDialogSystemRouter } from '@/components/system/hooks'
import * as Service from '@/api/instance.service'
import * as env from '@/interface/instance.resolver'

export interface FormState extends Omix {
    pattern: string
    selected: Array<string>
}

export default defineComponent({
    name: 'BasicRouter',
    setup(props, ctx) {
        const { state, form, setForm, setState, fetchRequest } = useService<env.BodySaveRouter, FormState>({
            immediate: false,
            form: {
                pattern: '',
                selected: []
            },
            request: data => {
                return Service.httpColumnRouter({ sid: data.selected.at(0) as string })
            },
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

        /**所有菜单树**/
        const treeOption = useSelecter(() => Service.httpColumnTreeRouter({}), {
            transform: data => {
                return fetchTreeTransfor(data, {
                    transform: list => fetchTreeChildren(list),
                    pattern: item => ({ key: item.sid, label: item.name, children: item.children })
                })
            },
            callback: async data => {
                await setForm({ selected: data.dataSource.slice(0, 1).map(item => item.key) })
                return await fetchRequest()
            }
        })

        /**左侧菜单树选中变更**/
        async function fetchUpdateSelected(keys: Array<string>) {
            return await setForm({ selected: keys }).then(async () => {
                return await fetchRequest()
            })
        }

        /**新增菜单**/
        async function fetchCreateDialogSystemRouter() {
            return await fetchDialogSystemRouter({
                title: '新增菜单',
                command: 'CREATE',
                onSubmit: async evt => {
                    console.log(evt)
                }
            })
        }

        /**新增菜单**/
        async function fetchUpdateDialogSystemRouter() {
            const node = state.select.at(0)
            return await fetchDialogSystemRouter({
                title: '编辑菜单',
                command: 'UPDATE',
                sid: node?.sid,
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
                        <n-input v-model:value={form.value.pattern} placeholder="搜索" />
                    </div>
                    <div class="flex-1 overflow-hidden p-be-12">
                        <n-scrollbar>
                            <div class="p-inline-12">
                                <n-tree
                                    block-line
                                    show-line
                                    selectable
                                    expand-on-click
                                    cancelable={false}
                                    data={treeOption.dataSource.value}
                                    selected-keys={form.value.selected}
                                    style={{ '--n-node-content-height': '34px' }}
                                    on-update:selected-keys={fetchUpdateSelected}
                                ></n-tree>
                            </div>
                        </n-scrollbar>
                    </div>
                </n-card>
                <div class="flex flex-col flex-1 gap-12 overflow-hidden">
                    {/* <n-card content-class="p-12!">
                        <n-grid cols="4" x-gap={12} y-gap={12} item-responsive>
                            <n-grid-item>
                                <n-form-item label-placement="left" label="这是个这是个" show-feedback={false}>
                                    <n-input placeholder="请输入" />
                                </n-form-item>
                            </n-grid-item>
                        </n-grid>
                    </n-card> */}
                    <n-card class="flex-1" content-class="p-0! flex flex-col overflow-hidden">
                        <div class="flex items-center gap-12 p-12">
                            <n-h4 class="m-0 flex-1 line-height-34">菜单列表</n-h4>
                            <n-button type="primary" focusable={false} onClick={fetchCreateDialogSystemRouter}>
                                新增
                            </n-button>
                            <n-button focusable={false} onClick={fetchUpdateDialogSystemRouter}>
                                编辑
                            </n-button>
                        </div>
                        <n-divider class="m-0!"></n-divider>
                        <div class="flex-1 overflow-hidden p-12">
                            <n-data-table
                                size="small"
                                row-key={(row: Omix) => row.keyId}
                                loading={state.loading}
                                columns={state.columns}
                                data={state.dataSource}
                                onUpdate:checked-row-keys={(keys: Array<number>, rows: Array<env.BodySaveRouter>) => {
                                    setState({ select: rows })
                                }}
                            ></n-data-table>
                        </div>
                    </n-card>
                </div>
            </common-container>
        )
    }
})
</script>
