<script lang="tsx">
import { defineComponent } from 'vue'
import { useColumnService } from '@/hooks'
import { fetchDialogService, fetchNotifyService } from '@/plugins'
import * as feedback from '@/components/finance/hooks'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'FinanceDeployRatesSms',
    setup(props, ctx) {
        /**表格实例**/
        const { formRef, formState, state, chunkState, instState, instOptions, fetchRefresh } = useColumnService({
            request: (base, payload) => Service.httpBaseFinanceColumnBasicSmsRate(payload),
            keyName: 'chatbok:finance:deploy:rates:sms',
            chunkNames: { CHUNK_BRAND_STATUS: true },
            formState: {
                code: undefined,
                mcc: undefined,
                status: undefined
            },
            columns: [
                { title: '国家/地区编码', key: 'code', minWidth: 120, check: true },
                { title: '移动国家代码 (MCC)', key: 'mcc', minWidth: 140, check: true },
                { title: '上行短信价格 (USD)', key: 'upUsd', minWidth: 160, check: true },
                { title: '下行短信价格 (USD)', key: 'downUsd', minWidth: 160, check: true },
                { title: '备注', key: 'remark', minWidth: 150, ellipsis: { tooltip: true }, check: true },
                { title: '状态', key: 'status', minWidth: 100, check: true },
                { title: '创建人', key: 'createBy', minWidth: 120, check: true },
                { title: '更新人', key: 'modifyBy', minWidth: 120, check: true },
                { title: '创建时间', key: 'createTime', width: 160, check: true },
                { title: '更新时间', key: 'modifyTime', width: 160, check: true }
            ]
        })

        /**新增**/
        async function fetchDeployRatesSmsCreate() {
            return await feedback.fetchFinanceDeployRatesSms({
                title: '新增基础价格',
                command: 'CREATE',
                async onSubmit() {
                    return await fetchRefresh()
                }
            })
        }

        /**编辑**/
        async function fetchDeployRatesSmsUpdate() {
            return await feedback.fetchFinanceDeployRatesSms({
                title: '编辑基础价格',
                command: 'UPDATE',
                node: state.select[0],
                async onSubmit() {
                    return await fetchRefresh()
                }
            })
        }

        /**切换状态**/
        async function fetchDeployRatesSmsStatus() {
            const node = state.select[0]
            const nextStatus = node.status === 'enable' ? 'disable' : 'enable'
            const nextLabel = nextStatus === 'enable' ? '启用' : '禁用'
            return await fetchDialogService({
                title: '提示',
                type: 'warning',
                content: <common-content-text depth={1}>确认将配置项状态变更为【{nextLabel}】吗？</common-content-text>,
                async onSubmit(done: Function) {
                    return await done({ loading: true }).then(async () => {
                        try {
                            await Service.httpBaseFinanceUpdateBasicSmsRateStatus({ keyId: node.keyId, status: nextStatus })
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
                        <common-element-button type="primary" onClick={fetchDeployRatesSmsCreate}>
                            新增
                        </common-element-button>
                        <common-element-button
                            dashed
                            type="primary"
                            disabled={instState.value.isUpdate}
                            onClick={fetchDeployRatesSmsUpdate}
                        >
                            编辑
                        </common-element-button>
                        <common-element-button
                            dashed
                            type="warning"
                            disabled={instState.value.isUpdate}
                            onClick={fetchDeployRatesSmsStatus}
                        >
                            切换状态
                        </common-element-button>
                    </common-database-search-function>
                    <common-database-search-column prop="code" label="编码">
                        <form-common-column-input
                            clearable
                            placeholder="请输入国家/地区编码"
                            v-model:value={formState.value.code}
                            on-submit={fetchRefresh}
                        ></form-common-column-input>
                    </common-database-search-column>
                    <common-database-search-column prop="mcc" label="MCC">
                        <form-common-column-input
                            clearable
                            placeholder="请输入MCC"
                            v-model:value={formState.value.mcc}
                            on-submit={fetchRefresh}
                        ></form-common-column-input>
                    </common-database-search-column>
                    <common-database-search-column prop="status" label="状态">
                        <form-common-column-select
                            placeholder="请选择状态"
                            options={chunkState.CHUNK_BRAND_STATUS}
                            v-model:value={formState.value.status}
                        ></form-common-column-select>
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
                        col_upUsd: (data: Omix) => <n-text>{data.upUsd !== undefined ? (data.upUsd / 1000000).toFixed(6) : '--'}</n-text>,
                        col_downUsd: (data: Omix) => (
                            <n-text>{data.downUsd !== undefined ? (data.downUsd / 1000000).toFixed(6) : '--'}</n-text>
                        ),
                        col_status: (data: Omix) => (
                            <n-tag type={data.status === 'enable' ? 'success' : 'error'} size="small">
                                {data.status === 'enable' ? '启用' : '禁用'}
                            </n-tag>
                        ),
                        col_createBy: (data: Omix) => (
                            <common-database-table-user element="text" data={data.createBy}></common-database-table-user>
                        ),
                        col_modifyBy: (data: Omix) => (
                            <common-database-table-user element="text" data={data.modifyBy}></common-database-table-user>
                        )
                    }}
                </common-database-table>
            </layout-common-container>
        )
    }
})
</script>
