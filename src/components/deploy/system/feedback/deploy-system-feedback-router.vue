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
                type: props.node.type, //菜单类型
                name: props.node.name, //菜单名称
                pid: props.node.pid, //父级菜单
                version: props.node.version, //版本号
                status: props.node.status, //状态
                check: Number(props.node.check ?? 1), //是否可见
                sort: props.node.sort ?? 10, //排序号
                key: props.node.key, //权限标识
                router: props.node.router, //菜单地址
                active: props.node.active, //激活路由
                iconName: props.node.iconName //菜单图标
            },
            option: {
                COMMON_SYSTEM_ROUTER_CHECK: [
                    { value: 1, name: '显示' },
                    { value: 0, name: '隐藏' }
                ]
            },
            rules: {
                type: { required: true, message: '请选择菜单类型', trigger: 'blur' },
                name: { required: true, message: '请输入菜单名称', trigger: 'blur' },
                version: { required: true, message: '请输入版本号', trigger: 'blur' },
                status: { required: true, message: '请选择状态', trigger: 'blur' },
                check: { required: true, type: 'number', message: '请选择是否可见', trigger: 'blur' },
                sort: { required: true, type: 'number', message: '请输入排序号', trigger: 'blur' },
                key: { required: true, message: '请输入权限标识', trigger: 'blur' },
                router: { required: true, message: '请输入菜单地址', trigger: 'blur' }
            }
        })
        /**父级菜单Options**/
        const treeOptions = useSelectService(() => Service.httpBaseColumnTreeSystemRouter(), {
            immediate: false
        })
        /**通用字典枚举**/
        const { fetchRequest, COMMON_SYSTEM_ROUTER_STATUS, COMMON_SYSTEM_ROUTER_TYPE } = useChunkService({
            immediate: false,
            COMMON_SYSTEM_ROUTER_STATUS: true,
            COMMON_SYSTEM_ROUTER_TYPE: true
        })

        /**表达初始化回调**/
        async function fetchCallback() {
            return await Promise.all([fetchRequest(), treeOptions.fetchRequest()]).then(async () => {
                if (utils.isEmpty(form.value.type) && COMMON_SYSTEM_ROUTER_TYPE.value.length > 0) {
                    await setForm({ type: COMMON_SYSTEM_ROUTER_TYPE.value[0].value })
                }
                return await setState({ initialize: false })
            })
        }

        /**提交参数转换**/
        async function fetchSubmitParameter(data: typeof form.value) {
            return await utils.fetchExclude({ ...data, check: Boolean(data.check) })
        }

        /**创建菜单**/
        async function fetchBaseCreateSystemRouter(body: Omix) {
            return await Service.httpBaseCreateSystemRouter(body).then(async ({ message }) => {
                return await setState({ visible: false }).then(async () => {
                    await emit('submit', { done: setState })
                    return await fetchNotifyService({ title: message })
                })
            })
        }

        /**编辑菜单**/
        async function fetchBaseUpdateSystemRouter(body: Omix) {
            return await Service.httpBaseUpdateSystemRouter({ ...body, keyId: props.node.keyId }).then(async ({ message }) => {
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
                return await fetchSubmitParameter(form.value).then(async body => {
                    try {
                        if (props.command === 'CREATE') {
                            return await fetchBaseCreateSystemRouter(body)
                        } else {
                            return await fetchBaseUpdateSystemRouter(body)
                        }
                    } catch (err) {
                        return await await setState({ loading: false, disabled: false }).then(async () => {
                            return await fetchNotifyService({ type: 'error', title: err.message })
                        })
                    }
                })
            })
        }

        return () => (
            <common-dialog-provider
                title={props.title}
                width={840}
                v-model:visible={state.visible}
                v-model:loading={state.loading}
                v-model:initialize={state.initialize}
                onSubmit={fetchSubmit}
                onCancel={() => setState({ visible: false })}
                onClose={() => emit('close', { done: setState })}
            >
                <n-form
                    class="grid-columns-2 gap-col-20"
                    require-mark-placement="left"
                    size="medium"
                    ref={formRef}
                    model={form.value}
                    rules={state.rules}
                    disabled={state.loading}
                >
                    <n-form-item label="菜单类型" path="type">
                        <n-select
                            label-field="name"
                            value-field="value"
                            placeholder="请选择菜单类型"
                            options={COMMON_SYSTEM_ROUTER_TYPE.value}
                            v-model:value={form.value.type}
                        ></n-select>
                    </n-form-item>
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
                    <n-form-item label="状态" path="status">
                        <n-select
                            label-field="name"
                            value-field="value"
                            placeholder="请选择状态"
                            options={COMMON_SYSTEM_ROUTER_STATUS.value}
                            v-model:value={form.value.status}
                        ></n-select>
                    </n-form-item>
                    <n-form-item label="是否可见" path="check">
                        <n-select
                            label-field="name"
                            value-field="value"
                            placeholder="请选择是否可见"
                            options={state.COMMON_SYSTEM_ROUTER_CHECK}
                            v-model:value={form.value.check}
                        ></n-select>
                    </n-form-item>
                    {form.value.type === 'router' && (
                        <Fragment>
                            <n-form-item label="菜单地址" path="router">
                                <n-input maxlength={255} placeholder="请输入菜单地址" v-model:value={form.value.router}></n-input>
                            </n-form-item>
                            <n-form-item label="激活路由" path="active">
                                <n-input maxlength={255} placeholder="请输入激活路由" v-model:value={form.value.active}></n-input>
                            </n-form-item>
                            <n-form-item label="菜单图标" path="iconName">
                                <n-input maxlength={255} placeholder="请输入激活路由" v-model:value={form.value.active}></n-input>
                            </n-form-item>
                        </Fragment>
                    )}
                </n-form>
            </common-dialog-provider>
        )
    }
})
</script>
