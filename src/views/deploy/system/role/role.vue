<script lang="tsx">
import { defineComponent } from 'vue'
import { useColumnService } from '@/hooks/hook-service'
import { fetchDialogService, fetchNotifyService } from '@/plugins'
import * as feedback from '@/components/deploy/hooks'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'DeploySystemRole',
    setup(props, ctx) {
        const { state, form, setState, fetchRefresh } = useColumnService({
            request: (data, base, opts) => Service.httpBaseColumnSystemRole(opts.body),
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
            columns: [
                { title: '角色名称', key: 'name', minWidth: 180 },
                { title: '用户数', key: 'uids', align: 'center' },
                { title: '状态', key: 'statusChunk', align: 'center' },
                { title: '更新人', key: 'user', align: 'center' },
                { title: '更新时间', key: 'modifyTime', width: 200, align: 'center' }
            ]
        })

        return () => (
            <common-element-container class="absolute inset-0">
                <n-element class="p-inline-10 p-bs-10 overflow-hidden">
                    <common-element class-name="flex flex-row-reverse justify-between gap-10 p-inline-10! p-block-10!">
                        <common-element-action
                            label-width="7.2em"
                            cols={2}
                            v-model:initialize={state.initialize}
                            v-model:loading={state.loading}
                            v-model:event={state.event}
                            v-model:vague={form.value.vague}
                            onSubmit={() => fetchRefresh()}
                        ></common-element-action>
                    </common-element>
                </n-element>
                <n-element class="flex flex-col flex-1 overflow-hidden">
                    <common-element-scrollbar class="p-inline-10">
                        {Array.from({ length: 50 }, (x, index) => (
                            <n-h3>{index}</n-h3>
                        ))}
                    </common-element-scrollbar>
                </n-element>

                {/* <n-element class="flex flex-row-reverse justify-between gap-10 p-inline-10">
                    <n-flex size={[10, 10]}>
                        <common-element-button content="新增" type="primary" icon="nest-plus" secondary></common-element-button>
                    </n-flex>
                    <common-element-action
                        label-width="7.2em"
                        cols={2}
                        v-model:initialize={state.initialize}
                        v-model:loading={state.loading}
                        v-model:event={state.event}
                        v-model:vague={form.value.vague}
                        onSubmit={() => fetchRefresh()}
                    ></common-element-action>
                </n-element> */}
                {/* <common-element-resize element-table>
                    <common-database-table
                        settings={false}
                        command
                        remote
                        fixed-center
                        flex-height
                        fixed="right"
                        scroll-x={750}
                        loading={state.loading}
                        columns={state.columns}
                        data={state.dataSource}
                        v-model:page={state.page}
                        v-model:size={state.size}
                        v-model:total={state.total}
                        v-model:row-keys={state.rowKeys}
                        v-model:row-nodes={state.rowNodes}
                        onUpdate:page={(page: number) => fetchRefresh()}
                        onUpdate:size={(size: number) => fetchRefresh({ page: 1 })}
                    >
                        {{
                            uids: (uids: Array<string>) => {
                                return <common-database-chunk element="text" content={uids.length}></common-database-chunk>
                            },
                            user: (data: Omix) => {
                                return <common-database-chunk element="text" content={data.name}></common-database-chunk>
                            },
                            statusChunk: (data: Omix) => {
                                return <common-database-chunk content={data.name} json={data.json}></common-database-chunk>
                            },
                            command: (data: Omix, base: Omix<{ center: boolean }>) => (
                                <n-element class="flex items-center gap-10 justify-center">
                                    <common-element-button type="primary" text>
                                        编辑
                                    </common-element-button>
                                    <common-element-button type="error" text>
                                        删除
                                    </common-element-button>
                                </n-element>
                            )
                        }}
                    </common-database-table>
                </common-element-resize> */}
            </common-element-container>
        )
    }
})
</script>
