import { toRefs, computed } from 'vue'
import { defineStore } from 'pinia'
import { useState } from '@/hooks'
import * as utils from '@/utils/utils-common'

/**基础缓存配置实例**/
export const useConfiger = defineStore(
    'APP_STORE_CONFIGER',
    function () {
        const { state, setState } = useState({
            /**默认路由地址**/
            router: '/manager',
            /**默认主题**/
            theme: 'light',
            /**默认主题色**/
            primaryColor: '#536dfe',
            /**窗口宽度**/
            width: window.innerWidth,
            /**窗口高度**/
            height: window.innerHeight,
            /**默认窗口**/
            device: 'PC',
            /**菜单收缩**/
            collapsed: false,
            /**缓存菜单**/
            menuRouter: [] as Array<Omix>,
            /**组件尺寸**/
            elementSize: 'medium'
        })

        /**主题切换**/
        async function fetchThemeUpdate(theme?: 'light' | 'dark') {
            return await setState({ theme: theme ?? state.theme === 'light' ? 'dark' : 'light' })
        }

        /**缓存菜单**/
        async function fetchMenuRouter(data: Omix) {
            if (!state.menuRouter.some(item => item.fullPath === data.fullPath)) {
                return state.menuRouter.push(utils.omit(data, ['matched']))
            }
            return state.menuRouter
        }

        return {
            ...toRefs(state),
            setState,
            fetchThemeUpdate,
            fetchMenuRouter,
            inverted: computed(() => state.theme === 'dark')
        }
    },
    { persist: true }
)
