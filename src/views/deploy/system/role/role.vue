<script lang="tsx">
import { defineComponent } from 'vue'
import { useColumnService, fetchKineColumns } from '@/hooks/hook-service'
import { fetchDialogService, fetchNotifyService } from '@/plugins'
import * as feedback from '@/components/deploy/hooks'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'DeploySystemRole',
    setup(props, ctx) {
        const { root, state, form, full, setState, toggle, fetchCheckboxs, fetchRefresh } = useColumnService({
            request: (data, base, opts) => Service.httpBaseSystemColumnRole(opts.body),
            document: '角色管理自定义表头',
            dynamic: 'base:deploy:system:role',
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
            columns: fetchKineColumns(true, [
                { title: '选择框', key: 'selection', type: 'selection', check: true },
                { title: '角色ID', key: 'keyId', width: 190, check: true },
                { title: '角色名称', key: 'name', width: 180, check: true },
                { title: '角色描述', key: 'comment', width: 240, check: true },
                { title: '已关联用户', key: 'typeChunk', width: 140, align: 'center', check: true },
                { title: '状态', key: 'statusChunk', width: 100, align: 'center', check: true },
                { title: '更新人', key: 'user', width: 100, align: 'center', check: true },
                { title: '更新时间', key: 'modifyTime', width: 200, align: 'center', check: true }
            ])
        })

        return () => (
            <layout-common-container ref={root} class="absolute inset-0 p-12" class-name="p-12 gap-12 overflow-hidden">
                <common-database-compute
                    element-class="flex-row-reverse justify-between"
                    v-model:full={full.value}
                    v-model:loading={state.loading}
                    v-model:columns={state.columns}
                    toggle={toggle}
                    onRefresh={fetchRefresh}
                    onCheckboxs={fetchCheckboxs}
                >
                    <n-element class="flex gap-10 items-center">
                        <common-element-button content="新增" type="primary" icon="nest-plus"></common-element-button>
                    </n-element>
                    <common-element-action
                        label-width="7.2em"
                        cols={2}
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
                            user: (data: Omix) => {
                                return <common-database-chunk element="text" content={data.name}></common-database-chunk>
                            },
                            statusChunk: (data: Omix) => {
                                return <common-database-chunk content={data.name} json={data.json}></common-database-chunk>
                            }
                        }}
                    </common-database-table>
                </common-database-container>
            </layout-common-container>
        )

        // return () => (
        //     <layout-common-container class="absolute inset-0 p-12" class-name="p-12 gap-12 overflow-hidden">
        //         <n-element class="flex flex-row-reverse justify-between gap-10">
        //             <n-flex size={[10, 10]}>
        //                 <common-element-button content="新增" type="primary" icon="nest-plus" secondary></common-element-button>
        //             </n-flex>
        //             <common-element-action
        //                 label-width="7.2em"
        //                 cols={2}
        //                 v-model:initialize={state.initialize}
        //                 v-model:loading={state.loading}
        //                 v-model:event={state.event}
        //                 v-model:vague={form.value.vague}
        //                 onSubmit={() => fetchRefresh()}
        //             ></common-element-action>
        //         </n-element>
        //         <common-element-resize element-table>
        //             <common-database-table
        //                 command
        //                 remote
        //                 fixed-center
        //                 flex-height
        //                 fixed="right"
        //                 loading={state.loading}
        //                 columns={state.columns}
        //                 data={state.dataSource}
        //                 v-model:page={state.page}
        //                 v-model:size={state.size}
        //                 v-model:total={state.total}
        //                 v-model:row-keys={state.rowKeys}
        //                 v-model:row-nodes={state.rowNodes}
        //                 onUpdate:page={(page: number) => fetchRefresh()}
        //                 onUpdate:size={(size: number) => fetchRefresh({ page: 1 })}
        //             >
        //                 {{
        //                     uids: (uids: Array<string>) => {
        //                         return <common-database-chunk element="text" content={uids.length}></common-database-chunk>
        //                     },
        //                     user: (data: Omix) => {
        //                         return <common-database-chunk element="text" content={data.name}></common-database-chunk>
        //                     },
        //                     statusChunk: (data: Omix) => {
        //                         return <common-database-chunk content={data.name} json={data.json}></common-database-chunk>
        //                     },
        //                     command: (data: Omix, base: Omix<{ center: boolean }>) => (
        //                         <n-element class="flex items-center gap-10 justify-center">
        //                             <common-element-button type="primary" text>
        //                                 编辑
        //                             </common-element-button>
        //                             <common-element-button type="error" text>
        //                                 删除
        //                             </common-element-button>
        //                         </n-element>
        //                     )
        //                 }}
        //             </common-database-table>
        //         </common-element-resize>
        //     </layout-common-container>
        // )
    }
})
</script>
