<script lang="tsx">
import { defineComponent } from 'vue'
import { useColumnService, fetchKineColumns } from '@/hooks/hook-service'
import { fetchDialogService, fetchNotifyService } from '@/plugins'
import * as feedback from '@/components/deploy/hooks'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'DeploySystemDept',
    setup(props, ctx) {
        const { root, state, form, full, setState, toggle, fetchCheckboxs, fetchRefresh } = useColumnService({
            request: (data, base, opts) => Service.httpBaseSystemDeptColumn(opts.body),
            document: '部门组织自定义表头',
            dynamic: 'base:deploy:system:dept',
            form: { vague: undefined },
            columns: fetchKineColumns(true, [
                { title: '部门名称', key: 'name', width: 180, check: true },
                { title: '部门简称', key: 'bit', width: 130, check: true },
                { title: '关联人数', key: 'items', width: 100, align: 'center', check: true },
                { title: '更新人', key: 'user', width: 130, align: 'center', check: true },
                { title: '更新时间', key: 'modifyTime', width: 180, check: true }
            ])
        })

        return () => (
            <layout-common-container ref={root} abstract class="absolute inset-0" class-name="p-12 gap-12 overflow-hidden">
                <common-database-compute
                    title="部门组织"
                    element-class="flex-row-reverse justify-start"
                    keys={['settings', 'size', 'full']}
                    v-model:full={full.value}
                    v-model:loading={state.loading}
                    v-model:columns={state.columns}
                    toggle={toggle}
                    onRefresh={fetchRefresh}
                    onCheckboxs={fetchCheckboxs}
                >
                    <n-element class="flex gap-10 items-center">
                        <common-element-button
                            content="新增"
                            type="primary"
                            icon="nest-plus"
                            //onClick={() => fetchCommand({ command: 'CREATE' })}
                        ></common-element-button>
                    </n-element>
                    <common-element-action
                        mode="input"
                        placeholder="请输入部门名称、部门简称"
                        v-model:initialize={state.initialize}
                        v-model:loading={state.loading}
                        v-model:event={state.event}
                        v-model:vague={form.value.vague}
                        onSubmit={() => fetchRefresh()}
                    ></common-element-action>
                </common-database-compute>
                <common-database-container element-table v-model:initialize={state.initialize} v-model:loading={state.loading}>
                    <common-database-table
                        loading={state.loading}
                        data={state.dataSource}
                        v-model:columns={state.columns}
                        v-model:page={state.page}
                        v-model:size={state.size}
                        v-model:total={state.total}
                        v-model:row-keys={state.rowKeys}
                        v-model:row-nodes={state.rowNodes}
                        onUpdate:page={(page: number) => fetchRefresh()}
                        onUpdate:size={(size: number) => fetchRefresh({ page: 1 })}
                    >
                        {{
                            user: (data: Omix) => (
                                <common-database-chunk element="text" content={`${data.name} ${data.number}`}></common-database-chunk>
                            ),
                            items: (items: Array<Omix>) => (
                                <common-database-chunk element="text" content={items.length}></common-database-chunk>
                            ),
                            command: (node: Omix) => (
                                <n-element class="flex items-center gap-10 justify-center">
                                    <common-element-button
                                        database
                                        text
                                        content="编辑"
                                        type="primary"
                                        icon="nest-edit"
                                        icon-size={16}
                                        //onClick={() => fetchCommand({ node, command: 'UPDATE' })}
                                    ></common-element-button>
                                    <common-element-button
                                        database
                                        text
                                        content="删除"
                                        type="error"
                                        icon="nest-delete"
                                        icon-size={16}
                                        //onClick={() => fetchCommand({ node, command: 'DELETE', type: 'error', title: '删除' })}
                                    ></common-element-button>
                                </n-element>
                            )
                        }}
                    </common-database-table>
                </common-database-container>
            </layout-common-container>
        )
    }
})
</script>
