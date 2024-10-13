import { RouteRecordRaw } from 'vue-router'
import { concat } from 'lodash'
import { APP_NEST } from '@/utils/utils-cookie'
import { crmRoutes } from '@/router/crm-routes'
import { systemRoutes } from '@/router/system-routes'

export const childRoutes: Array<Omix<RouteRecordRaw>> = concat(crmRoutes, systemRoutes, [
    {
        path: '/manager',
        name: 'Manager',
        meta: { title: '工作台', AUTH: APP_NEST.AUTH },
        component: () => import('@/views/main/manager/manager.vue')
    }
])

export const mainRoutes: Array<Omix<RouteRecordRaw>> = [
    {
        path: '/login',
        name: 'Login',
        meta: { AUTH: APP_NEST.AUTH_NONE },
        component: () => import('@/views/main/login/login.vue')
    },
    {
        path: '/',
        redirect: '/manager',
        name: 'LayoutContainer',
        meta: { AUTH: APP_NEST.AUTH },
        component: () => import('@/components/layouts/layout-container.vue'),
        children: childRoutes
    }
]
