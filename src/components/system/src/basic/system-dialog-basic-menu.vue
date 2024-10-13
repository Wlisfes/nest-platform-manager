<script lang="tsx">
import { defineComponent, onMounted, PropType } from 'vue'
import { useForm } from '@/hooks/hook-form'

export default defineComponent({
    name: 'SystemDialogBasicMenu',
    emits: ['close', 'submit'],
    setup(props, { emit }) {
        const { formRef, state, form, rules, setForm, setState } = useForm({
            form: {},
            rules: {}
        })

        onMounted(async () => {
            await setState({ visible: true })
            // return await divineHandler(Boolean(props.uid), {
            //     handler: fetchUserSender
            // })
        })

        return () => (
            <common-dialog
                title="新增菜单"
                width="840px"
                v-model:show={state.visible}
                on-after-leave={() => emit('close')}
                onClose={() => setState({ visible: false })}
            >
                <n-form class="p-inline-24" label-placement="top" ref={formRef} model={form.value} rules={rules.value}>
                    <n-grid x-gap={20} cols={2}>
                        <n-grid-item span={1}>
                            <n-form-item label="菜单类型" path="user.name">
                                <n-input placeholder="输入姓名" />
                            </n-form-item>
                        </n-grid-item>
                        <n-grid-item span={1}>
                            <n-form-item label="菜单名称" path="user.name">
                                <n-input placeholder="输入姓名" />
                            </n-form-item>
                        </n-grid-item>
                        <n-grid-item span={1}>
                            <n-form-item label="父级菜单" path="user.name">
                                <n-input placeholder="输入姓名" />
                            </n-form-item>
                        </n-grid-item>
                        <n-grid-item span={1}>
                            <n-form-item label="版本号" path="user.name">
                                <n-input placeholder="输入姓名" />
                            </n-form-item>
                        </n-grid-item>
                        <n-grid-item span={1}>
                            <n-form-item label="是否显示" path="user.name">
                                <n-input placeholder="输入姓名" />
                            </n-form-item>
                        </n-grid-item>
                        <n-grid-item span={1}>
                            <n-form-item label="排序" path="user.name">
                                <n-input placeholder="输入姓名" />
                            </n-form-item>
                        </n-grid-item>
                        <n-grid-item span={1}>
                            <n-form-item label="状态" path="user.name">
                                <n-input placeholder="输入姓名" />
                            </n-form-item>
                        </n-grid-item>
                        <n-grid-item span={1}>
                            <n-form-item label="图标" path="user.name">
                                <n-input placeholder="输入姓名" />
                            </n-form-item>
                        </n-grid-item>
                    </n-grid>
                    <n-form-item label="唯一标识" path="user.name">
                        <n-input placeholder="输入姓名" />
                    </n-form-item>
                    <n-form-item label="菜单路径" path="user.name">
                        <n-input placeholder="输入姓名" />
                    </n-form-item>
                    <n-form-item label="激活路由" path="user.name">
                        <n-input placeholder="输入姓名" />
                    </n-form-item>
                </n-form>
            </common-dialog>
        )
    }
})
</script>
