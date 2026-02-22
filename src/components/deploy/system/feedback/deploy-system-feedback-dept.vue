<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import { useFormService, useSelectService } from '@/hooks'
import { fetchNotifyService } from '@/plugins'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'DeploySystemFeedbackDept',
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
        const { formState, formRef, state, setState, setForm, fetchReste, fetchValidater } = useFormService({
            callback: fetchBaseSystemDeptResolver,
            formState: {
                name: props.node.name, //部门名称
                alias: props.node.alias, //别名简称
                pid: props.node.pid //上级部门
            },
            rules: {
                name: { required: true, message: '请输入部门名称', trigger: 'blur' }
            }
        })
        /**部门树结构**/
        const deptTreeOptions = useSelectService(() => Service.httpBaseSystemDepartmentTreeStructure(), {
            immediate: ['CREATE'].includes(props.command)
        })
        /**部门详情**/
        async function fetchBaseSystemDeptResolver() {
            if (['CREATE'].includes(props.command)) {
                return await setState({ initialize: false })
            }
            return await setState({ initialize: true }).then(async () => {
                try {
                    await deptTreeOptions.fetchRequest()
                    return await Service.httpBaseSystemDepartmentResolver({ keyId: props.node.keyId }).then(async ({ data }) => {
                        return await setForm(fetchReste(data)).then(async () => {
                            return await setState({ initialize: false })
                        })
                    })
                } catch (err) {
                    return await setState({ initialize: false }).then(async () => {
                        return await fetchNotifyService({ type: 'error', title: err.message })
                    })
                }
            })
        }
        /**确定提交表单**/
        async function fetchSubmit() {
            return await fetchValidater().then(async error => {
                if (error) {
                    return await setState({ loading: false, disabled: false })
                }
                try {
                    if (['CREATE'].includes(props.command)) {
                        await Service.httpBaseSystemCreateDepartment(formState.value)
                    } else if (['UPDATE'].includes(props.command)) {
                        await Service.httpBaseSystemUpdateDepartment({ ...formState.value, keyId: props.node.keyId })
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
                width={540}
                v-model:visible={state.visible}
                v-model:loading={state.loading}
                v-model:initialize={state.initialize}
                onSubmit={fetchSubmit}
                onCancel={() => setState({ visible: false })}
                onClose={() => emit('close', { done: setState })}
            >
                <form-common-container
                    require-mark-placement="left"
                    size="medium"
                    ref={formRef}
                    model={formState.value}
                    rules={state.rules}
                    disabled={state.loading}
                >
                    <form-common-column label="上级部门" path="pid">
                        <form-common-column-cascader
                            v-model:value={formState.value.pid}
                            placeholder="请选择上级部门"
                            expand-trigger="click"
                            options={deptTreeOptions.dataSource.value}
                        ></form-common-column-cascader>
                    </form-common-column>
                    <form-common-column label="部门名称" path="name">
                        <form-common-column-input
                            maxlength={32}
                            placeholder="请输入部门名称"
                            v-model:value={formState.value.name}
                        ></form-common-column-input>
                    </form-common-column>
                    <form-common-column label="别名简称" path="alias">
                        <form-common-column-input
                            maxlength={4}
                            placeholder="请输入别名简称"
                            v-model:value={formState.value.alias}
                        ></form-common-column-input>
                    </form-common-column>
                </form-common-container>
            </common-dialog-provider>
        )
    }
})
</script>
