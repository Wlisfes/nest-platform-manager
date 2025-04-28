<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import { useSelectService } from '@/hooks/hook-chunk'
import { useFormService } from '@/hooks/hook-form'
import { fetchNotifyService } from '@/plugins'
import { stop } from '@/utils/utils-common'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'DeploySystemFeedbackRoleUser',
    emits: ['close', 'submit'],
    props: {
        /**标题**/
        title: { type: String, required: true },
        /**编辑操作详情数据**/
        node: { type: Object as PropType<Omix>, default: () => ({}) }
    },
    setup(props, { emit }) {
        /**通用用户账号列表Options**/
        const chunkUser = useSelectService(() => Service.httpBaseSystemColumnChunkUser())
        /**表单实例**/
        const { state, form, formRef, setState, setForm, fetchValidater } = useFormService({
            callback: fetchCallback,
            option: {
                dataSource: [] as Array<Omix>
            },
            form: {
                keys: [] as Array<string>
            },
            rules: {}
        })

        /**表达初始化回调**/
        async function fetchCallback() {
            return await fetchBaseSystemRoleMumber().then(async () => {
                return await setState({ initialize: false })
            })
        }

        /**角色关联用户列表**/
        async function fetchBaseSystemRoleMumber() {
            try {
                return await Service.httpBaseSystemRoleMumber({ keyId: props.node.keyId }).then(async ({ data }) => {
                    await setForm({ keys: data.map((item: Omix) => item.uid) })
                    return await setState({ dataSource: data ?? [] })
                })
            } catch (err) {
                return await fetchNotifyService({ type: 'error', title: err.message })
            }
        }

        /**确定提交表单**/
        async function fetchSubmit() {
            return await fetchValidater().then(async error => {
                if (error) {
                    return await await setState({ loading: false, disabled: false })
                }
                try {
                } catch (err) {
                    return await await setState({ loading: false, disabled: false }).then(async () => {
                        return await fetchNotifyService({ type: 'error', title: err.message })
                    })
                }
            })
        }

        /**自定义渲染tag**/
        function fetchCustomLabelRender(data: Omix) {
            return (
                <div class="flex items-center gap-10 p-block-6">
                    {data.avatar ? (
                        <n-avatar round size={28} src={data.avatar}></n-avatar>
                    ) : (
                        <n-avatar round size={28} src={data.avatar}>
                            <span class="text-14">{data.nickname.slice(0, 1)}</span>
                        </n-avatar>
                    )}
                    <div>{data.nickname}</div>
                </div>
            )
        }

        /**自定义渲染tag**/
        function fetchCustomTagRender(data: Omix<{ option: Omix; handleClose: Function }>) {
            return (
                <n-tag
                    closable
                    disabled={state.loading && state.disabled}
                    onMousedown={(e: FocusEvent) => stop(e)}
                    onClose={(e: MouseEvent) => stop(e, data.handleClose)}
                >
                    <div class="flex items-center gap-5">
                        {data.option.avatar ? (
                            <n-avatar round size={20} src={data.option.avatar}></n-avatar>
                        ) : (
                            <n-avatar round size={20} src={data.option.avatar}>
                                <span class="text-12">{data.option.nickname.slice(0, 1)}</span>
                            </n-avatar>
                        )}
                        <span>{data.option.nickname}</span>
                    </div>
                </n-tag>
            )
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
                    require-mark-placement="left"
                    size="medium"
                    ref={formRef}
                    model={form.value}
                    rules={state.rules}
                    disabled={state.loading}
                >
                    <n-form-item label="选择关联用户" path="keys">
                        <n-select
                            multiple
                            filterable
                            max-tag-count="responsive"
                            label-field="name"
                            value-field="uid"
                            placeholder="请选择选择关联用户"
                            options={chunkUser.dataSource.value}
                            v-model:value={form.value.keys}
                            render-label={fetchCustomLabelRender}
                            render-tag={fetchCustomTagRender}
                        ></n-select>
                    </n-form-item>
                    <n-scrollbar class="h-200">
                        <div class="grid-columns-5 gap-10 flex-wrap max-h-200">
                            {chunkUser.dataSource.value.map(item => (
                                <div key={item.uid} class="flex items-center p-inline-10 p-block-10">
                                    <n-avatar round size={34} src={item.avatar}>
                                        <span class="text-14">{item.nickname.slice(0, 1)}</span>
                                    </n-avatar>
                                    <div class="flex flex-1 items-center text-14 gap-3">
                                        <div>{item.name}</div>
                                        <div class="text-12">{item.number}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </n-scrollbar>
                </n-form>
            </common-dialog-provider>
        )
    }
})
</script>
