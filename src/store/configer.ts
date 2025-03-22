import { toRefs, computed } from 'vue'
import { defineStore } from 'pinia'
import { useState } from '@/hooks/hook-state'
import * as utils from '@/utils/utils-common'

export interface ConfigState {
    router: string
    theme: 'light' | 'dark'
    primaryColor: string
    width: number
    height: number
    device: 'PC' | 'IPAD' | 'MOBILE'
    collapsed: boolean
    menuRouter: Array<Omix>
}

/**基础缓存配置实例**/
export const useConfiger = defineStore(
    'APP_STORE_CONFIGER',
    function () {
        const screen = utils.fetchScreenResize()
        const { state, setState } = useState<ConfigState>({
            router: '/manager',
            theme: 'light',
            primaryColor: '#536dfe',
            width: window.innerWidth,
            height: window.innerHeight,
            device: screen.device,
            collapsed: screen.collapsed,
            menuRouter: []
        })

        /**监听窗口resizes事件**/
        async function fetchResize(data: Partial<{ width: number; height: number }> = {}) {
            return await setState({ width: data.width ?? window.innerWidth, height: data.height ?? window.innerHeight }).then(
                async data => {
                    return await setState(utils.fetchScreenResize({ width: data.width, height: data.height }))
                }
            )
        }

        /**主题切换**/
        async function fetchThemeUpdate(theme?: ConfigState['theme']) {
            return await setState({ theme: theme ?? state.theme === 'light' ? 'dark' : 'light' })
        }

        /**菜单缓存**/
        async function fetchMenuRouter(data: Omix) {
            if (!state.menuRouter.some(item => item.fullPath === data.fullPath)) {
                return state.menuRouter.push(utils.omit(data, ['matched']))
            }
            return state.menuRouter
        }

        return {
            ...toRefs(state),
            setState,
            fetchResize,
            fetchThemeUpdate,
            fetchMenuRouter,
            inverted: computed(() => state.theme === 'dark')
        }
    },
    { persist: true }
)
