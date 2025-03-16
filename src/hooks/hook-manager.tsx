import { nextTick } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import { router } from '@/router'
import { useConfiger, useStore } from '@/store'

export function useManager() {
    async function fetchSeekRouter(path: string) {
        const { pathname } = new URL(path, window.location.origin)
        return router.getRoutes().find(item => item.path === pathname) as Omix<RouteRecordRaw>
    }

    return { router }
}
