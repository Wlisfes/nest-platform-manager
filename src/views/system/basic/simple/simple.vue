<script lang="tsx">
import { defineComponent } from 'vue'
import { UseElementSize } from '@vueuse/components'
import { useSelecter } from '@/hooks/hook-selecter'
import { useService, SerState } from '@/hooks/hook-service'
import { fetchTreeChildren, fetchTreeTransfor, fetchTreePattern } from '@/utils/utils-common'
import { fetchDialogSystemRouter } from '@/components/system/hooks'
import { useConfiger, useStore } from '@/store'
import * as Service from '@/api/instance.service'
import * as env from '@/interface/instance.resolver'

export interface FormState extends Omix {
    keyword: string
}

export default defineComponent({
    name: 'BasicSimple',
    components: { UseElementSize },
    setup(props, ctx) {
        const { device } = useStore(useConfiger)
        const { state, form, setForm, setState, fetchRequest, fetchColumnRender } = useService<env.BodySaveRouter, FormState>({
            request: fetchColumnSimple,
            form: {
                keyword: ''
            },
            columns: [
                { title: '字典ID', key: 'id', width: 100 },
                { title: '字典名称', key: 'name', minWidth: 140 },
                { title: '字典标识', key: 'stalk', minWidth: 240 },
                { title: '备注', key: 'comment', minWidth: 240 },
                { title: '修改人', key: 'staffName', minWidth: 140 },
                { title: '更新时间', key: 'updateTime', minWidth: 200 },
                { title: '操作', key: 'operate', align: 'center', width: 100 }
            ]
        })

        /**字典列表**/
        async function fetchColumnSimple(data: FormState, body: SerState<env.BodySaveRouter>) {
            return await Service.httpColumnSimple({
                keyword: data.keyword,
                limit: body.limit,
                offset: body.offset
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
            <common-container absolute class="p-12">
                <div class="h-full flex flex-col flex-1 overflow-hidden">
                    <div class="flex gap-10 p-12 overflow-hidden justify-end">
                        <common-search-action
                            v-model:keyword={form.value.keyword}
                            multiple={false}
                            placeholder="请输入字典名称、字典标识、字典备注"
                            onSubmit={fetchRequest}
                        >
                            <n-form-item-gi label="菜单类型">
                                <n-date-picker type="datetimerange" clearable default-time="13:22:11" />
                            </n-form-item-gi>
                            <n-form-item-gi label="菜单类型">
                                <n-date-picker type="datetimerange" clearable default-time="13:22:11" />
                            </n-form-item-gi>
                        </common-search-action>
                    </div>
                    <div class="flex-1 p-inline-12 p-be-12 overflow-hidden">
                        <common-data-table loading={state.loading} columns={state.columns} data={state.dataSource}></common-data-table>
                    </div>
                </div>
            </common-container>
        )
    }
})
</script>
