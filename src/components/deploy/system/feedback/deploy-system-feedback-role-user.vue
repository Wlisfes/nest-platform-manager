<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import { useSelectService } from '@/hooks'
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
        /**选中ID**/
        keyId: { type: String, required: true }
    },
    setup(props, { emit }) {
        /**通用用户账号列表Options**/
        const chunkUser = useSelectService(() => Service.httpBaseSystemColumnChunkUser())
        /**表单实例**/
        const { state, form, formRef, setState, setForm, fetchValidater } = useFormService({
            // callback: fetchCallback,
            form: { uid: undefined },
            rules: {}
        })

        /**确定提交表单**/
        async function fetchSubmit() {
            return await fetchValidater().then(async error => {
                if (error) {
                    return await await setState({ loading: false, disabled: false })
                }
                try {
                    return await Service.httpBaseSystemJoinRoleUser({ keyId: props.keyId, uid: form.value.uid }).then(
                        async ({ message }) => {
                            return await setState({ visible: false }).then(async () => {
                                await emit('submit', { done: setState })
                                return await fetchNotifyService({ title: message })
                            })
                        }
                    )
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
                            <span class="text-14">{(data.nickname ?? '').slice(0, 1)}</span>
                        </n-avatar>
                    )}
                    <div>{data.nickname}</div>
                </div>
            )
        }

        /**自定义渲染tag**/
        function fetchCustomTagRender(data: Omix<{ option: Omix; handleClose: Function }>) {
            console.log(data.option)
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
                width={640}
                v-model:visible={state.visible}
                v-model:loading={state.loading}
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
                    <n-form-item label="选择关联员工" path="uid">
                        <n-select
                            filterable
                            label-field="nickname"
                            value-field="uid"
                            placeholder="请选择关联员工"
                            options={chunkUser.dataSource.value}
                            v-model:value={form.value.uid}
                            //render-label={fetchCustomLabelRender}
                            //render-tag={fetchCustomTagRender}
                        ></n-select>
                    </n-form-item>
                </n-form>
            </common-dialog-provider>
        )
    }
})
</script>
