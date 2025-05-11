<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import { useSelectService } from '@/hooks/hook-chunk'
import { useFormService } from '@/hooks/hook-form'
import { fetchNotifyService } from '@/plugins'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'DeploySystemFeedbackDeptUser',
    emits: ['close', 'submit'],
    props: {
        /**标题**/
        title: { type: String, required: true },
        /**节点数据**/
        node: { type: Object as PropType<Omix>, default: () => ({}) }
    },
    setup(props, { emit }) {
        /**通用用户账号列表Options**/
        const chunkUser = useSelectService(() => Service.httpBaseSystemColumnChunkUser())
        /**表单实例**/
        const { state, form, formRef, setState, fetchValidater } = useFormService({
            form: { name: props.node.name, uid: undefined },
            rules: {
                uid: { required: true, trigger: 'blur', message: '请选择关联用户' }
            }
        })

        /**确定提交表单**/
        async function fetchSubmit() {
            return await fetchValidater().then(async error => {
                if (error) {
                    return await await setState({ loading: false, disabled: false })
                }
                try {
                    return await Service.httpBaseSystemJoinDeptUser({ keyId: props.node.keyId, uid: form.value.uid }).then(
                        async ({ message }) => {
                            return await setState({ visible: false }).then(async () => {
                                await emit('submit', { done: setState })
                                return await fetchNotifyService({ title: message })
                            })
                        }
                    )
                } catch (err) {
                    return await await setState({ loading: false, disabled: false }).then(async () => {
                        return await fetchNotifyService({ type: 'error', title: err.message })
                    })
                }
            })
        }

        return () => (
            <common-dialog-provider
                title={props.title}
                width={640}
                v-model:visible={state.visible}
                v-model:loading={state.loading}
                onSubmit={fetchSubmit}
                onCancel={() => setState({ visible: false })}
                onClose={() => emit('close', { done: setState })}
            >
                <n-form
                    require-mark-placement="left"
                    size="medium"
                    ref={formRef}
                    model={form.value}
                    rules={state.rules}
                    disabled={state.loading}
                >
                    <n-form-item label="关联部门" required>
                        <n-input placeholder="关联部门" disabled v-model:value={form.value.name}></n-input>
                    </n-form-item>
                    <n-form-item label="选择关联用户" path="uid">
                        <n-select
                            filterable
                            label-field="nickname"
                            value-field="uid"
                            placeholder="请选择关联用户"
                            options={chunkUser.dataSource.value}
                            v-model:value={form.value.uid}
                        ></n-select>
                    </n-form-item>
                </n-form>
            </common-dialog-provider>
        )
    }
})
</script>
