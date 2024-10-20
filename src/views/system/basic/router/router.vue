<script lang="tsx">
import { defineComponent } from 'vue'
import { UseElementSize } from '@vueuse/components'
import { useSelecter } from '@/hooks/hook-selecter'
import { useService } from '@/hooks/hook-service'
import { fetchTreeChildren, fetchTreeTransfor } from '@/utils/utils-common'
import { fetchDialogSystemRouter } from '@/components/system/hooks'
import * as Service from '@/api/instance.service'
import * as env from '@/interface/instance.resolver'

export interface FormState extends Omix {
    pattern: string
    selected: Array<string>
    show?: boolean
    type?: string
}

export default defineComponent({
    name: 'BasicRouter',
    components: { UseElementSize },
    setup(props, ctx) {
        const { state, form, setForm, setState, fetchRequest } = useService<env.BodySaveRouter, FormState>({
            colsCount: 1,
            immediate: false,
            form: {
                pattern: '',
                selected: [],
                show: undefined,
                type: undefined
            },
            request: data => {
                return Service.httpColumnRouter({ sid: data.selected.at(0) as string })
            },
            columns: [
                { title: '菜单ID', key: 'sid', width: 120 },
                { title: '父级ID', key: 'pid', width: 120 },
                { title: '图标', key: 'icon', width: 80 },
                { title: '状态', key: 'state', width: 100 },
                { title: '排序', key: 'sort', width: 80 },
                { title: '菜单名称', key: 'name', minWidth: 180 },
                { title: '唯一标识', key: 'instance', minWidth: 260 },
                { title: '菜单路径', key: 'path', minWidth: 260 },
                { title: '菜单类型', key: 'type', minWidth: 100 },
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
                <n-card class="flex-1 overflow-hidden" content-class="p-12! flex flex-col gap-10 overflow-hidden">
                    <use-element-size
                        v-slots={{
                            default: (data: Omix<{ width: number }>) => (
                                <n-element class="flex gap-10">
                                    <n-grid class="flex-1" x-gap={12} cols={state.cols.default}>
                                        <n-grid-item offset={state.cols.offset}>
                                            <n-tree-select
                                                options={treeOption.dataSource.value}
                                                style={{ '--n-node-content-height': '34px' }}
                                            ></n-tree-select>
                                        </n-grid-item>
                                    </n-grid>
                                    <common-search-action multiple={false} placeholder="请输入菜单ID、菜单名称、菜单路径、唯一标识">
                                        <n-form-item-gi label="菜单类型" show-feedback={false}>
                                            <n-select
                                                v-model:value={form.value.show}
                                                clearable
                                                options={[
                                                    { label: '菜单', value: 'router' },
                                                    { label: '按钮', value: 'button' }
                                                ]}
                                            />
                                        </n-form-item-gi>
                                        <n-form-item-gi label="是否显示" show-feedback={false}>
                                            <n-select
                                                v-model:value={form.value.show}
                                                clearable
                                                options={[
                                                    { label: '显示', value: 1 },
                                                    { label: '隐藏', value: 0 }
                                                ]}
                                            />
                                        </n-form-item-gi>
                                    </common-search-action>
                                </n-element>
                            )
                        }}
                    ></use-element-size>
                    <common-data-table loading={state.loading} columns={state.columns} data={state.dataSource}></common-data-table>
                    {/* <n-data-table
                        class="flex-1 overflow-hidden"
                        size="small"
                        row-key={(row: Omix) => row.keyId}
                        loading={state.loading}
                        columns={state.columns}
                        data={state.dataSource}
                        onUpdate:checked-row-keys={(keys: Array<number>, rows: Array<env.BodySaveRouter>) => {
                            setState({ select: rows })
                        }}
                    ></n-data-table> */}
                </n-card>
                {/* <div class="flex flex-col flex-1 gap-12 overflow-hidden">
                    <n-card content-class="p-0! flex flex-col overflow-hidden">
                        <use-element-size>
                            {{
                                default: (data: Omix<{ width: number }>) => (
                                    <n-element class="flex gap-10">
                                        <n-grid class="flex-1" x-gap={12} cols={state.cols.default}>
                                            <n-grid-item offset={state.cols.offset}>
                                                <n-tree-select
                                                    options={treeOption.dataSource.value}
                                                    style={{ '--n-node-content-height': '34px' }}
                                                ></n-tree-select>
                                            </n-grid-item>
                                        </n-grid>
                                        <common-search-action multiple={false} placeholder="请输入菜单ID、菜单名称、菜单路径、唯一标识">
                                            <n-form-item-gi label="菜单类型" show-feedback={false}>
                                                <n-select
                                                    v-model:value={form.value.show}
                                                    clearable
                                                    options={[
                                                        { label: '菜单', value: 'router' },
                                                        { label: '按钮', value: 'button' }
                                                    ]}
                                                />
                                            </n-form-item-gi>
                                            <n-form-item-gi label="是否显示" show-feedback={false}>
                                                <n-select
                                                    v-model:value={form.value.show}
                                                    clearable
                                                    options={[
                                                        { label: '显示', value: 1 },
                                                        { label: '隐藏', value: 0 }
                                                    ]}
                                                />
                                            </n-form-item-gi>
                                        </common-search-action>
                                    </n-element>
                                )
                            }}
                        </use-element-size>
                    </n-card>
                    <div class="flex-1 overflow-hidden">
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
                </div> */}
            </common-container>
        )
    }
})
</script>
