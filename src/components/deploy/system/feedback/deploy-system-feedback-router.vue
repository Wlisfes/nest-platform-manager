<script lang="tsx">
import { defineComponent } from 'vue'
import { useForm } from '@/hooks/hook-form'
import { useChunkService } from '@/hooks/hook-chunk'
export function initState(data: Omix = {}) {
    return {
        type: data.type, //菜单类型
        name: data.name, //菜单名称
        pid: data.pid, //父级菜单
        version: data.version, //版本号
        check: data.check, //是否可见
        sort: data.sort ?? 1, //排序号
        key: data.key, //权限标识
        router: data.router, //菜单地址
        active: data.active, //激活路由
        iconName: data.iconName //菜单图标
    }
}

export default defineComponent({
    name: 'DeploySystemFeedbackRouter',
    emits: ['close', 'submit'],
    setup(props, { emit }) {
        const chunkOptions = useChunkService({
            COMMON_SYSTEM_ROUTER_STATUS: true,
            COMMON_SYSTEM_ROUTER_TYPE: true,
            COMMON_SYSTEM_ROUTER_CHECK: true
        })
        const { state, form, formRef, setState, setForm } = useForm({
            form: initState()
        })

        async function fetchSubmit() {
            console.log('fetchSubmit')
        }

        return () => (
            <common-dialog-provider
                title="编辑菜单"
                width={840}
                v-model:visible={state.visible}
                onSubmit={fetchSubmit}
                onCancel={() => setState({ visible: false })}
                onClose={() => emit('close', { done: setState })}
            >
                <n-form
                    class="grid-columns-2 gap-col-20"
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
                            options={chunkOptions.COMMON_SYSTEM_ROUTER_TYPE.value}
                            v-model:value={form.value.type}
                        ></n-select>
                    </n-form-item>
                    <n-form-item label="菜单名称" path="name">
                        <n-input maxlength={32} placeholder="请输入菜单名称" v-model:value={form.value.name}></n-input>
                    </n-form-item>
                    <n-form-item label="父级菜单" path="pid"></n-form-item>
                    <n-form-item label="版本号" path="version">
                        <n-input maxlength={32} placeholder="请输入版本号" v-model:value={form.value.version}></n-input>
                    </n-form-item>
                    <n-form-item label="是否可见" path="check">
                        <n-select
                            label-field="name"
                            value-field="value"
                            placeholder="请选择是否可见"
                            options={chunkOptions.COMMON_SYSTEM_ROUTER_CHECK.value}
                            v-model:value={form.value.check}
                        ></n-select>
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
                    <n-form-item label="权限标识" path="key">
                        <n-input maxlength={128} placeholder="请输入权限标识" v-model:value={form.value.key}></n-input>
                    </n-form-item>
                    <n-form-item label="菜单地址" path="router">
                        <n-input maxlength={255} placeholder="请输入菜单地址" v-model:value={form.value.router}></n-input>
                    </n-form-item>
                    <n-form-item label="激活路由" path="active">
                        <n-input maxlength={255} placeholder="请输入激活路由" v-model:value={form.value.active}></n-input>
                    </n-form-item>
                    <n-form-item label="菜单图标" path="iconName">
                        <n-input maxlength={255} placeholder="请输入激活路由" v-model:value={form.value.active}></n-input>
                    </n-form-item>
                </n-form>
            </common-dialog-provider>
        )
    }
})
</script>
