import { RouteRecordRaw } from 'vue-router'
import { APP_NEST } from '@/utils/utils-cookie'

export const systemRoutes: Array<Omix<RouteRecordRaw>> = [
    {
        path: '/system/basic/menu',
        name: 'BasicMenu',
        meta: { AUTH: APP_NEST.AUTH },
        component: () => import('@/views/system/basic/menu/menu.vue')
    }
]
