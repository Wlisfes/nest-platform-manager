<script lang="tsx">
import { defineComponent, PropType, Fragment } from 'vue'
import { useSelectService } from '@/hooks/hook-selecter'
import { useChunkService } from '@/hooks/hook-chunk'
import { useFormService } from '@/hooks/hook-form'
import { fetchNotifyService } from '@/plugins'
import * as utils from '@/utils/utils-common'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'DeploySystemFeedbackRouter',
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
        const { state, form, formRef, setState, setForm, fetchValidater } = useFormService({
            callback: fetchCallback,
            form: {
                name: props.node.name ?? '工作台', //菜单名称
                pid: props.node.pid, //父级菜单
                version: props.node.version ?? 'v1.0.0', //版本号
                status: props.node.status ?? 'enable', //状态
                check: props.node.check ?? 'show', //显示状态
                sort: props.node.sort ?? 10, //排序号
                key: props.node.key ?? 'chatbok:manager', //权限标识
                router: props.node.router ?? '/manager', //菜单地址
                active: props.node.active, //激活路由
                icon: props.node.icon //菜单图标
            },
            rules: {
                type: { required: true, message: '请选择菜单类型', trigger: 'blur' },
                name: { required: true, message: '请输入菜单名称', trigger: 'blur' },
                version: { required: true, message: '请输入版本号', trigger: 'blur' },
                status: { required: true, message: '请选择状态', trigger: 'blur' },
                check: { required: true, message: '请选择显示状态', trigger: 'blur' },
                sort: { required: true, type: 'number', message: '请输入排序号', trigger: 'blur' },
                key: { required: true, message: '请输入权限标识', trigger: 'blur' },
                router: { required: true, message: '请输入菜单地址', trigger: 'blur' }
            }
        })
        /**父级菜单Options**/
        const treeOptions = useSelectService(() => Service.httpBaseSystemColumnTreeRouter(), {
            immediate: false
        })
        /**通用字典枚举**/
        const chunkOptions = useChunkService({
            immediate: ['CREATE'].includes(props.command),
            type: ['CHUNK_WINDOWS_RESOUREC_STATUS', 'CHUNK_WINDOWS_RESOUREC_CHECK']
        })

        /**表达初始化回调**/
        async function fetchCallback() {
            return await setState({ initialize: false })
        }

        /**新增菜单资源**/
        async function fetchBaseSystemCreateResource(body: Omix) {
            return await Service.httpBaseSystemCreateResource(body).then(async ({ message }) => {
                return await setState({ visible: false }).then(async () => {
                    await emit('submit', { done: setState })
                    return await fetchNotifyService({ title: message })
                })
            })
        }

        /**编辑菜单**/
        async function fetchBaseSystemUpdateResource(body: Omix) {
            return await Service.httpBaseSystemUpdateResource(body).then(async ({ message }) => {
                return await setState({ visible: false }).then(async () => {
                    await emit('submit', { done: setState })
                    return await fetchNotifyService({ title: message })
                })
            })
        }

        /**确定提交表单**/
        async function fetchSubmit() {
            return await setState({ loading: true }).then(async () => {
                return await fetchValidater().then(async result => {
                    if (result) {
                        return await await setState({ loading: false })
                    }
                    try {
                        if (['CREATE'].includes(props.command)) {
                            return await fetchBaseSystemCreateResource(form.value)
                        } else if (['UPLOAD'].includes(props.command)) {
                            return await fetchBaseSystemUpdateResource({ ...form.value, keyId: props.node.keyId })
                        }
                    } catch (err) {
                        return await await setState({ loading: false }).then(async () => {
                            return await fetchNotifyService({ type: 'error', title: err.message })
                        })
                    }
                })
            })
        }

        return () => (
            <common-dialog-provider
                title={props.title}
                width={800}
                v-model:visible={state.visible}
                v-model:loading={state.loading}
                v-model:initialize={state.initialize}
                onSubmit={fetchSubmit}
                onCancel={() => setState({ visible: false })}
                onClose={() => emit('close', { done: setState })}
            >
                <n-form
                    class="grid-auto-350 gap-col-20"
                    require-mark-placement="left"
                    size="medium"
                    ref={formRef}
                    model={form.value}
                    rules={state.rules}
                    disabled={state.loading}
                >
                    <n-form-item label="菜单名称" path="name">
                        <n-input maxlength={32} placeholder="请输入菜单名称" v-model:value={form.value.name}></n-input>
                    </n-form-item>
                    <n-form-item label="父级菜单" path="pid">
                        <n-cascader
                            v-model:value={form.value.pid}
                            placeholder="请选择父级菜单"
                            expand-trigger="click"
                            label-field="name"
                            value-field="keyId"
                            options={treeOptions.dataSource.value}
                        ></n-cascader>
                    </n-form-item>
                    <n-form-item label="权限标识" path="key">
                        <n-input maxlength={128} placeholder="请输入权限标识" v-model:value={form.value.key}></n-input>
                    </n-form-item>
                    <n-form-item label="菜单地址" path="router">
                        <n-input maxlength={255} placeholder="请输入菜单地址" v-model:value={form.value.router}></n-input>
                    </n-form-item>
                    <n-form-item label="菜单状态" path="status">
                        <form-chunk-select
                            placeholder="请选择菜单状态"
                            options={chunkOptions.CHUNK_WINDOWS_RESOUREC_STATUS.value}
                            v-model:value={form.value.status}
                        ></form-chunk-select>
                    </n-form-item>
                    <n-form-item label="显示状态" path="check">
                        <form-chunk-select
                            placeholder="请选择显示状态"
                            options={chunkOptions.CHUNK_WINDOWS_RESOUREC_CHECK.value}
                            v-model:value={form.value.check}
                        ></form-chunk-select>
                    </n-form-item>
                    <n-form-item label="激活路由" path="active">
                        <n-input maxlength={255} placeholder="请输入激活路由" v-model:value={form.value.active}></n-input>
                    </n-form-item>
                    <n-form-item label="菜单图标" path="icon">
                        <n-input maxlength={255} placeholder="请选择菜单图标" v-model:value={form.value.active}></n-input>
                    </n-form-item>
                    <n-form-item label="版本号" path="version">
                        <n-input maxlength={32} placeholder="请输入版本号" v-model:value={form.value.version}></n-input>
                    </n-form-item>
                    <n-form-item label="排序号" path="sort">
                        <n-input-number
                            class="w-full"
                            min={1}
                            max={9999999}
                            precision={0}
                            placeholder="请输入排序号"
                            v-model:value={form.value.sort}
                        />
                    </n-form-item>
                </n-form>
            </common-dialog-provider>
        )
    }
})
</script>
