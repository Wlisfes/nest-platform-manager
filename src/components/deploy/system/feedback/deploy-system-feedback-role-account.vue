<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import { useFormService, useSelectService } from '@/hooks'
import { fetchNotifyService } from '@/plugins'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'DeploySystemFeedbackRoleAccount',
    emits: ['close', 'submit'],
    props: {
        /**标题**/
        title: { type: String, required: true },
        /**角色ID**/
        roleId: { type: Number as PropType<number>, required: true }
    },
    setup(props, { emit }) {
        /**表单实例**/
        const { formState, formRef, state, setState, setForm, fetchReste, fetchValidater } = useFormService({
            // callback: fetchBaseSystemDeptResolver,
            formState: {
                // name: props.node.name, //部门名称
                // alias: props.node.alias, //别名简称
                // pid: props.node.pid //上级部门
            },
            rules: {
                name: { required: true, message: '请输入部门名称', trigger: 'blur' }
            }
        })

        /**确认提交**/
        async function fetchSubmit() {}

        return () => (
            <common-dialog-provider
                title={props.title}
                width={540}
                v-model:visible={state.visible}
                v-model:loading={state.loading}
                v-model:initialize={state.initialize}
                onSubmit={fetchSubmit}
                onCancel={() => setState({ visible: false })}
                onClose={() => emit('close', { done: setState })}
            ></common-dialog-provider>
        )
    }
})
</script>
