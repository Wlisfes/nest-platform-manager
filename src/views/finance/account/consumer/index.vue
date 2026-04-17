<script lang="tsx">
import { defineComponent } from 'vue'
import { useColumnService } from '@/hooks'
import { fetchDialogService, fetchNotifyService } from '@/plugins'
import * as feedback from '@/components/finance/hooks'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'FinanceAccountConsumer',
    setup(props, ctx) {
        /**表格实例**/
        const { formRef, formState, state, chunkState, instState, instOptions, fetchRefresh } = useColumnService({
            request: (base, payload) => Service.httpBaseFinanceColumnClient(payload),
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
                { title: '客户名称', key: 'name', minWidth: 160, disabled: true },
                { title: '客户别名', key: 'alias', minWidth: 120, check: true },
                { title: '邮箱', key: 'email', minWidth: 180, ellipsis: { tooltip: true }, check: true },
                { title: '电话号码', key: 'phone', width: 140, check: true },
                { title: '币种', key: 'currency', width: 100, check: true },
                { title: '状态', key: 'status', width: 100, check: true },
                { title: '付款模式', key: 'payMode', width: 100, check: true },
                { title: '余额', key: 'balance', width: 120, check: true },
                { title: '信用额度', key: 'credit', width: 120, check: true },
                { title: '认证状态', key: 'authStatus', width: 100, check: true },
                { title: '注册来源', key: 'source', width: 100, check: true },
                { title: '创建时间', key: 'createTime', width: 160, check: true },
                { title: '更新时间', key: 'modifyTime', width: 160, check: true }
            ]
        })

        /**新增客户**/
        async function fetchAccountConsumerCreate() {
            return await feedback.fetchFinanceAccountConsumer({
                title: '新增客户',
                command: 'CREATE',
                async onSubmit() {
                    return await fetchRefresh()
                }
            })
        }

        /**编辑客户**/
        async function fetchAccountConsumerUpdate() {
            return await feedback.fetchFinanceAccountConsumer({
                title: '编辑客户',
                command: 'UPDATE',
                node: state.select[0],
                async onSubmit() {
                    return await fetchRefresh()
                }
            })
        }

        /**切换状态**/
        async function fetchAccountConsumerStatus() {
            const node = state.select[0]
            const nextStatus = node.status === 'enable' ? 'disable' : 'enable'
            const nextLabel = nextStatus === 'enable' ? '启用' : '禁用'
            return await fetchDialogService({
                title: '提示',
                type: 'warning',
                content: (
                    <common-content-text depth={1}>
                        确认将客户【{node.name}】状态变更为【{nextLabel}】吗？
                    </common-content-text>
                ),
                async onSubmit(done: Function) {
                    return await done({ loading: true }).then(async () => {
                        try {
                            await Service.httpBaseFinanceUpdateClientStatus({ keyId: node.keyId, status: nextStatus })
                            await fetchRefresh()
                            return await done({ visible: false })
                        } catch (err) {
                            await done({ loading: false })
                            return await fetchNotifyService({ type: 'error', title: err.message })
                        }
                    })
                }
            })
        }

        return () => (
            <layout-common-container initialize={state.initialize}>
                <common-database-search
                    function-class="justify-end"
                    function={['search', 'restore', 'collapse', 'deploy', 'abstract']}
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
                        <common-element-button type="primary" onClick={fetchAccountConsumerCreate}>
                            新增
                        </common-element-button>
                        <common-element-button
                            dashed
                            type="primary"
                            disabled={instState.value.isUpdate}
                            onClick={fetchAccountConsumerUpdate}
                        >
                            编辑
                        </common-element-button>
                        <common-element-button
                            dashed
                            type="warning"
                            disabled={instState.value.isUpdate}
                            onClick={fetchAccountConsumerStatus}
                        >
                            切换状态
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
                    <common-database-search-column prop="status" label="状态">
                        <n-select
                            clearable
                            placeholder="请选择状态"
                            v-model:value={formState.value.status}
                            options={[
                                { label: '启用', value: 'enable' },
                                { label: '禁用', value: 'disable' }
                            ]}
                            on-update:value={() => fetchRefresh()}
                        />
                    </common-database-search-column>
                    <common-database-search-column prop="payMode" label="付款模式">
                        <n-select
                            clearable
                            placeholder="请选择付款模式"
                            v-model:value={formState.value.payMode}
                            options={[
                                { label: '预付', value: 'prepaid' },
                                { label: '后付', value: 'postpaid' }
                            ]}
                            on-update:value={() => fetchRefresh()}
                        />
                    </common-database-search-column>
                    <common-database-search-column prop="authStatus" label="认证状态">
                        <n-select
                            clearable
                            placeholder="请选择认证状态"
                            v-model:value={formState.value.authStatus}
                            options={[
                                { label: '未认证', value: 'unverified' },
                                { label: '认证中', value: 'pending' },
                                { label: '已认证', value: 'verified' },
                                { label: '认证失败', value: 'rejected' }
                            ]}
                            on-update:value={() => fetchRefresh()}
                        />
                    </common-database-search-column>
                    <common-database-search-column prop="source" label="注册来源">
                        <n-select
                            clearable
                            placeholder="请选择注册来源"
                            v-model:value={formState.value.source}
                            options={[
                                { label: '平台注册', value: 'platform' },
                                { label: '手动创建', value: 'manual' }
                            ]}
                            on-update:value={() => fetchRefresh()}
                        />
                    </common-database-search-column>
                </common-database-search>
                <common-database-table
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
                                element="chunk"
                                value={data.status}
                                options={chunkState.CHUNK_CLIENT_STATUS}
                            ></common-database-table-chunk>
                        ),
                        col_payMode: (data: Omix) => (
                            <common-database-table-chunk
                                element="chunk"
                                value={data.payMode}
                                options={chunkState.CHUNK_CLIENT_PAY_MODE}
                            ></common-database-table-chunk>
                        ),
                        col_authStatus: (data: Omix) => {
                            const map: Omix = {
                                unverified: { type: 'default', label: '未认证' },
                                pending: { type: 'warning', label: '认证中' },
                                verified: { type: 'success', label: '已认证' },
                                rejected: { type: 'error', label: '认证失败' }
                            }
                            const item = map[data.authStatus] ?? { type: 'default', label: data.authStatus }
                            return (
                                <n-tag type={item.type} size="small">
                                    {item.label}
                                </n-tag>
                            )
                        },
                        col_source: (data: Omix) => {
                            const map: Omix = {
                                platform: { type: 'info', label: '平台注册' },
                                manual: { type: 'success', label: '手动创建' }
                            }
                            const item = map[data.source] ?? { type: 'default', label: data.source }
                            return (
                                <n-tag type={item.type} size="small">
                                    {item.label}
                                </n-tag>
                            )
                        }
                    }}
                </common-database-table>
            </layout-common-container>
        )
    }
})
</script>
