<script lang="tsx">
import { defineComponent } from 'vue'
import { UseElementSize } from '@vueuse/components'
import { useSelecter } from '@/hooks/hook-selecter'
import { useService } from '@/hooks/hook-service'
import { fetchTreeChildren, fetchTreeTransfor, fetchTreePattern } from '@/utils/utils-common'
import { fetchDialogSystemRouter } from '@/components/system/hooks'
import { useConfiger, useStore } from '@/store'
import * as Service from '@/api/instance.service'
import * as env from '@/interface/instance.resolver'

export interface FormState extends Omix {
    pattern: string
    selected: Array<string>
    show?: boolean
    type?: string
}

export default defineComponent({
    name: 'BasicSimple',
    components: { UseElementSize },
    setup(props, ctx) {
        const { device } = useStore(useConfiger)
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
                return Service.httpColumnRouter({ id: data.selected.at(0) as string })
            },
            columns: [
                { title: '菜单ID', key: 'id', width: 120 },
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
            <common-container absolute class="p-12" loading={state.initialize}>
                <div class="flex flex-col flex-1 overflow-hidden">
                    <div class="flex gap-10 p-be-12 overflow-hidden">
                        <n-grid class="flex-1" x-gap={12} cols={state.cols.default}>
                            <n-grid-item offset={state.cols.offset} class="flex justify-end">
                                <common-state-button type="primary" icon={<local-naive-increase />} onClick={fetchCreateDialogSystemRouter}>
                                    新增
                                </common-state-button>
                            </n-grid-item>
                        </n-grid>
                        <common-search-action multiple={false}>
                            <n-form-item-gi label="菜单类型">
                                <n-date-picker type="datetimerange" clearable default-time="13:22:11" />
                            </n-form-item-gi>
                            <n-form-item-gi label="菜单类型">
                                <n-date-picker type="datetimerange" clearable default-time="13:22:11" />
                            </n-form-item-gi>
                        </common-search-action>
                    </div>
                    <n-data-table
                        class="flex-1"
                        row-key={(row: Omix) => row.keyId}
                        loading={state.loading}
                        columns={state.columns}
                        data={state.dataSource}
                        onUpdate:checked-row-keys={(keys: Array<number>, rows: Array<env.BodySaveRouter>) => {
                            setState({ select: rows })
                        }}
                    ></n-data-table>
                </div>
            </common-container>
        )
    }
})
</script>
