<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import { useSelectService } from '@/hooks/hook-selecter'
import { useFormService } from '@/hooks/hook-form'
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
        const { state, form, formRef, setState, fetchValidater } = useFormService({
            callback: fetchCallback,
            form: {
                name: props.node.name,
                bit: props.node.bit,
                pid: props.node.pid
            },
            rules: {
                pid: { required: true, trigger: 'blur', message: '选择上级部门' },
                name: { required: true, trigger: 'blur', message: '请输入角色名称' }
            }
        })
        /**上级部门Options**/
        const { dataSource, fetchRequest } = useSelectService(() => Service.httpBaseSystemDeptCascader(), {
            immediate: false
        })

        /**表达初始化回调**/
        async function fetchCallback() {
            return await fetchRequest().then(async () => {
                return await setState({ initialize: false })
            })
        }

        /**创建**/
        async function fetchBaseCreate(body: Omix) {
            return await Service.httpBaseSystemDeptCreate({ ...body }).then(async ({ message }) => {
                return await setState({ visible: false }).then(async () => {
                    await emit('submit', { done: setState })
                    return await fetchNotifyService({ title: message })
                })
            })
        }

        /**编辑**/
        async function fetchBaseUpdate(body: Omix) {
            return await Service.httpBaseSystemDeptUpdate({ ...body, keyId: props.node.keyId }).then(async ({ message }) => {
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
                        return await fetchBaseCreate(form.value)
                    } else {
                        return await fetchBaseUpdate(form.value)
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
                    <n-form-item label="上级部门" path="pid">
                        <n-cascader
                            v-model:value={form.value.pid}
                            placeholder="请选择父级菜单"
                            expand-trigger="click"
                            label-field="name"
                            value-field="keyId"
                            options={dataSource.value}
                        ></n-cascader>
                    </n-form-item>
                    <n-form-item label="角色名称" path="name">
                        <n-input placeholder="请输入菜单名称" maxlength={32} v-model:value={form.value.name}></n-input>
                    </n-form-item>
                    <n-form-item label="部门简称" path="bit">
                        <n-input placeholder="请输入部门简称" maxlength={4} v-model:value={form.value.bit}></n-input>
                    </n-form-item>
                </n-form>
            </common-dialog-provider>
        )
    }
})
</script>
