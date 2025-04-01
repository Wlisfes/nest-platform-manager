<script lang="tsx">
import { defineComponent } from 'vue'
import { useForm } from '@/hooks/hook-form'

export default defineComponent({
    name: 'DeploySystemFeedbackRouter',
    emits: ['close', 'submit'],
    setup(props, { emit }) {
        const { state, form, formRef, setState, setForm } = useForm({
            form: {}
        })

        return () => (
            <common-dialog-provider title="编辑菜单" v-model:visible={state.visible} onClose={() => emit('close', { done: setState })}>
                <common-element class="flex-1 bg-red">
                    {Array.from({ length: 5 }, (x, index) => (
                        <n-h3>{`权限管理 ${index}`}</n-h3>
                    ))}
                </common-element>
            </common-dialog-provider>
        )
    }
})
</script>
