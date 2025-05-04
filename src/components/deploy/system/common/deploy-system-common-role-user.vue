<script lang="tsx">
import { defineComponent, watch } from 'vue'
import { useColumnService, fetchKineColumns } from '@/hooks/hook-service'
import { useState } from '@/hooks/hook-state'
import { useSelectService } from '@/hooks/hook-chunk'
import { fetchDialogService, fetchNotifyService } from '@/plugins'
import { enter } from '@/utils/utils-common'
import * as feedback from '@/components/deploy/hooks'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'DeploySystemCommonRoleUser',
    props: {
        /**选中ID**/
        keyId: { type: String }
    },
    setup(props, ctx) {
        const { state, form, full, setState, toggle, fetchCheckboxs, fetchRefresh } = useColumnService({
            root: document.querySelector('.deploy-system-role-container'),
            request: (data, base, opts) => Service.httpBaseSystemColumnRoleUser({ ...data, keyId: props.keyId }),
            event: 'submit',
            form: { vague: undefined },
            columns: fetchKineColumns(true, [
                { title: '头像', key: 'avatar', width: 120, check: true },
                { title: '员工名称', key: 'name', width: 200, check: true },
                { title: '操作时间', key: 'modifyTime', width: 200, align: 'center', check: true }
            ])
        })

        watch(() => props.keyId, fetchWatchRefresh, { immediate: true })
        async function fetchWatchRefresh() {
            return await fetchRefresh()
        }

        return () => (
            <n-element class="deploy-system-common-role-user flex flex-col flex-1 overflow-hidden">
                <div class="m-is-224 p-12 flex items-center justify-end relative z-3 overflow-hidden">
                    <common-database-compute
                        class="flex-1"
                        element-class="flex-row-reverse justify-between"
                        keys={['refresh', 'size', 'full']}
                        v-model:full={full.value}
                        v-model:loading={state.loading}
                        v-model:columns={state.columns}
                        toggle={toggle}
                        onRefresh={fetchRefresh}
                        onCheckboxs={fetchCheckboxs}
                    >
                        <n-element class="flex flex-1 gap-12 items-center justify-end">
                            <form-common-input
                                class="flex-1 max-w-320"
                                v-model:value={form.value.vague}
                                placeholder="请输入员工姓名、工号"
                                clearable
                                onKeyup={(e: KeyboardEvent) => enter(e, () => fetchRefresh())}
                                prefix={<common-element-icon size={18} name="nest-search"></common-element-icon>}
                            ></form-common-input>
                            <common-element-button content="关联员工" type="primary" icon="nest-plus"></common-element-button>
                        </n-element>
                    </common-database-compute>
                </div>
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
                            avatar: (data: Omix, node: Omix) => (
                                <div class="flex items-center">
                                    {node.user.avatar ? (
                                        <n-avatar size="medium" src={node.user.avatar}></n-avatar>
                                    ) : (
                                        <n-avatar size="medium" style={{ backgroundColor: 'var(--primary-color)' }}>
                                            {node.user.name.slice(0, 1)}
                                        </n-avatar>
                                    )}
                                </div>
                            ),
                            name: (data: Omix, node: Omix) => (
                                <common-database-chunk element="text">{`${node.user.name} ${node.user.number}`}</common-database-chunk>
                            ),
                            command: (node: Omix, base: Omix<{ center: boolean }>) => {
                                return (
                                    <n-element class="flex items-center gap-10 justify-center">
                                        <common-element-button
                                            database
                                            text
                                            content="移除"
                                            type="error"
                                            icon="nest-delete"
                                            icon-size={16}
                                            //onClick={() => fetchCommand({ node, command: 'DELETE', type: 'error', title: '删除' })}
                                        ></common-element-button>
                                    </n-element>
                                )
                            }
                        }}
                    </common-database-table>
                </common-database-container>
            </n-element>
        )
    }
})
</script>
