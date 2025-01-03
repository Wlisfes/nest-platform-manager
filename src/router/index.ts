import { App } from 'vue'
import { createRouter, createWebHistory, Router } from 'vue-router'
import Layout from '@/views/main/layout/layout.vue'

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/authorize',
            name: 'BaseAuthorize',
            meta: { title: '登录', AUTH: 'AUTH_NONE' },
            component: () => import('@/views/main/login/login.vue')
        },
        {
            path: '/',
            redirect: '/manager',
            name: 'BaseLayout',
            meta: { title: '昆仑服务平台', AUTH: 'AUTH' },
            component: Layout,
            children: [
                {
                    path: '/manager',
                    name: 'BaseManager',
                    meta: { title: '工作台', AUTH: 'AUTH' },
                    component: () => import('@/views/main/manager/manager.vue')
                }
            ]
        }
    ]
})

export function setupRouter(app: App<Element>, option: Omix<{ interceptor: boolean }>) {
    app.use(router)
    if (option.interceptor) {
        setupGuardRouter(router)
    }
}

/**路由守卫**/
export function setupGuardRouter(router: Router) {
    router.beforeEach(async (to, from, next) => {
        window.$loadingBar.start()

        return next()
    })
    router.afterEach(async (to, from) => {
        window.$loadingBar.finish()
    })
}

export default router
