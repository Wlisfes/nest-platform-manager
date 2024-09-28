import { RouteRecordRaw } from 'vue-router'
import Login from '@/views/main/login/login.vue'

export const mainRoutes: Array<Omix<RouteRecordRaw>> = [
    {
        path: '/login',
        name: Login.name,
        component: Login
    }
]
