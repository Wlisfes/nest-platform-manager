<script lang="tsx">
import { defineComponent, onBeforeMount } from 'vue'
import { useColumnService, fetchKineColumns } from '@/hooks/hook-service'
import { useState } from '@/hooks/hook-state'
import { useSelectService } from '@/hooks/hook-chunk'
import { fetchDialogService, fetchNotifyService } from '@/plugins'
import * as feedback from '@/components/deploy/hooks'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'DeploySystemCommonRoleUser',
    props: {
        /**选中ID**/
        keyId: { type: String }
    },
    setup(props, ctx) {
        console.log(props.keyId)
        const { state, form, full, setState, toggle, fetchCheckboxs, fetchRefresh } = useColumnService({
            root: document.querySelector('.deploy-system-role-container'),
            request: (data, base, opts) => Service.httpBaseSystemColumnRoleUser(opts.body),
            event: 'submit',
            form: { vague: undefined, keyId: props.keyId },
            columns: fetchKineColumns(true, [
                { title: '选择框', key: 'selection', type: 'selection', check: true },
                { title: '角色ID', key: 'keyId', width: 200, check: true },
                { title: '角色名称', key: 'name', width: 200, check: true },
                { title: '角色描述', key: 'comment', width: 200, check: true },
                { title: '已关联用户', key: 'mumber', width: 120, align: 'center', check: true },
                { title: '状态', key: 'statusChunk', width: 100, align: 'center', check: true },
                { title: '更新人', key: 'user', width: 100, align: 'center', check: true },
                { title: '更新时间', key: 'modifyTime', width: 200, align: 'center', check: true }
            ])
        })

        return () => (
            <n-element class="deploy-system-common-role-user flex flex-col flex-1 overflow-hidden">
                <div class="m-is-224 p-12 flex items-center justify-end relative z-3 overflow-hidden">
                    <common-database-compute
                        class="flex-1"
                        element-class="flex-row-reverse justify-between"
                        keys={['refresh', 'size', 'settings', 'full']}
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
                                //onKeyup={fetchKeyup}
                                prefix={<common-element-icon size={18} name="nest-search"></common-element-icon>}
                            ></form-common-input>
                            <common-element-button content="关联员工" type="primary" icon="nest-plus"></common-element-button>
                        </n-element>
                    </common-database-compute>
                </div>
            </n-element>
        )
    }
})
</script>
