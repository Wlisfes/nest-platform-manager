<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import { useFormService, useChunkService, useSelectService } from '@/hooks'
import { fetchNotifyService } from '@/plugins'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'DeploySystemFeedbackAccount',
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
        /**通用字典枚举**/
        const chunkOptions = useChunkService({ type: ['CHUNK_WINDOWS_ACCOUNT_STATUS'], immediate: false })
        /**部门树结构**/
        const deptOptions = useSelectService(e => Service.httpBaseSystemDepartmentTreeStructure(), {
            immediate: false
        })
        /**表单实例**/
        const { formState, formRef, state, setState, setForm, fetchReste, fetchValidater } = useFormService({
            callback: fetchBaseSystemAccountResolver,
            formState: {
                depts: [], //归属部门
                name: undefined, //姓名
                number: undefined, //工号
                phone: undefined, //手机号
                email: undefined, //邮箱
                password: undefined, //密码
                // avatar: undefined, //头像
                status: undefined //状态
            },
            rules: {
                depts: { required: true, type: 'array', message: '请选择归属部门', trigger: 'change' },
                name: { required: true, message: '请输入姓名', trigger: 'blur' },
                number: { required: true, message: '请输入工号', trigger: 'blur' },
                phone: { required: true, message: '请输入手机号', trigger: 'blur' },
                password: { required: true, message: '请输入密码', trigger: 'blur' },
                status: { required: true, message: '请选择状态', trigger: 'blur' }
            }
        })
        /**部门详情**/
        async function fetchBaseSystemAccountResolver() {
            return await Promise.all([deptOptions.fetchRequest(), chunkOptions.fetchRequest()]).then(async () => {
                if (['CREATE'].includes(props.command)) {
                    return await setState({ initialize: false })
                }
                try {
                    return await Service.httpBaseSystemAccountResolver({ uid: props.node.uid }).then(async ({ data }) => {
                        const formOptions: Omix = fetchReste({
                            ...data,
                            depts: data.depts.map((item: Omix) => item.keyId)
                        })
                        return await setForm(formOptions).then(async () => {
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
                        await Service.httpBaseSystemCreateAccount(formState.value)
                    } else if (['UPDATE'].includes(props.command)) {
                        await Service.httpBaseSystemUpdateAccount({ ...formState.value, uid: props.node.uid })
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
                width={860}
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
                    <form-common-column label="归属部门" path="depts">
                        <form-common-column-cascader
                            multiple
                            clearable
                            cascade={false}
                            placeholder="请选择归属部门"
                            v-model:value={formState.value.depts}
                            options={deptOptions.dataSource.value}
                        ></form-common-column-cascader>
                    </form-common-column>
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
                            disabled={['UPDATE'].includes(props.command)}
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
                    {['CREATE'].includes(props.command) && (
                        <form-common-column label="密码" path="password">
                            <form-common-column-input
                                maxlength={32}
                                placeholder="请输入密码（6~32位）"
                                v-model:value={formState.value.password}
                            ></form-common-column-input>
                        </form-common-column>
                    )}
                    <form-common-column label="状态" path="status">
                        <form-common-column-select
                            placeholder="请选择状态"
                            options={chunkOptions.CHUNK_WINDOWS_ACCOUNT_STATUS.value}
                            v-model:value={formState.value.status}
                        ></form-common-column-select>
                    </form-common-column>
                </form-common-container>
            </common-dialog-provider>
        )
    }
})
</script>
