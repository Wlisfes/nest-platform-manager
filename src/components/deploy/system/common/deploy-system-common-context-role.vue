<script lang="tsx">
import { defineComponent } from 'vue'
import { useVModels } from '@vueuse/core'
import { useState } from '@/hooks/hook-state'

export default defineComponent({
    name: 'DeploySystemCommonContextRole',
    emits: ['update:keyId', 'update:collapsed'],
    props: {
        /**左侧收缩**/
        collapsed: { type: Boolean, default: false },
        /**选中ID**/
        keyId: { type: String }
    },
    setup(props, { emit }) {
        const { collapsed } = useVModels(props, emit)
        const { state, setState } = useState({
            current: 'user'
        })

        return () => (
            <common-element class="deploy-system-common-context-role h-full flex flex-col overflow-hidden" radius="var(--border-radius)">
                <div class="deploy-system-context-navigate h-58 flex items-center gap-12 p-inline-12">
                    <common-element-button tertiary class="h-34 p-inline-6" onClick={() => (collapsed.value = !collapsed.value)}>
                        <common-element-icon
                            size={22}
                            name={collapsed.value ? 'nest-double-right' : 'nest-double-left'}
                        ></common-element-icon>
                    </common-element-button>
                    <n-tabs
                        class="w-auto"
                        type="segment"
                        size="small"
                        value={state.current}
                        on-update:value={(key: string) => setState({ current: key })}
                    >
                        <n-tab name="user">员工角色</n-tab>
                        <n-tab name="roles">角色权限</n-tab>
                    </n-tabs>
                </div>
            </common-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.deploy-system-context-navigate {
    position: relative;
    box-sizing: border-box;
    border-bottom: 1px solid var(--divider-color);
    transition: border 0.3s var(--cubic-bezier-ease-in-out);
    :deep(.n-tabs-nav--segment-type) {
        --n-tab-padding: 4px 12px;
        line-height: 20px;
    }
}
</style>
