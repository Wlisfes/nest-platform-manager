<script lang="tsx">
import { defineComponent, onMounted, Fragment, PropType } from 'vue'
import { useForm } from '@/hooks/hook-form'
import { stop, prevent } from '@/utils/utils-common'
import * as Service from '@/api/instance.service'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'SystemDialogBasicMenu',
    emits: ['close', 'submit'],
    props: {
        sid: { type: String },
        command: { type: String as PropType<'CREATE' | 'UPDATE'>, default: 'CREATE' }
    },
    setup(props, { emit }) {
        const { formRef, state, form, rules, setForm, setState, fetchValidate } = useForm({
            form: {
                type: 'router',
                name: '',
                pid: undefined,
                version: '',
                show: 1,
                sort: undefined,
                state: 'enable',
                icon: undefined,
                instance: '',
                path: undefined,
                active: undefined
            },
            rules: {
                type: { required: true, trigger: 'blur', message: '请选择菜单类型' },
                name: { required: true, trigger: 'blur', message: '请输入菜单名称' },
                version: { required: true, trigger: 'blur', message: '请输入版本号' },
                sort: { required: true, trigger: 'blur', message: '请输入排序' },
                state: { required: true, trigger: 'blur', message: '请选择状态' },
                show: { required: true, type: 'number', trigger: 'blur', message: '请选择是否显示' },
                instance: { required: true, trigger: 'blur', message: '请输入唯一标识' },
                path: { required: true, trigger: 'blur', message: '请输入菜单路径' }
            }
        })

        onMounted(async () => {
            await setState({ visible: true })
            // return await divineHandler(Boolean(props.uid), {
            //     handler: fetchUserSender
            // })
        })

        /**新增、编辑菜单**/
        async function fetchSaveRouter(option: env.BodySaveRouter) {
            if (props.command === 'CREATE') {
                return await Service.httpCreateRouter(option).then(async ({ message }) => {
                    console.log(message)
                })
            } else if (props.command === 'UPDATE') {
                return await Service.httpUpdateRouter(option).then(async ({ message }) => {
                    console.log(message)
                })
            }
        }

        async function onSubmit() {
            await setState({ loading: true })
            return await fetchValidate().then(async valid => {
                if (!valid) {
                    return setState({ loading: false })
                }
                try {
                    const option = {
                        sid: props.sid,
                        show: Boolean(form.value.show),
                        name: form.value.name,
                        instance: form.value.instance,
                        version: form.value.version,
                        sort: form.value.sort as never as number,
                        state: form.value.state,
                        type: form.value.type,
                        path: form.value.path,
                        icon: form.value.icon,
                        pid: form.value.pid,
                        active: form.value.active
                    }
                    return await fetchSaveRouter(option).then(async () => {
                        return await setState({ visible: false })
                    })
                } catch (err) {
                    return setState({ loading: false })
                }
            })
        }

        return () => (
            <common-dialog
                title="新增菜单"
                width="840px"
                v-model:show={state.visible}
                on-after-leave={() => emit('close')}
                onClose={() => setState({ visible: false })}
                onSubmit={onSubmit}
            >
                <n-form
                    class="p-inline-24"
                    label-placement="top"
                    require-mark-placement="left"
                    ref={formRef}
                    model={form.value}
                    rules={rules.value}
                >
                    <n-grid x-gap={20} cols={2}>
                        <n-grid-item span={1}>
                            <n-form-item label="菜单类型" path="type">
                                <n-select
                                    v-model:value={form.value.type}
                                    options={[
                                        { label: '菜单', value: 'router' },
                                        { label: '按钮', value: 'button' }
                                    ]}
                                    placeholder="请选择菜单类型"
                                ></n-select>
                            </n-form-item>
                        </n-grid-item>
                        <n-grid-item span={1}>
                            <n-form-item label="菜单名称" path="name">
                                <n-input v-model:value={form.value.name} placeholder="请输入菜单名称" />
                            </n-form-item>
                        </n-grid-item>
                        <n-grid-item span={1}>
                            <n-form-item label="父级菜单" path="pid">
                                <n-input placeholder="输入姓名" />
                            </n-form-item>
                        </n-grid-item>
                        <n-grid-item span={1}>
                            <n-form-item label="版本号" path="version">
                                <n-input v-model:value={form.value.version} placeholder="请输入版本号" />
                            </n-form-item>
                        </n-grid-item>
                        <n-grid-item span={1}>
                            <n-form-item label="排序" path="sort">
                                <n-input v-model:value={form.value.sort} placeholder="请输入排序" />
                            </n-form-item>
                        </n-grid-item>
                        <n-grid-item span={1}>
                            <n-form-item label="状态" path="state">
                                <n-select
                                    v-model:value={form.value.state}
                                    placeholder="请选择状态"
                                    options={[
                                        { label: '启用', value: 'enable', type: 'success' },
                                        { label: '禁用', value: 'disable', type: 'error' }
                                    ]}
                                ></n-select>
                            </n-form-item>
                        </n-grid-item>
                        {form.value.type === 'router' && (
                            <Fragment>
                                <n-grid-item span={1}>
                                    <n-form-item label="是否显示" path="show">
                                        <n-select
                                            v-model:value={form.value.show}
                                            placeholder="请选择是否显示"
                                            options={[
                                                { label: '显示', value: 1 },
                                                { label: '隐藏', value: 0 }
                                            ]}
                                        ></n-select>
                                    </n-form-item>
                                </n-grid-item>
                                <n-grid-item span={1}>
                                    <n-form-item label="图标" path="user.name">
                                        <n-input placeholder="请选择图标" />
                                    </n-form-item>
                                </n-grid-item>
                            </Fragment>
                        )}
                    </n-grid>
                    <n-form-item label="唯一标识" path="instance">
                        <n-input v-model:value={form.value.instance} placeholder="请输入唯一标识" />
                    </n-form-item>
                    {form.value.type === 'router' && (
                        <Fragment>
                            <n-form-item label="菜单路径" path="path">
                                <n-input v-model:value={form.value.path} placeholder="请输入菜单路径" />
                            </n-form-item>
                            <n-form-item label="激活路由" path="active">
                                <n-input v-model:value={form.value.active} placeholder="请输入激活路由" />
                            </n-form-item>
                        </Fragment>
                    )}
                    <n-form-item label="接口列表">
                        <n-input placeholder="接口列表" />
                    </n-form-item>
                </n-form>
            </common-dialog>
        )
    }
})
</script>
