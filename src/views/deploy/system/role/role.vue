<script lang="tsx">
import { defineComponent } from 'vue'
import { useState } from '@/hooks/hook-state'

export default defineComponent({
    name: 'DeploySystemRole',
    setup(props, ctx) {
        const { state } = useState({ keyId: '', collapsed: false, initialize: true })

        return () => (
            <layout-common-container
                transition
                initialize={state.initialize}
                class="deploy-system-role-container absolute inset-0 p-12"
                class-name="p-12 gap-12 overflow-hidden"
            >
                <n-layout has-sider class="h-full bg-transparent overflow-hidden">
                    <n-layout-sider
                        width={320}
                        collapsed-width={0}
                        collapsed={state.collapsed}
                        class="bg-transparent overflow-hidden box-border"
                        content-class="p-ie-12 overflow-hidden!"
                    >
                        <deploy-system-common-role-sider
                            v-model:key-id={state.keyId}
                            v-model:initialize={state.initialize}
                        ></deploy-system-common-role-sider>
                    </n-layout-sider>
                    <n-layout-content class="flex-1 bg-transparent overflow-hidden" content-class="overflow-hidden">
                        {state.keyId && (
                            <deploy-system-common-role-container
                                v-model:collapsed={state.collapsed}
                                v-model:key-id={state.keyId}
                            ></deploy-system-common-role-container>
                        )}
                    </n-layout-content>
                </n-layout>
            </layout-common-container>
        )
    }
})
</script>
