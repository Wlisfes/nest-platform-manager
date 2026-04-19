<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import { useColumnService } from '@/hooks'
import { stop, EventType } from '@/utils'
import * as feedback from '@/components/deploy/hooks'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'CrmClientCommonConsumer',
    props: {
        /**通讯实例**/
        observer: { type: Object as PropType<EventType>, required: true }
    },
    setup(props, ctx) {
        /**表格实例**/
        const { formRef, formState, state, chunkState, instState, instOptions, fetchRefresh } = useColumnService({
            request: (base, payload) => Service.httpBaseCrmClientCommonConsumer(payload),
            keyName: 'chatbok:finance:account:consumer',
            chunkNames: {
                CHUNK_CLIENT_PAY_MODE: true,
                CHUNK_CLIENT_AUTH_STATUS: true,
                CHUNK_CLIENT_SOURCE: true,
                CHUNK_CLIENT_STATUS: true
            },
            formState: {
                name: undefined,
                status: undefined,
                payMode: undefined,
                authStatus: undefined,
                source: undefined
            },
            columns: [
                { title: '客户名称', key: 'name', width: 240, disabled: true },
                { title: '客户别名', key: 'alias', width: 180, check: true },
                { title: '邮箱', key: 'email', minWidth: 180, check: true },
                { title: '电话号码', key: 'phone', width: 140, check: true },
                { title: '认证状态', key: 'authStatus', align: 'center', width: 100, check: true },
                { title: '注册来源', key: 'source', align: 'center', width: 100, check: true },
                { title: '状态', key: 'status', align: 'center', width: 100, check: true },
                { title: '付款模式', key: 'payMode', align: 'center', width: 100, check: true },
                // { title: '币种', key: 'currency', width: 100, check: true },
                // { title: '余额', key: 'balance', width: 140, check: true, render: (row: Omix) => Number(row.balance ?? 0).toFixed(6) },
                { title: '信用额度', key: 'credit', width: 140, check: true, render: (row: Omix) => Number(row.credit ?? 0).toFixed(6) },
                { title: '创建时间', key: 'createTime', width: 160, check: true }
                // { title: '更新时间', key: 'modifyTime', width: 160, check: true }
            ]
        })

        return () => (
            <n-element class="crm-client-common-consumer h-full flex flex-col gap-14 overflow-hidden">
                <common-database-search
                    class="p-0!"
                    function-class="justify-end"
                    function={['search', 'restore', 'collapse', 'abstract']}
                    square={['l-t', 'r-t']}
                    ref={formRef}
                    limit={state.limit}
                    v-model:loading={state.loading}
                    v-model:when={state.when}
                    v-model:database={state.database}
                    v-model:formState={formState.value}
                    on-update:database={instOptions.fetchUpdateDatabase}
                    on-restore={instOptions.fetchRestore}
                    on-submit={instOptions.fetchRequest}
                >
                    <common-database-search-column disabled prop="name" label="客户名称">
                        <form-common-column-input
                            clearable
                            placeholder="请输入客户名称"
                            v-model:value={formState.value.name}
                            on-submit={fetchRefresh}
                        ></form-common-column-input>
                    </common-database-search-column>
                </common-database-search>
                <common-database-table
                    class="p-0! overflow-hidden"
                    show-select
                    show-settings
                    limit={state.limit}
                    total={state.total}
                    columns={state.columns}
                    v-model:page={state.page}
                    v-model:size={state.size}
                    v-model:select={state.select}
                    v-model:data={state.dataSource}
                    v-model:loading={state.loading}
                    v-model:initialize={state.initialize}
                    v-model:customize={state.customize}
                    on-update:customize={instOptions.fetchUpdateCustomize}
                    on-update:page={(page: number) => fetchRefresh({ page })}
                    on-update:size={(size: number) => fetchRefresh({ page: 1, size })}
                >
                    {{
                        col_status: (data: Omix) => (
                            <common-database-table-chunk
                                value={data.status}
                                options={chunkState.CHUNK_CLIENT_STATUS}
                            ></common-database-table-chunk>
                        ),
                        col_payMode: (data: Omix) => (
                            <common-database-table-chunk
                                value={data.payMode}
                                options={chunkState.CHUNK_CLIENT_PAY_MODE}
                            ></common-database-table-chunk>
                        ),
                        col_authStatus: (data: Omix) => (
                            <common-database-table-chunk
                                value={data.authStatus}
                                options={chunkState.CHUNK_CLIENT_AUTH_STATUS}
                            ></common-database-table-chunk>
                        ),
                        col_source: (data: Omix) => (
                            <common-database-table-chunk
                                value={data.source}
                                options={chunkState.CHUNK_CLIENT_SOURCE}
                            ></common-database-table-chunk>
                        )
                    }}
                </common-database-table>
            </n-element>
        )
    }
})
</script>
