import { toRefs } from 'vue'
import { defineStore } from 'pinia'
import { useState } from '@/hooks/hook-state'
import { router } from '@/router'
import { fetchScreenResize } from '@/utils/utils-common'

export interface ConfigState {
    theme: 'light' | 'dark'
    primaryColor: string
    width: number
    height: number
    device: 'PC' | 'IPAD' | 'MOBILE'
    collapsed: boolean

    currentRoute: string
    include: Array<string>
    dataSource: Array<Omix>
}

export const useConfiger = defineStore('APP_SKYLINE_STORE_CONFIGER', () => {
    const screen = fetchScreenResize()
    const { state, setState } = useState<ConfigState>({
        theme: 'light',
        primaryColor: '#24B89E',
        width: window.innerWidth,
        height: window.innerHeight,
        device: screen.device,
        collapsed: screen.collapsed,

        currentRoute: '/manager',
        include: [],
        dataSource: []
    })

    /**监听窗口resizes事件**/
    async function fetchResize(data: Partial<{ width: number; height: number }> = {}) {
        return await setState({ width: data.width ?? window.innerWidth, height: data.height ?? window.innerHeight }).then(async data => {
            return await setState(fetchScreenResize({ width: data.width, height: data.height }))
        })
    }

    async function fetchThemeUpdate(theme: ConfigState['theme']) {
        return await setState({ theme })
    }

    async function fetchDelInclude(name: string) {
        return await setState({ include: state.include.filter(keyName => keyName !== name) })
    }

    async function fetchSetInclude() {
        return await setState({
            include: state.dataSource.map(item => item.name)
        })
    }

    async function fetchCloseRouter(fullPath: string, evt?: MouseEvent) {
        if (evt) {
            evt.preventDefault()
            evt.stopPropagation()
        }
        const dataSource = state.dataSource.filter(item => item.fullPath !== fullPath)
        const include = dataSource.map(item => item.name)
        return await setState({ dataSource, include }).then(async response => {
            if (fullPath === state.currentRoute) {
                const item = dataSource[dataSource.length - 1]
                await router.push({ path: item.fullPath })
            }
            return response
        })
    }

    return { ...toRefs(state), setState, fetchResize, fetchThemeUpdate, fetchCloseRouter, fetchSetInclude, fetchDelInclude }
})
