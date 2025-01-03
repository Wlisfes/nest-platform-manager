import { toRefs } from 'vue'
import { defineStore } from 'pinia'
import { useState } from '@/hooks/hook-state'
import { router } from '@/router'
import * as utils from '@/utils/utils-common'

export interface ConfigState {
    theme: 'light' | 'dark'
    primaryColor: string
    width: number
    height: number
    device: 'PC' | 'IPAD' | 'MOBILE'
    collapsed: boolean
}

export const useConfiger = defineStore('APP_STORE_CONFIGER', () => {
    const screen = utils.fetchScreenResize()
    const { state, setState } = useState<ConfigState>({
        theme: 'light',
        primaryColor: '#24B89E',
        width: window.innerWidth,
        height: window.innerHeight,
        device: screen.device,
        collapsed: screen.collapsed
    })

    /**监听窗口resizes事件**/
    async function fetchResize(data: Partial<{ width: number; height: number }> = {}) {
        return await setState({ width: data.width ?? window.innerWidth, height: data.height ?? window.innerHeight }).then(async data => {
            return await setState(utils.fetchScreenResize({ width: data.width, height: data.height }))
        })
    }

    return { ...toRefs(state), setState, fetchResize }
})
