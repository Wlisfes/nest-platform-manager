<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import { useFormService } from '@/hooks'
import { fetchNotifyService } from '@/plugins'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'DeploySystemFeedbackAccount',
    emits: ['close', 'submit'],
    props: {
        /**标题**/
        title: { type: String, required: true },
        /**操作指令**/
        command: { type: String as PropType<'CREATE'>, default: 'CREATE' }
    },
    setup(props, { emit }) {
        const { formState, formRef, state, setState, setForm, fetchReste, fetchValidater } = useFormService({
            formState: {
                name: undefined, //姓名
                number: undefined, //工号
                phone: undefined, //手机号
                email: undefined, //邮箱
                password: undefined, //密码
                avatar: undefined, //头像
                status: 'online' //状态
            },
            rules: {
                name: { required: true, message: '请输入姓名', trigger: 'blur' },
                number: { required: true, message: '请输入工号', trigger: 'blur' },
                phone: { required: true, message: '请输入手机号', trigger: 'blur' },
                password: { required: true, message: '请输入密码', trigger: 'blur' },
                status: { required: true, message: '请选择状态', trigger: 'blur' }
            }
        })

        /**确定提交表单**/
        async function fetchSubmit() {
            return await fetchValidater().then(async error => {
                if (error) {
                    return await setState({ loading: false, disabled: false })
                }
                try {
                    if (['CREATE'].includes(props.command)) {
                        await Service.httpBaseSystemCreateAccount(formState.value)
                    }
                    return await setState({ visible: false }).then(async () => {
                        await emit('submit', { done: setState })
                        return await fetchNotifyService({ title: '操作成功' })
                    })
                } catch (err) {
                    return await setState({ loading: false, disabled: false }).then(async () => {
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
                <form-common-container
                    class="grid-auto-350 gap-col-20"
                    require-mark-placement="left"
                    size="medium"
                    ref={formRef}
                    model={formState.value}
                    rules={state.rules}
                    disabled={state.loading}
                >
                    <form-common-column label="姓名" path="name">
                        <form-common-column-input
                            maxlength={32}
                            placeholder="请输入姓名"
                            v-model:value={formState.value.name}
                        ></form-common-column-input>
                    </form-common-column>
                    <form-common-column label="工号" path="number">
                        <form-common-column-input
                            maxlength={4}
                            placeholder="请输入工号（4位）"
                            v-model:value={formState.value.number}
                        ></form-common-column-input>
                    </form-common-column>
                    <form-common-column label="手机号" path="phone">
                        <form-common-column-input
                            maxlength={11}
                            placeholder="请输入手机号"
                            v-model:value={formState.value.phone}
                        ></form-common-column-input>
                    </form-common-column>
                    <form-common-column label="邮箱" path="email">
                        <form-common-column-input
                            maxlength={128}
                            placeholder="请输入邮箱"
                            v-model:value={formState.value.email}
                        ></form-common-column-input>
                    </form-common-column>
                    <form-common-column label="密码" path="password">
                        <form-common-column-input
                            maxlength={32}
                            placeholder="请输入密码（6~32位）"
                            v-model:value={formState.value.password}
                        ></form-common-column-input>
                    </form-common-column>
                    <form-common-column label="状态" path="status">
                        <n-select
                            placeholder="请选择状态"
                            v-model:value={formState.value.status}
                            options={[
                                { label: '在职', value: 'online' },
                                { label: '离职', value: 'disable' }
                            ]}
                        />
                    </form-common-column>
                </form-common-container>
            </common-dialog-provider>
        )
    }
})
</script>
