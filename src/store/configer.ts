import { toRefs } from 'vue'
import { defineStore } from 'pinia'
import { useState } from '@/hooks/hook-state'
import { router, RouteOption, APP_SKYLINE } from '@/router'

export interface ConfigState {
    theme: 'light' | 'dark'
    primaryColor: string
    width: number
    height: number
    device: 'PC' | 'IPAD' | 'MOBILE'
    collapsed: boolean

    activeName: string
    currentRoute: string
    include: Array<string>
    dataSource: Array<Omix>
}

export const useConfiger = defineStore('APP_SKYLINE_STORE_CONFIGER', () => {
    const { state, setState } = useState<ConfigState>({
        theme: 'light',
        primaryColor: '#24B89E',
        width: window.innerWidth,
        height: window.innerHeight,
        device: 'PC',
        collapsed: false,

        activeName: APP_SKYLINE.Manager,
        currentRoute: '/manager',
        include: [],
        dataSource: [
            {
                path: '/manager',
                fullPath: '/manager',
                name: 'BaseManager',
                meta: { title: '工作台', iframeName: APP_SKYLINE.Manager },
                close: false
            }
        ]
    })

    /**监听窗口resizes事件**/
    async function fetchResize(data: Partial<{ width: number; height: number }> = {}) {
        return await setState({ width: data.width ?? window.innerWidth, height: data.height ?? window.innerHeight }).then(async data => {
            if (data.width > 1280) {
                return await setState({ device: 'PC', collapsed: false })
            } else if (data.width > 768) {
                return await setState({ device: 'IPAD', collapsed: true })
            }
            return await setState({ device: 'MOBILE', collapsed: true })
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

    async function setAfterRouter(data: Omix<RouteOption>) {
        if (!state.dataSource.some(item => item.fullPath === data.fullPath)) {
            await state.dataSource.push({
                path: data.path,
                name: data.name,
                fullPath: data.fullPath,
                meta: data.meta,
                close: true
            })
        }
        await fetchSetInclude()
        return await setState({
            activeName: data.meta.iframeName as string,
            currentRoute: data.fullPath
        })
    }

    return { ...toRefs(state), setState, fetchResize, fetchThemeUpdate, setAfterRouter, fetchCloseRouter, fetchSetInclude, fetchDelInclude }
})
