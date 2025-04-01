<script lang="tsx">
import { defineComponent } from 'vue'
import { useForm } from '@/hooks/hook-form'

export default defineComponent({
    name: 'DeploySystemFeedbackRouter',
    emits: ['close', 'submit'],
    setup(props, { emit }) {
        const { state, form, formRef, setState, setForm } = useForm({
            form: {
                name: ''
            }
        })

        async function fetchSubmit() {
            console.log('fetchSubmit')
        }

        return () => (
            <common-dialog-provider
                title="编辑菜单"
                v-model:visible={state.visible}
                onSubmit={fetchSubmit}
                onCancel={() => setState({ visible: false })}
                onClose={() => emit('close', { done: setState })}
            >
                <n-form size="medium" ref={formRef} model={form.value} rules={state.rules} disabled={state.loading}>
                    <n-form-item label="菜单名称" path="name">
                        <form-common-input
                            maxlength={32}
                            type="text"
                            placeholder="请输入菜单名称"
                            v-model:value={form.value.name}
                        ></form-common-input>
                    </n-form-item>
                </n-form>
            </common-dialog-provider>
        )
    }
})
</script>
