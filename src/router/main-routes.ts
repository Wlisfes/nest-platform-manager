import { RouteRecordRaw } from 'vue-router'
import { APP_AUTH } from '@/utils/utils-cookie'
import Login from '@/views/main/login/login.vue'

export const mainRoutes: Array<Omix<RouteRecordRaw>> = [
    {
        path: '/login',
        name: Login.name,
        meta: { AUTH: APP_AUTH.AUTH_NONE },
        component: Login
    },
    {
        path: '/',
        name: 'Home',
        meta: { AUTH: APP_AUTH.AUTH },
        component: () => import('@/views/main/home/home.vue')
    }
]
