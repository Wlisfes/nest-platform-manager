<script lang="tsx">
import { defineComponent } from 'vue'
import { useConfiger, useStore } from '@/store'

export default defineComponent({
    name: 'BaseLayout',
    setup(props, ctx) {
        const { collapsed, device, setState, fetchResize } = useStore(useConfiger)

        return () => (
            <n-layout class="h-full" content-class="flex flex-col overflow-hidden">
                <n-layout-header class="h-50 p-inline-20 flex items-center" bordered></n-layout-header>
                <n-layout class="flex-1" has-sider content-class="flex flex-col overflow-hidden">
                    <n-layout-sider
                        collapse-mode="width"
                        bordered
                        width={260}
                        native-scrollbar={false}
                        collapsed={collapsed.value}
                        collapsed-width={device.value === 'MOBILE' ? 0 : 64}
                        show-trigger={device.value === 'MOBILE' ? false : 'bar'}
                        on-update:collapsed={(value: boolean) => setState({ collapsed: value })}
                    ></n-layout-sider>
                    <n-layout content-class="flex flex-col overflow-hidden">
                        <n-layout-content
                            class="flex-1 overflow-hidden"
                            content-class="min-h-full flex flex-col"
                            native-scrollbar={false}
                            scrollbar-props={{ size: 100, trigger: 'none', xScrollable: true }}
                        >
                            <router-view></router-view>
                        </n-layout-content>
                    </n-layout>
                </n-layout>
            </n-layout>
        )
    }
})
</script>
