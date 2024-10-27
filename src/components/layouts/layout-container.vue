<script lang="tsx">
import { defineComponent, KeepAlive, onUnmounted, onBeforeMount, DefineComponent } from 'vue'
import { RouterView, RouterLink, useRoute } from 'vue-router'
import { useEventListener } from '@vueuse/core'
import { useState } from '@/hooks/hook-state'
import { useManager } from '@/hooks/hook-manager'
import { useProvider } from '@/hooks/hook-provider'
import { useConfiger, useStore } from '@/store'
import { APP_SKYLINE, router } from '@/router'

export default defineComponent({
    name: 'LayoutContainer',
    setup(props) {
        const { activeName, collapsed, device, setState, fetchResize } = useStore(useConfiger)
        const { theme, fetchThemeUpdate } = useProvider()
        const { fetchRefreshCurrentRouter } = useManager()
        const { state } = useState({
            menuOptions: [
                { label: '工作台', key: '/manager', iframeName: APP_SKYLINE.Manager },
                { label: '销售管理', key: '/crm', iframeName: APP_SKYLINE.Crm },
                { label: '采购管理', key: '/srm', iframeName: APP_SKYLINE.Srm },
                { label: '综合设置', key: '/system/basic/simple', iframeName: APP_SKYLINE.Sys }
            ]
        })

        fetchResize()
        onUnmounted(useEventListener(window, 'resize', fetchResize))

        /**渲染导航组件**/
        function fetchNavigateRender(item: Omix<{ key: string; label: string }>) {
            if (item.key === '/system/basic/router') {
                return (
                    <RouterLink to={item.key}>
                        <span class="text-16">{item.label}</span>
                    </RouterLink>
                )
            }
            return <span class="text-16">{item.label}</span>
        }

        return () => (
            <n-layout class="h-full" content-style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <n-layout-header class="h-50 p-inline-20 flex items-center" bordered>
                    <n-menu
                        mode="horizontal"
                        key-field="iframeName"
                        responsive
                        options={state.menuOptions}
                        v-model:value={activeName.value}
                        render-label={fetchNavigateRender}
                    ></n-menu>
                    <n-button onClick={() => fetchRefreshCurrentRouter({ fullPath: router.currentRoute.value.fullPath })}>刷新</n-button>
                    <n-button onClick={() => fetchThemeUpdate(theme.value === 'dark' ? 'light' : 'dark')}>{theme.value}</n-button>
                </n-layout-header>
                <n-layout class="flex-1" has-sider content-style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
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
                    <n-layout content-style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                        <n-layout-content
                            class="flex-1 overflow-hidden"
                            content-class="min-h-full flex flex-col"
                            native-scrollbar={false}
                            scrollbar-props={{ size: 100, trigger: 'none', xScrollable: true }}
                        >
                            <RouterView>
                                {{
                                    default: ({
                                        Component,
                                        route
                                    }: Omix<{ Component: DefineComponent; route: ReturnType<typeof useRoute> }>) => (
                                        <KeepAlive>{Component ? <Component key={route.fullPath} /> : null}</KeepAlive>
                                    )
                                }}
                            </RouterView>
                        </n-layout-content>
                    </n-layout>
                </n-layout>
            </n-layout>
        )
    }
})
</script>
