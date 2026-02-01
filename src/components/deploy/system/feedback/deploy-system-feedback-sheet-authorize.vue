<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import { useSelectService } from '@/hooks/hook-selecter'
import { useChunkService } from '@/hooks'
import { useFormService } from '@/hooks'
import { fetchNotifyService } from '@/plugins'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'DeploySystemFeedbackSheetAuthorize',
    emits: ['close', 'submit'],
    props: {
        /**标题**/
        title: { type: String, required: true },
        /**操作指令**/
        command: { type: String as PropType<'CREATE' | 'CLONE' | 'UPDATE'>, default: 'CREATE' },
        /**编辑操作详情数据**/
        node: { type: Object as PropType<Omix>, default: () => ({}) }
    },
    setup(props, { emit }) {
        const { formState, formRef, state, setState, setForm, fetchReste, fetchValidater } = useFormService({
            callback: fetchBaseSystemSheetResolver,
            formState: {
                keyName: props.node.keyName,
                name: props.node.name,
                pid: props.node.pid,
                version: props.node.version,
                sort: props.node.sort ?? 10,
                status: props.node.status
            },
            rules: {
                keyName: { required: true, message: '请输入权限标识', trigger: 'blur' },
                name: { required: true, message: '请输入按钮名称', trigger: 'blur' },
                pid: { required: true, message: '请选择父级菜单', trigger: 'blur' },
                status: { required: true, message: '请选择按钮状态', trigger: 'blur' },
                version: { required: true, message: '请输入版本号', trigger: 'blur' },
                sort: { required: true, type: 'number', message: '请输入排序号', trigger: 'blur' }
            }
        })
        /**菜单资源树结构表**/
        const sheetOptions = useSelectService(() => Service.httpBaseSystemTreeSheetResource(), {
            immediate: ['CREATE'].includes(props.command)
        })
        /**通用字典枚举**/
        const chunkOptions = useChunkService({ immediate: ['CREATE'].includes(props.command), type: ['CHUNK_WINDOWS_RESOUREC_STATUS'] })
        /**菜单资源详情**/
        async function fetchBaseSystemSheetResolver() {
            if (['CREATE'].includes(props.command)) {
                return await setState({ initialize: false })
            }
            return await setState({ initialize: true }).then(async () => {
                try {
                    await Promise.all([chunkOptions.fetchRequest(), sheetOptions.fetchRequest()])
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
                    if (['CREATE', 'CLONE'].includes(props.command)) {
                        return await Service.httpBaseSystemCreateSheetAuthorize(formState.value)
                    } else if (['UPDATE'].includes(props.command)) {
                        await Service.httpBaseSystemUpdateSheetAuthorize({ ...formState.value, id: props.node.id })
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
                width={640}
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
                    <form-common-column label="权限标识" path="keyName">
                        <form-common-column-input maxlength={255} placeholder="请输入权限标识" v-model:value={formState.value.keyName} />
                    </form-common-column>
                    <form-common-column label="按钮名称" path="name">
                        <form-common-column-input maxlength={32} placeholder="请输入按钮名称" v-model:value={formState.value.name} />
                    </form-common-column>
                    <form-common-column label="父级菜单" path="pid">
                        <form-common-column-cascader
                            v-model:value={formState.value.pid}
                            placeholder="请选择父级菜单"
                            options={sheetOptions.dataSource.value}
                        />
                    </form-common-column>
                    <form-common-column label="按钮状态" path="status">
                        <form-common-column-select-chunk
                            placeholder="请选择按钮状态"
                            options={chunkOptions.CHUNK_WINDOWS_RESOUREC_STATUS.value}
                            v-model:value={formState.value.status}
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
