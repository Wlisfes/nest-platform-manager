<script lang="tsx">
import { defineComponent, watch } from 'vue'
import { useState } from '@/hooks/hook-state'
import { useChunkService } from '@/hooks/hook-chunk'
import { fetchNotifyService } from '@/plugins'
import * as Service from '@/api/instance.service'

export default defineComponent({
    name: 'DeploySystemCommonRoleModel',
    props: {
        /**选中ID**/
        keyId: { type: String }
    },
    setup(props, ctx) {
        /**通用字典枚举**/
        const { chunk } = useChunkService({ immediate: true, COMMON_SYSTEM_ROLE_MODEL: true })
        const { state, setState } = useState({ initialize: true, loading: true, model: '', message: '' })

        watch(() => props.keyId, fetchBaseSystemRoleResolver, { immediate: true })
        async function fetchBaseSystemRoleResolver() {
            try {
                await setState({ initialize: true, loading: true })
                return await Service.httpBaseSystemRoleResolver({ keyId: props.keyId }).then(async ({ data }) => {
                    return await setState({ initialize: false, loading: false, model: data.model, message: '' })
                })
            } catch (err) {
                return await setState({ initialize: false, loading: false, model: '', message: err.message }).then(async () => {
                    return await fetchNotifyService({ type: 'error', title: err.message })
                })
            }
        }

        async function fetchUpdate(value: string) {
            const model = state.model
            try {
                await setState({ model: value, loading: true })
                return await Service.httpBaseSystemRoleModelUpdate({ keyId: props.keyId, model: value }).then(async ({ message }) => {
                    await setState({ loading: false })
                    return await fetchNotifyService({ title: message })
                })
            } catch (err) {
                return await setState({ loading: false, model }).then(async () => {
                    return await fetchNotifyService({ type: 'error', title: err.message })
                })
            }
        }

        return () => (
            <common-element class="deploy-system-common-role-model p-bs-58" spin loading={state.initialize}>
                <n-element class="flex p-inline-12 p-block-12">
                    <n-radio-group
                        class="flex flex-col gap-10"
                        size="large"
                        disabled={state.loading}
                        v-model:value={state.model}
                        on-update:value={fetchUpdate}
                    >
                        {chunk.COMMON_SYSTEM_ROLE_MODEL.map(item => (
                            <n-radio key={item.value} value={item.value} label={item.name}></n-radio>
                        ))}
                    </n-radio-group>
                </n-element>
            </common-element>
        )
    }
})
</script>
