<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import { useSelectService } from '@/hooks/hook-selecter'
import { useChunkService } from '@/hooks'
import { useFormService } from '@/hooks'
import { fetchNotifyService } from '@/plugins'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'DeploySystemFeedbackSheetResource',
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
            callback: fetchBaseSystemSheetResolver,
            formState: {
                keyName: props.node.keyName, //权限标识
                name: props.node.name, //菜单名称
                router: props.node.router, //菜单地址
                version: props.node.version, //版本号
                sort: props.node.sort ?? 10, //排序号
                status: props.node.status, //菜单状态
                check: props.node.check, //显示状态
                iconName: props.node.iconName, //菜单图标
                pid: props.node.pid //父级菜单
            },
            rules: {
                keyName: { required: true, message: '请输入权限标识', trigger: 'blur' },
                name: { required: true, message: '请输入菜单名称', trigger: 'blur' },
                router: { required: true, message: '请输入菜单地址', trigger: 'blur' },
                status: { required: true, message: '请选择菜单状态', trigger: 'blur' },
                check: { required: true, message: '请选择显示状态', trigger: 'blur' },
                version: { required: true, message: '请输入版本号', trigger: 'blur' },
                sort: { required: true, type: 'number', message: '请输入排序号', trigger: 'blur' }
            }
        })
        /**菜单资源树结构表**/
        const sheetOptions = useSelectService(() => Service.httpBaseSystemTreeSheetResource(), {
            immediate: ['CREATE'].includes(props.command)
        })
        /**通用字典枚举**/
        const chunkOptions = useChunkService({
            immediate: ['CREATE'].includes(props.command),
            type: ['CHUNK_WINDOWS_SHEET_CHECK', 'CHUNK_WINDOWS_SHEET_STATUS']
        })
        /**菜单资源详情**/
        async function fetchBaseSystemSheetResolver() {
            if (['CREATE'].includes(props.command)) {
                return await setState({ initialize: false })
            }
            return await setState({ initialize: true }).then(async () => {
                try {
                    await Promise.all([sheetOptions.fetchRequest(), chunkOptions.fetchRequest()])
                    return await Service.httpBaseSystemSheetResolver({ id: props.node.id }).then(async ({ data }) => {
                        return await setForm(fetchReste(data)).then(async () => {
                            return await setState({ initialize: false })
                        })
                    })
                } catch (err) {
                    return await await setState({ initialize: false }).then(async () => {
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
                        await Service.httpBaseSystemCreateSheetResource(formState.value)
                    } else if (['UPDATE'].includes(props.command)) {
                        await Service.httpBaseSystemUpdateSheetResource({ ...formState.value, id: props.node.id })
                    }
                    return await setState({ visible: false }).then(async () => {
                        await emit('submit', { done: setState })
                        return await fetchNotifyService({ title: '操作成功' })
                    })
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
                    <form-common-column class="col-span-2" label="权限标识" path="keyName">
                        <form-common-column-input maxlength={255} placeholder="请输入权限标识" v-model:value={formState.value.keyName} />
                    </form-common-column>
                    <form-common-column label="菜单名称" path="name">
                        <form-common-column-input maxlength={32} placeholder="请输入菜单名称" v-model:value={formState.value.name} />
                    </form-common-column>
                    <form-common-column label="菜单地址" path="router">
                        <form-common-column-input maxlength={255} placeholder="请输入菜单地址" v-model:value={formState.value.router} />
                    </form-common-column>
                    <form-common-column label="父级菜单" path="pid">
                        <form-common-column-cascader
                            v-model:value={formState.value.pid}
                            placeholder="请选择父级菜单"
                            expand-trigger="click"
                            options={sheetOptions.dataSource.value}
                        ></form-common-column-cascader>
                    </form-common-column>
                    <form-common-column label="菜单图标" path="iconName">
                        <form-common-column-input maxlength={255} placeholder="请输入菜单图标" v-model:value={formState.value.iconName} />
                    </form-common-column>
                    <form-common-column label="菜单状态" path="status">
                        <form-common-column-select-chunk
                            placeholder="请选择菜单状态"
                            options={chunkOptions.CHUNK_WINDOWS_SHEET_STATUS.value}
                            v-model:value={formState.value.status}
                        ></form-common-column-select-chunk>
                    </form-common-column>
                    <form-common-column label="显示状态" path="check">
                        <form-common-column-select-chunk
                            placeholder="请选择显示状态"
                            options={chunkOptions.CHUNK_WINDOWS_SHEET_CHECK.value}
                            v-model:value={formState.value.check}
                        ></form-common-column-select-chunk>
                    </form-common-column>
                    <form-common-column label="版本号" path="version">
                        <form-common-column-input maxlength={32} placeholder="请输入版本号" v-model:value={formState.value.version} />
                    </form-common-column>
                    <form-common-column label="排序号" path="sort" v-model:value={formState.value.sort}>
                        <n-input-number
                            class="w-full"
                            min={1}
                            step={10}
                            precision={0}
                            placeholder="请输入排序号"
                            v-model:value={formState.value.sort}
                        />
                    </form-common-column>
                </form-common-container>
            </common-dialog-provider>
        )
    }
})
</script>
