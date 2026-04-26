<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import { useColumnService } from '@/hooks'
import { EventType } from '@/utils'
import * as feedback from '@/components/crm/hooks'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'CrmClientCommonConsumer',
    props: {
        /**通讯实例**/
        observer: { type: Object as PropType<EventType>, required: true }
    },
    setup(props, ctx) {
        /**表格实例**/
        const { formRef, formState, state, chunkState, instOptions, fetchRefresh } = useColumnService({
            request: (base, payload) => Service.httpBaseCrmClientCommonConsumer(payload),
            keyName: 'chatbok:crm:client:common:consumer',
            chunkNames: {
                CHUNK_CLIENT_PAY_MODE: true,
                CHUNK_CLIENT_AUTH_STATUS: true,
                CHUNK_CLIENT_SOURCE: true,
                CHUNK_CLIENT_STATUS: true,
                CHUNK_CLIENT_CLASS: true,
                CHUNK_CLIENT_STAGE: true
            },
            formState: {
                name: undefined,
                status: undefined,
                payMode: undefined,
                authStatus: undefined,
                source: undefined
            },
            columns: [
                { title: '客户ID', key: 'keyId', width: 90, disabled: true },
                { title: '客户名称', key: 'name', minWidth: 200, disabled: true },
                { title: '客户别名', key: 'alias', width: 150, check: true },
                { title: '邮箱', key: 'email', width: 160, check: true },
                { title: '电话号码', key: 'phone', width: 120, check: true },
                { title: '归属人', key: 'user', width: 120, check: true },
                { title: '归属部门', key: 'depts', width: 120, check: true },
                { title: '品牌', key: 'brand', width: 100, check: true },
                { title: '客户类型', key: 'classType', width: 100, check: true },
                { title: '等级', key: 'level', width: 100, check: true },
                { title: '阶段', key: 'stage', width: 100, check: true },
                { title: '币种', key: 'currency', width: 100, check: true },
                { title: '认证状态', key: 'authStatus', width: 100, check: true },
                { title: '注册来源', key: 'source', width: 100, check: true },
                { title: '状态', key: 'status', width: 100, check: true },
                { title: '付款模式', key: 'payMode', width: 100, check: true },
                { title: '信用额度', key: 'credit', width: 100, check: true },
                { title: '标签', key: 'tags', minWidth: 200, check: true },
                { title: '创建时间', key: 'createTime', width: 160, check: true }
            ]
        })

        /**新增客户**/
        async function fetchUseCrmClientcommonFeedbackConsumer() {
            return await feedback.fetchCrmClientcommonFeedbackConsumer({
                title: '新增客户',
                command: 'CREATE',
                onSubmit: fetchRefresh
            })
        }

        return () => (
            <n-element class="crm-client-common-consumer h-full flex flex-col gap-14 overflow-hidden">
                <common-database-search
                    class="p-0!"
                    function-class="justify-end"
                    function={['search', 'restore', 'collapse', 'deploy', 'abstract']}
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
                    <common-database-search-function abstract class="flex gap-col-10">
                        <common-element-button type="primary" onClick={fetchUseCrmClientcommonFeedbackConsumer}>
                            新增
                        </common-element-button>
                    </common-database-search-function>
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
                        col_name: (data: Omix) => (
                            <n-ellipsis title={data.name} tooltip={false}>
                                <router-link to={`/crm/client/context/${data.keyId}`} class="decoration-none">
                                    <n-text type="info">{data.name}</n-text>
                                </router-link>
                            </n-ellipsis>
                        ),
                        col_user: (data: Omix) => {
                            return <common-database-table-user element="text" data={data.user}></common-database-table-user>
                        },
                        col_brand: (data: Omix) => {
                            return <common-database-table-content value={data.brand?.name}></common-database-table-content>
                        },
                        col_depts: (data: Omix) => (
                            <common-database-table-content
                                value={(data.depts ?? []).map((item: Omix) => item.deptName)}
                            ></common-database-table-content>
                        ),
                        col_classType: (data: Omix) => (
                            <common-database-table-chunk
                                element="content"
                                value={data.classType}
                                options={chunkState.CHUNK_CLIENT_CLASS}
                            ></common-database-table-chunk>
                        ),
                        col_stage: (data: Omix) => (
                            <common-database-table-chunk
                                element="content"
                                value={data.stage}
                                options={chunkState.CHUNK_CLIENT_STAGE}
                            ></common-database-table-chunk>
                        ),
                        col_tags: (data: Omix) => (
                            <common-database-table-content
                                value={(data.tags ?? []).map((item: Omix) => item.tagName)}
                            ></common-database-table-content>
                        ),
                        col_status: (data: Omix) => (
                            <common-database-table-chunk
                                element="content"
                                value={data.status}
                                options={chunkState.CHUNK_CLIENT_STATUS}
                            ></common-database-table-chunk>
                        ),
                        col_payMode: (data: Omix) => (
                            <common-database-table-chunk
                                element="content"
                                value={data.payMode}
                                options={chunkState.CHUNK_CLIENT_PAY_MODE}
                            ></common-database-table-chunk>
                        ),
                        col_authStatus: (data: Omix) => (
                            <common-database-table-chunk
                                element="content"
                                value={data.authStatus}
                                options={chunkState.CHUNK_CLIENT_AUTH_STATUS}
                            ></common-database-table-chunk>
                        ),
                        col_source: (data: Omix) => (
                            <common-database-table-chunk
                                element="content"
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
