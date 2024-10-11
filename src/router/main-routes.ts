import { RouteRecordRaw } from 'vue-router'
import { EnumRoute } from '@/utils/utils-cookie'
import Login from '@/views/main/login/login.vue'

export const mainRoutes: Array<Omix<RouteRecordRaw>> = [
    {
        path: '/login',
        name: Login.name,
        meta: { AUTH: EnumRoute.AUTH_NONE },
        component: Login
    }
]
