<script lang="tsx">
import { defineComponent } from 'vue'
import { useConfiger, useStore } from '@/store'

export default defineComponent({
    name: 'BaseLayout',
    setup(props, ctx) {
        const { collapsed, device, setState, fetchResize } = useStore(useConfiger)

        return () => (
            <n-layout class="h-full" content-class="flex flex-col overflow-hidden" has-sider>
                <n-layout-sider
                    bordered
                    width={240}
                    collapse-mode="width"
                    native-scrollbar={false}
                    collapsed={collapsed.value}
                    collapsed-width={device.value === 'MOBILE' ? 0 : 64}
                    show-trigger={device.value === 'MOBILE' ? false : 'bar'}
                    on-update:collapsed={(value: boolean) => setState({ collapsed: value })}
                >
                    <layout-common-logo class="h-54"></layout-common-logo>
                    <layout-common-sider></layout-common-sider>
                </n-layout-sider>
                <n-layout content-class="flex flex-col overflow-hidden">
                    <n-layout-header class="h-54 p-inline-16 flex items-center gap-24">
                        <layout-common-navigate></layout-common-navigate>
                        <layout-common-user></layout-common-user>
                    </n-layout-header>
                    <layout-common-store bordered></layout-common-store>
                    <n-layout-content
                        class="flex-1 overflow-hidden"
                        content-class="min-h-full flex flex-col"
                        native-scrollbar={false}
                        scrollbar-props={{ size: 100, trigger: 'none' }}
                    >
                        <router-view></router-view>
                    </n-layout-content>
                </n-layout>
            </n-layout>
        )
    }
})
</script>
