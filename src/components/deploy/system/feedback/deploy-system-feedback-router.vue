<script lang="tsx">
import { defineComponent, PropType, Fragment } from 'vue'
import { useSelectService } from '@/hooks/hook-selecter'
import { useChunkService } from '@/hooks/hook-chunk'
import { useFormService } from '@/hooks/hook-form'
import * as utils from '@/utils/utils-common'
import * as Service from '@/api/instance.service'
export function initState(data: Omix = {}) {
    return {
        type: data.type, //菜单类型
        name: data.name, //菜单名称
        pid: data.pid, //父级菜单
        version: data.version, //版本号
        check: data.check, //是否可见
        sort: data.sort ?? 10, //排序号
        key: data.key, //权限标识
        router: data.router, //菜单地址
        active: data.active, //激活路由
        iconName: data.iconName //菜单图标
    }
}

export default defineComponent({
    name: 'DeploySystemFeedbackRouter',
    emits: ['close', 'submit'],
    props: {
        /**操作指令**/
        command: { type: String as PropType<'CREATE' | 'UPDATE'>, default: 'CREATE' },
        /**编辑操作详情数据**/
        node: { type: Object as PropType<Omix>, default: () => ({}) }
    },
    setup(props, { emit }) {
        const { state, form, formRef, setState, setForm, fetchValidater } = useFormService({
            form: initState(),
            rules: {
                type: { required: true, message: '请选择菜单类型', trigger: 'blur' },
                name: { required: true, message: '请输入菜单名称', trigger: 'blur' },
                version: { required: true, message: '请输入版本号', trigger: 'blur' },
                check: { required: true, message: '请选择是否可见', trigger: 'blur' },
                status: { required: true, message: '请选择状态', trigger: 'blur' },
                sort: { required: true, type: 'number', message: '请输入排序号', trigger: 'blur' },
                key: { required: true, message: '请输入权限标识', trigger: 'blur' },
                router: { required: true, message: '请输入菜单地址', trigger: 'blur' }
            }
        })
        /**父级菜单Options**/
        const treeOptions = useSelectService(() => Service.httpBaseColumnTreeSystemRouter(), {
            immediate: true,
            treeNode: true
        })
        /**通用字典枚举**/
        const { COMMON_SYSTEM_ROUTER_STATUS, COMMON_SYSTEM_ROUTER_TYPE, COMMON_SYSTEM_ROUTER_CHECK } = useChunkService({
            COMMON_SYSTEM_ROUTER_STATUS: true,
            COMMON_SYSTEM_ROUTER_TYPE: true,
            COMMON_SYSTEM_ROUTER_CHECK: true,
            callback: async function (data) {
                if (utils.isEmpty(form.value.type) && data.COMMON_SYSTEM_ROUTER_TYPE.length > 0) {
                    await setForm({ type: data.COMMON_SYSTEM_ROUTER_TYPE[0].value })
                }
                return await setState({ initialize: false })
            }
        })

        /**提交参数转换**/
        async function fetchSubmitParameter(data: ReturnType<typeof initState>) {
            return await utils.fetchParameter(utils.fetchExclude(data)).then(node => {
                return node
            })
        }

        /**确定提交表单**/
        async function fetchSubmit() {
            return await fetchValidater().then(async result => {
                if (result) {
                    return await await setState({ loading: false, disabled: false })
                }
                return await fetchSubmitParameter(utils.cloneDeep(form.value)).then(async body => {
                    try {
                        return await Service.httpBaseCreateSystemRouter(body).then(async ({ message }) => {
                            return await setState({ visible: false }).then(async () => {
                                console.log(message)
                            })
                        })
                    } catch (err) {
                        return await await setState({ loading: false, disabled: false })
                    }
                })
            })
        }

        return () => (
            <common-dialog-provider
                title="编辑菜单"
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
                            options={COMMON_SYSTEM_ROUTER_CHECK.value}
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
