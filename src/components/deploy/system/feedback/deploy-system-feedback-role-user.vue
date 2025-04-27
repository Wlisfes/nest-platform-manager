<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import { useChunkService } from '@/hooks/hook-chunk'
import { useFormService } from '@/hooks/hook-form'
import { fetchNotifyService } from '@/plugins'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'DeploySystemFeedbackRoleUser',
    emits: ['close', 'submit'],
    props: {
        /**标题**/
        title: { type: String, required: true },
        /**编辑操作详情数据**/
        node: { type: Object as PropType<Omix>, default: () => ({}) }
    },
    setup(props, { emit }) {
        const { state, form, formRef, setState, fetchValidater } = useFormService({
            callback: fetchCallback,
            form: { keys: [] },
            rules: {}
        })

        /**表达初始化回调**/
        async function fetchCallback() {
            try {
                return await Service.httpBaseSystemRoleResolver({ keyId: props.node.keyId }).then(async ({ data }) => {
                    console.log(data)

                    return await setState({ initialize: false })
                })
            } catch (err) {
                return await setState({ initialize: false }).then(async () => {
                    return await fetchNotifyService({ type: 'error', title: err.message })
                })
            }
        }

        /**确定提交表单**/
        async function fetchSubmit() {
            return await fetchValidater().then(async error => {
                if (error) {
                    return await await setState({ loading: false, disabled: false })
                }
                try {
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
                v-model:initialize={state.initialize}
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
                    <n-form-item label="选择关联用户" path="keys">
                        {/* <n-select
                            label-field="name"
                            value-field="value"
                            placeholder="请选择角色数据权限"
                            options={chunk.COMMON_SYSTEM_ROLE_MODEL}
                            v-model:value={form.value.model}
                        ></n-select> */}
                    </n-form-item>
                </n-form>
            </common-dialog-provider>
        )
    }
})
</script>
