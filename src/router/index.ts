import { App } from 'vue'
import { createRouter, createWebHistory, Router } from 'vue-router'
import { useManager, useConfiger } from '@/store'
import { fetchSetupRouter } from '@/router/modules'
import * as utils from '@/utils/utils-common'
import * as cookie from '@/utils/utils-cookie'

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'BaseAuthorize',
            meta: { title: '登录', AUTH: 'AUTH_NONE' },
            component: () => import('@/views/main/login/login.vue')
        },
        {
            path: '/',
            redirect: '/manager',
            name: 'BaseLayout',
            meta: { title: '昆仑服务平台', AUTH: 'AUTH' },
            component: () => import('@/views/main/layout/layout.vue'),
            children: fetchSetupRouter()
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
    const configer = useConfiger()
    const manager = useManager()
    router.beforeEach(async (to, from, next) => {
        window.$loadingBar.start()
        const token = cookie.getToken()
        if (utils.isEmpty(token)) {
            /**token为空：未登录可进入AUTH_NONE类型页面**/
            if (to.meta.AUTH === 'AUTH_NONE') return next()
            return await cookie.delCompose().then(() => {
                /**情况token存储**/
                return next({ replace: true, path: '/login' })
            })
        } else if (utils.isEmpty(manager.uid)) {
            /**token不为空：用户信息不存在加载用户信息**/
            try {
                await manager.fetchBaseSystemUserResolver()
            } catch (err) {
                /**用户信息加载失败：移除token存储后重定向到登录页面**/
                return await cookie.delCompose().then(() => {
                    return next({ replace: true, path: '/login' })
                })
            }
        }
        if (to.meta.AUTH === 'AUTH_NONE') {
            /**存在token不可在进入AUTH_NONE类型页面、重定向到工作台页面**/
            return next({ replace: true, path: '/manager' })
        } else {
            return next()
        }
    })
    router.afterEach(async (to, from) => {
        document.title = `昆仑服务平台${utils.fetchWhere(!!to.meta.title, ` - ${to.meta.title}`, '')}`
        window.$loadingBar.finish()
        return await configer.fetchMenuRouter(to).then(async menu => {
            return await configer.setState({ router: to.path })
        })
    })
}

export default router
