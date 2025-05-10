<script lang="tsx">
import { defineComponent, Fragment } from 'vue'
import { useVModels } from '@vueuse/core'
import { useState } from '@/hooks/hook-state'

export default defineComponent({
    name: 'DeploySystemCommonRoleContainer',
    emits: ['update:keyId', 'update:collapsed'],
    props: {
        /**左侧收缩**/
        collapsed: { type: Boolean, default: false },
        /**选中ID**/
        keyId: { type: String }
    },
    setup(props, { emit }) {
        const { keyId, collapsed } = useVModels(props, emit)
        const { state, setState } = useState({ current: 'user' })

        return () => (
            <common-element class="deploy-system-common-role-container h-full flex flex-col overflow-hidden" radius="var(--border-radius)">
                <n-tabs
                    class="deploy-system-context-segment flex flex-col flex-1 overflow-hidden"
                    type="segment"
                    size="small"
                    animated
                    value={state.current}
                    on-update:value={(key: string) => setState({ current: key })}
                >
                    {{
                        prefix: () => (
                            <common-element-button tertiary class="h-34 p-inline-6" onClick={() => (collapsed.value = !collapsed.value)}>
                                <common-element-icon
                                    size={22}
                                    name={collapsed.value ? 'nest-double-right' : 'nest-double-left'}
                                ></common-element-icon>
                            </common-element-button>
                        ),
                        default: () => (
                            <Fragment>
                                <n-tab-pane name="user" tab="员工角色">
                                    <deploy-system-common-role-user key-id={keyId.value}></deploy-system-common-role-user>
                                </n-tab-pane>
                                <n-tab-pane name="rule" tab="角色权限">
                                    <deploy-system-common-role-rule key-id={keyId.value}></deploy-system-common-role-rule>
                                </n-tab-pane>
                                <n-tab-pane name="model" tab="数据权限">
                                    <deploy-system-common-role-model key-id={keyId.value}></deploy-system-common-role-model>
                                </n-tab-pane>
                            </Fragment>
                        )
                    }}
                </n-tabs>
            </common-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.deploy-system-context-segment {
    --n-pane-padding-top: 0;
    position: relative;
    :deep(.n-tabs-nav__prefix) {
        padding-right: 12px;
    }
    :deep(.n-tabs-rail) {
        width: auto;
        user-select: none;
    }
    :deep(.n-tab-pane) {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
    :deep(.n-tabs-pane-wrapper) {
        position: relative;
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-top: -58px;
    }
    :deep(.n-tabs-nav--segment-type) {
        --n-tab-padding: 4px 12px;
        z-index: 2;
        position: relative;
        line-height: 20px;
        padding: 12px 12px 11px;
        // border-bottom: 1px solid var(--divider-color);
        // transition: border 0.3s var(--cubic-bezier-ease-in-out);
    }
}
</style>
