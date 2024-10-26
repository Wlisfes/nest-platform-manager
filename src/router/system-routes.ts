import { RouteRecordRaw } from 'vue-router'
import { APP_NEST } from '@/utils/utils-cookie'

export const systemRoutes: Array<Omix<RouteRecordRaw>> = [
    {
        path: '/system/basic/router',
        name: 'BasicRouter',
        meta: { title: '菜单管理', AUTH: APP_NEST.AUTH },
        component: () => import('@/views/system/basic/router/router.vue')
    },
    {
        path: '/system/basic/simple',
        name: 'BasicSimple',
        meta: { title: '字典管理', AUTH: APP_NEST.AUTH },
        component: () => import('@/views/system/basic/simple/simple.vue')
    }
]
