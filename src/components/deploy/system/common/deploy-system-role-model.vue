<script lang="tsx">
import { defineComponent, PropType, ref, watch } from 'vue'
import { useChunkService } from '@/hooks'
import { fetchNotifyService } from '@/plugins'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'DeploySystemRoleModel',
    props: {
        /**/
        active: { type: String, required: true },
        /**角色ID**/
        roleId: { type: Number as PropType<number> }
    },
    setup(props, ctx) {
        const loading = ref(false)
        const initialize = ref(true)
        const model = ref<string>('')

        /**通用字典枚举**/
        const chunkOptions = useChunkService({
            immediate: true,
            type: ['CHUNK_WINDOWS_ROLE_MODEL']
        })

        /**获取角色详情**/
        async function fetchRoleResolver() {
            try {
                initialize.value = true
                const { data } = await Service.httpBaseSystemRoleResolver({ keyId: props.roleId })
                model.value = data.model
            } catch (err: any) {
                await fetchNotifyService({ type: 'error', title: err.message })
            } finally {
                initialize.value = false
            }
        }

        // 初始加载
        fetchRoleResolver()

        /**监听角色ID变化**/
        watch(
            () => props.roleId,
            () => fetchRoleResolver()
        )

        /**保存数据权限**/
        async function fetchSubmit() {
            if (!model.value) {
                return await fetchNotifyService({ type: 'warning', title: '请选择数据权限' })
            }
            try {
                loading.value = true
                await Service.httpBaseSystemUpdateRoleModel({
                    keyId: props.roleId,
                    model: model.value
                })
                return await fetchNotifyService({ title: '操作成功' })
            } catch (err: any) {
                return await fetchNotifyService({ type: 'error', title: err.message })
            } finally {
                loading.value = false
            }
        }

        return () => (
            <n-element class="deploy-system-role-model h-full flex flex-col overflow-hidden">
                <common-element-spiner opacity={0} loading={initialize.value}>
                    <div class="flex items-center justify-end p-inline-14 p-block-10 border-b border-divider">
                        <common-element-button type="primary" loading={loading.value} onClick={fetchSubmit}>
                            保存
                        </common-element-button>
                    </div>
                    <n-scrollbar trigger="none" class="flex-1 overflow-hidden">
                        <div class="p-14">
                            <n-radio-group
                                class="flex flex-col gap-14"
                                value={model.value}
                                on-update:value={(value: string) => (model.value = value)}
                            >
                                {(chunkOptions.CHUNK_WINDOWS_ROLE_MODEL.value ?? []).map((item: Omix) => (
                                    <n-radio key={item.value} value={item.value}>
                                        {item.label}
                                    </n-radio>
                                ))}
                            </n-radio-group>
                        </div>
                    </n-scrollbar>
                </common-element-spiner>
            </n-element>
        )
    }
})
</script>
