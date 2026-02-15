<script lang="tsx">
import { defineComponent, h } from 'vue'
import { useChunkService, useColumnService, useSelectService } from '@/hooks'
import { fetchDialogService, fetchNotifyService } from '@/plugins'
import { SendFilled } from '@vicons/carbon'
import { isEmpty, fetchHandler } from '@/utils'
import * as feedback from '@/components/deploy/hooks'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'DeploySystemDepartment',
    setup(props, ctx) {
        /**通用字典枚举**/
        const chunkOptions = useChunkService({ type: ['CHUNK_WINDOWS_RESOUREC_STATUS', 'CHUNK_WINDOWS_SHEET_CHUNK'] })
        /**菜单树结构**/
        const sheetOptions = useSelectService(e => Service.httpBaseSystemSheetTreeStructure(), {
            options: { selectedKeys: [] as Array<string>, expandedKeys: [] as Array<string> },
            callback: fetchReadyCallback
        })
        /**表格实例**/
        const { formRef, formState, state, instOptions, setForm, fetchRequest, fetchRestore, fetchRefresh } = useColumnService({
            request: (base, payload) => Service.httpBaseSystemColumnSheet(payload),
            keyName: 'chatbok:deploy:system:sheet',
            immediate: false,
            formState: {
                pid: undefined, //父级ID
                name: undefined, //菜单名称
                keyName: undefined, //权限标识
                router: undefined, //菜单地址
                version: undefined //版本号
            },
            columns: [
                { title: '部门名称', key: 'name', width: 150, disabled: true },
                { title: '别名简称', key: 'alias', minWidth: 200, check: true },
                { title: '路由地址', key: 'router', minWidth: 200, check: true },
                { title: '版本号', key: 'version', width: 100, align: 'center', check: true },
                { title: '排序号', key: 'sort', width: 100, align: 'center', check: true },
                { title: '状态', key: 'status', width: 100, align: 'center', check: true },
                { title: '创建人', key: 'createBy', width: 120, check: true },
                { title: '创建时间', key: 'createTime', width: 160, check: true },
                { title: '更新人', key: 'modifyBy', width: 120, check: true },
                { title: '更新时间', key: 'modifyTime', width: 160, check: true }
            ]
        })

        /**初始化回调**/
        async function fetchReadyCallback(data: Omix) {
            const expandeds = data.dataSource.map((item: Omix) => item.keyId)
            const selecteds = expandeds.filter((e: Omix, index: number) => [0].includes(index))
            return await sheetOptions.setState({ selectedKeys: selecteds, expandedKeys: expandeds }).then(async (event: Omix) => {
                return await setForm({ pid: selecteds[0] ?? undefined }).then(async () => {
                    return await fetchRequest()
                })
            })
        }

        /**左侧树选中变更回调**/
        async function fetchUpdateSelected(keys: Array<string>) {
            await sheetOptions.setState({ selectedKeys: keys })
            return await setForm({ pid: keys[0] as never }).then(() => {
                return fetchRefresh({ page: 1, size: state.size })
            })
        }

        /**新增菜单/按钮**/
        async function fetchDeploySheetCreate() {
            return await feedback.fetchDeploySystemSheet({
                title: '新增菜单/按钮',
                command: 'CREATE',
                onSubmit: fetchRefresh
            })
        }

        /**编辑菜单、按钮**/
        async function fetchDeploySheetUpdate() {
            return await feedback.fetchDeploySystemSheet({
                title: '编辑菜单/按钮',
                command: 'UPDATE',
                node: state.select[0],
                onSubmit: fetchRefresh
            })
        }

        /**克隆菜单、按钮**/
        async function fetchDeploySheetClone() {
            return await feedback.fetchDeploySystemSheet({
                title: '克隆菜单/按钮',
                command: 'CLONE',
                node: state.select[0],
                onSubmit: fetchRefresh
            })
        }

        return () => (
            <layout-common-container>
                <common-database-search
                    class="p-0!"
                    function-class="justify-end"
                    function={['search', 'restore', 'collapse', 'deploy', 'abstract']}
                    ref={formRef}
                    limit={state.limit}
                    v-model:loading={state.loading}
                    v-model:when={state.when}
                    v-model:database={state.database}
                    v-model:formState={formState.value}
                    on-update:database={instOptions.fetchUpdateDatabase}
                    on-restore={fetchRestore}
                    on-submit={fetchRequest}
                >
                    <common-database-search-column disabled prop="name" label="菜单名称">
                        <form-common-column-input
                            clearable
                            placeholder="请输入菜单名称"
                            v-model:value={formState.value.name}
                            on-submit={fetchRefresh}
                        />
                    </common-database-search-column>
                </common-database-search>
                <common-database-table
                    class="p-0!"
                    show-select
                    show-settings
                    limit={state.limit}
                    total={state.total}
                    columns={state.columns}
                    v-model:page={state.page}
                    v-model:size={state.size}
                    v-model:select={state.select}
                    v-model:loading={state.loading}
                    v-model:data={state.dataSource}
                    v-model:customize={state.customize}
                    on-update:customize={instOptions.fetchUpdateCustomize}
                    on-update:page={(page: number) => fetchRefresh({ page })}
                    on-update:size={(size: number) => fetchRefresh({ page: 1, size })}
                ></common-database-table>
            </layout-common-container>
        )
    }
})
</script>
