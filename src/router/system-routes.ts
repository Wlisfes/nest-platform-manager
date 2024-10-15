import { RouteRecordRaw } from 'vue-router'
import { APP_NEST } from '@/utils/utils-cookie'

export const systemRoutes: Array<Omix<RouteRecordRaw>> = [
    {
        path: '/system/basic/router',
        name: 'BasicRouter',
        meta: { AUTH: APP_NEST.AUTH },
        component: () => import('@/views/system/basic/router/router.vue')
    }
]
