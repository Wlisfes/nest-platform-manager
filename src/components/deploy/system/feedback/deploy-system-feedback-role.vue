<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import { useChunkService } from '@/hooks/hook-chunk'
import { useFormService } from '@/hooks/hook-form'
import { fetchNotifyService } from '@/plugins'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'DeploySystemFeedbackRole',
    emits: ['close', 'submit'],
    props: {
        /**标题**/
        title: { type: String, required: true },
        /**操作指令**/
        command: { type: String as PropType<'CREATE' | 'UPDATE'>, default: 'CREATE' },
        /**编辑操作详情数据**/
        node: { type: Object as PropType<Omix>, default: () => ({}) }
    },
    setup(props, { emit }) {
        const { state, form, formRef, setState, fetchValidater } = useFormService({
            callback: fetchCallback,
            form: {
                name: props.node.name,
                model: props.node.model,
                status: props.node.status,
                comment: props.node.comment
            },
            rules: {
                name: { required: true, trigger: 'blur', message: '请输入菜单名称' },
                model: { required: true, trigger: 'blur', message: '请选择角色数据权限' },
                status: { required: true, trigger: 'blur', message: '请选择角色状态' }
            }
        })
        /**通用字典枚举**/
        const { chunk, fetchRequest } = useChunkService({ COMMON_SYSTEM_ROLE_STATUS: true, COMMON_SYSTEM_ROLE_MODEL: true })

        /**表达初始化回调**/
        async function fetchCallback() {
            return await fetchRequest().then(async () => {
                return await setState({ initialize: false })
            })
        }

        /**创建角色**/
        async function fetchBaseSystemRoleCreate(body: Omix) {
            return await Service.httpBaseSystemRoleCreate({ ...body }).then(async ({ message }) => {
                return await setState({ visible: false }).then(async () => {
                    await emit('submit', { done: setState })
                    return await fetchNotifyService({ title: message })
                })
            })
        }

        /**编辑角色**/
        async function fetchBaseSystemRoleUpdate(body: Omix) {
            return await Service.httpBaseSystemRoleUpdate({ ...body, keyId: props.node.keyId }).then(async ({ message }) => {
                return await setState({ visible: false }).then(async () => {
                    await emit('submit', { done: setState })
                    return await fetchNotifyService({ title: message })
                })
            })
        }

        /**确定提交表单**/
        async function fetchSubmit() {
            return await fetchValidater().then(async result => {
                if (result) {
                    return await await setState({ loading: false, disabled: false })
                }
                try {
                    if (props.command === 'CREATE') {
                        return await fetchBaseSystemRoleCreate(form.value)
                    } else {
                        return await fetchBaseSystemRoleUpdate(form.value)
                    }
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
                    <n-form-item label="角色名称" path="name">
                        <n-input placeholder="请输入菜单名称" maxlength={32} v-model:value={form.value.name}></n-input>
                    </n-form-item>
                    <n-form-item label="角色数据权限" path="model">
                        <n-select
                            label-field="name"
                            value-field="value"
                            placeholder="请选择角色数据权限"
                            options={chunk.COMMON_SYSTEM_ROLE_MODEL}
                            v-model:value={form.value.model}
                        ></n-select>
                    </n-form-item>
                    <n-form-item label="角色状态" path="status">
                        <form-chunk-custom-select
                            placeholder="请选择角色状态"
                            options={chunk.COMMON_SYSTEM_ROLE_STATUS}
                            v-model:value={form.value.status}
                        ></form-chunk-custom-select>
                    </n-form-item>
                    <n-form-item label="角色描述" path="comment">
                        <n-input
                            type="textarea"
                            placeholder="请输入角色描述"
                            maxlength={128}
                            autosize={{ minRows: 2, maxRows: 5 }}
                            v-model:value={form.value.comment}
                        ></n-input>
                    </n-form-item>
                </n-form>
            </common-dialog-provider>
        )
    }
})
</script>
